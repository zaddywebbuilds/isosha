import { useEffect, useRef, useState } from 'react';
import { packages, getPackage, formatPrice } from '../config/pricing.js';
import { product } from '../config/product.js';
import { crm, crmStates } from '../config/crm.js';
import { contact } from '../config/site.js';
import { sections } from '../config/copy.js';
import { Eyebrow, Icon } from './ui.jsx';

/**
 * ORDER FORM
 *
 * This posts natively to Netwill Herbals' Xurge CRM. See src/config/crm.js
 * for why it is a native form POST rather than fetch(): the endpoint sends
 * no CORS headers, so a scripted request would be blocked and orders would
 * fail silently.
 *
 * Because it is a native POST, the browser leaves this page on submit and
 * lands on the CRM's own confirmation. That is the CRM's normal behaviour.
 *
 * Validation here runs before the native submit and blocks it on failure,
 * so the customer sees errors in the site's own styling rather than the
 * browser's default bubbles. Every `name` attribute is fixed by the CRM.
 */

const REQUIRED = {
  full_name: 'Please enter your full name.',
  phone_number: 'Please enter a phone number we can reach you on.',
  whatsapp_number: 'Please enter the WhatsApp number to reach you on.',
  [crm.conditionField]: 'Please choose the option that applies to you.',
  state: 'Please choose your delivery state.',
  address: 'Please enter the delivery address.',
};

const EMPTY = {
  full_name: '',
  phone_number: '',
  whatsapp_number: '',
  [crm.conditionField]: '',
  state: '',
  address: '',
  consent: false,
};

/** 10 to 20 characters of digits, spaces, dashes, brackets and a leading +. */
const phonePattern = /^[+()\-\s\d]{10,20}$/;

export default function OrderForm({ selected, onSelect }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [sourceUrl, setSourceUrl] = useState('');
  const formRef = useRef(null);

  const pkg = getPackage(selected);

  // The CRM records which page the order came from, without the query string.
  useEffect(() => {
    setSourceUrl(window.location.href.split('?')[0]);
  }, []);

  const update = (field) => (event) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
  };

  const validate = () => {
    const next = {};
    for (const [field, message] of Object.entries(REQUIRED)) {
      if (!String(values[field] ?? '').trim()) next[field] = message;
    }
    if (
      values.phone_number.trim() &&
      !phonePattern.test(values.phone_number.trim())
    ) {
      next.phone_number = 'Please check this phone number.';
    }
    if (
      values.whatsapp_number.trim() &&
      !phonePattern.test(values.whatsapp_number.trim())
    ) {
      next.whatsapp_number = 'Please check this WhatsApp number.';
    }
    if (!values.consent) {
      next.consent =
        'Please confirm you are happy for Netwill Herbals to use these details to deliver your order.';
    }
    return next;
  };

  /**
   * Runs before the native submit. Returning without preventDefault lets the
   * browser POST to the CRM as normal.
   */
  const handleSubmit = (event) => {
    const found = validate();
    setErrors(found);

    if (Object.keys(found).length > 0) {
      event.preventDefault();
      const first = formRef.current?.querySelector('[aria-invalid="true"]');
      first?.focus();
      first?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    // Valid: let the POST through and stop double submissions.
    setSubmitting(true);
  };

  return (
    <section
      id="order"
      className="bg-cream py-8 md:py-12"
      aria-labelledby="order-heading"
    >
      <div className="shell">
        {/* Heading left, intro right from lg up. See Agitate.jsx for why. */}
        <div className="reveal grid gap-x-10 gap-y-4 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow>{sections.order.eyebrow}</Eyebrow>
            <h2
              id="order-heading"
              className="mt-5 text-[clamp(1.65rem,7.4vw,2.1rem)] sm:text-4xl lg:text-[2.9rem] text-forest"
            >
              {sections.order.headline}
            </h2>
          </div>
          <p className="mt-5 lg:mt-0 text-ink-soft leading-relaxed">
            {sections.order.body}
          </p>
        </div>

        <div className="mt-6 grid lg:grid-cols-[1.25fr_0.75fr] gap-6 lg:gap-10 items-start">
          {/* ---------------------------------------------------------- */}
          {/* Form: posts natively to the CRM                            */}
          {/* ---------------------------------------------------------- */}
          <form
            ref={formRef}
            /*
              The CRM scripts find the form with
              querySelector('[id^="orderForm"]'), so the id prefix is load
              bearing. Without it both scripts log "Form not found" and
              abandoned-order capture never runs.
            */
            id={`orderForm_${crm.schemaName}_${crm.formId}`}
            method="POST"
            action={crm.endpoint}
            onSubmit={handleSubmit}
            noValidate
            className="reveal card p-5 sm:p-6"
          >
            {/* Routing and attribution. Names fixed by the CRM. */}
            <input type="hidden" name="form_id" value={crm.formId} />
            <input type="hidden" name="schema_name" value={crm.schemaName} />
            <input type="hidden" name="source_url" value={sourceUrl} readOnly />
            <input
              type="hidden"
              name="media_buyer_id"
              value={crm.mediaBuyerId}
            />

            <fieldset className="border-0 p-0 m-0">
              <legend className="eyebrow text-forest-line mb-4">
                Your package
              </legend>

              <div
                role="radiogroup"
                aria-label="Package"
                className="grid sm:grid-cols-3 gap-3"
              >
                {packages.map((p) => {
                  const active = p.id === selected;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => onSelect(p.id)}
                      className={`rounded-xl border p-3.5 text-left transition-colors duration-200 ${
                        active
                          ? 'border-leaf bg-leaf-wash'
                          : 'border-forest/15 hover:border-forest/35'
                      }`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-[1.06rem] font-bold text-forest">
                          {p.bottles} bottle{p.bottles > 1 ? 's' : ''}
                        </span>
                        {active && (
                          <Icon name="check" className="w-4 h-4 text-leaf" />
                        )}
                      </span>
                      <span className="block mt-1 font-serif text-[1.3rem] text-forest leading-none">
                        {formatPrice(p.price)}
                      </span>
                      <span className="block mt-1 text-[0.98rem] text-ink-soft">
                        {p.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/*
                A real <select>, not a hidden input. cart_abandonment.js
                reads the package with querySelector('select[name="package"]'),
                so a hidden input would post correctly but silently break
                abandoned-order capture.

                The buttons above are the control people actually use and
                carry the accessible semantics, so this is hidden from both
                the screen and the accessibility tree.
              */}
              <select
                name="package"
                value={pkg.crmId}
                onChange={(e) => {
                  const match = packages.find((p) => p.crmId === e.target.value);
                  if (match) onSelect(match.id);
                }}
                tabIndex={-1}
                aria-hidden="true"
                className="sr-only"
              >
                {packages.map((p) => (
                  <option key={p.id} value={p.crmId}>
                    {p.bottles} Bottle{p.bottles > 1 ? 's' : ''} -{' '}
                    {formatPrice(p.price)}
                  </option>
                ))}
              </select>
            </fieldset>

            <hr className="my-7 border-forest/10" />

            <fieldset className="border-0 p-0 m-0">
              <legend className="eyebrow text-forest-line mb-4">
                Your details
              </legend>

              <div className="grid sm:grid-cols-2 gap-x-5 gap-y-4">
                <Field
                  id="full_name"
                  label="Full name"
                  required
                  autoComplete="name"
                  placeholder="First name and last name"
                  value={values.full_name}
                  onChange={update('full_name')}
                  error={errors.full_name}
                  className="sm:col-span-2"
                />
                <Field
                  id="phone_number"
                  label="Phone number"
                  type="tel"
                  inputMode="tel"
                  required
                  autoComplete="tel"
                  placeholder="0803 123 4567"
                  value={values.phone_number}
                  onChange={update('phone_number')}
                  error={errors.phone_number}
                />
                <Field
                  id="whatsapp_number"
                  label="WhatsApp number"
                  type="tel"
                  inputMode="tel"
                  required
                  placeholder="0803 123 4567"
                  value={values.whatsapp_number}
                  onChange={update('whatsapp_number')}
                  error={errors.whatsapp_number}
                />

                <Select
                  id={crm.conditionField}
                  label={crm.conditionLabel}
                  required
                  placeholder="Select the option that applies"
                  options={crm.conditions}
                  value={values[crm.conditionField]}
                  onChange={update(crm.conditionField)}
                  error={errors[crm.conditionField]}
                  hint="So the team can answer your questions properly"
                />

                <Select
                  id="state"
                  label="Delivery state"
                  required
                  autoComplete="address-level1"
                  placeholder="Select your state"
                  options={crmStates}
                  value={values.state}
                  onChange={update('state')}
                  error={errors.state}
                />

                <div className="sm:col-span-2">
                  <label htmlFor="address" className="field-label">
                    Delivery address <Req />
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    className="field resize-y"
                    autoComplete="street-address"
                    placeholder="House number, street, area, city and any landmark"
                    value={values.address}
                    onChange={update('address')}
                    aria-invalid={errors.address ? 'true' : undefined}
                    aria-describedby={
                      errors.address ? 'address-error' : undefined
                    }
                  />
                  <FieldError id="address-error" message={errors.address} />
                </div>
              </div>
            </fieldset>

            {/* Consent. The wording names the health question explicitly,
                because that answer is sensitive personal data. */}
            <div className="mt-5 rounded-xl bg-mist border border-forest/10 p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  id="consent"
                  checked={values.consent}
                  onChange={update('consent')}
                  aria-invalid={errors.consent ? 'true' : undefined}
                  aria-describedby={
                    errors.consent ? 'consent-error' : 'consent-note'
                  }
                  className="mt-1 w-5 h-5 shrink-0 accent-[#60B609]"
                />
                <span className="text-[0.96rem] text-ink leading-relaxed">
                  I agree that Netwill Herbals may use the details above,
                  including my answer about my eye condition, to contact me
                  about this order and arrange delivery. <Req />
                </span>
              </label>
              <p
                id="consent-note"
                className="mt-2.5 pl-8 text-[0.98rem] text-ink-soft leading-relaxed"
              >
                Your answer about your eye condition is health information. It
                is used to handle your order and answer your questions, and
                nothing on this page is a diagnosis. See the Privacy Policy in
                the footer for how your details are handled.
              </p>
              <FieldError
                id="consent-error"
                message={errors.consent}
                className="pl-8"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-gold mt-5 w-full disabled:opacity-70"
            >
              {submitting ? 'Placing your order…' : crm.submitLabel}
            </button>

            <p className="mt-3.5 text-[0.98rem] text-ink-soft text-center leading-relaxed">
              Your order goes straight to the Netwill Herbals team, who will
              call you on the number above to confirm it and the delivery
              charge for your state.
            </p>
          </form>

          {/* ---------------------------------------------------------- */}
          {/* Summary                                                    */}
          {/* ---------------------------------------------------------- */}
          <aside className="reveal lg:sticky lg:top-28">
            <div className="rounded-[1.25rem] bg-forest text-white p-5 sm:p-6">
              <h3 className="text-[1.4rem]">Order summary</h3>
              <div className="mt-5 space-y-3 text-[1.06rem]">
                <Row label="Product" value={product.name} />
                <Row label="Package" value={pkg.title} />
                <Row label="Bottles" value={String(pkg.bottles)} />
                <Row
                  label="Capsules"
                  value={String(pkg.bottles * product.capsulesPerBottle)}
                />
                <Row
                  label="Days at one daily"
                  value={String(pkg.bottles * product.capsulesPerBottle)}
                />
              </div>

              <div className="mt-5 pt-5 border-t border-white/20">
                <p className="eyebrow text-gold">Total</p>
                <p className="mt-1.5 font-serif text-[2.4rem] leading-none">
                  {formatPrice(pkg.price)}
                </p>
                <p className="mt-2.5 text-[0.86rem] text-white/92 leading-relaxed">
                  Delivery is not included. The charge for your location is
                  confirmed by the team when they call.
                </p>
              </div>
            </div>

            {contact.whatsapp && (
              <a
                href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
                  contact.whatsappMessage.replace('{package}', pkg.title),
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-leaf mt-4 w-full"
              >
                <Icon name="whatsapp" className="w-5 h-5" />
                Order on WhatsApp instead
              </a>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Form primitives                                                     */
/* ------------------------------------------------------------------ */

function Req() {
  return (
    <span className="text-leaf" aria-hidden="true">
      *
    </span>
  );
}

function FieldError({ id, message, className = '' }) {
  if (!message) return null;
  return (
    <p
      id={id}
      className={`mt-1.5 text-[0.86rem] font-medium text-red-700 ${className}`}
    >
      {message}
    </p>
  );
}

function Field({
  id,
  label,
  type = 'text',
  required = false,
  hint,
  error,
  className = '',
  ...rest
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label} {required ? <Req /> : null}
        {hint && (
          <span className="font-normal normal-case tracking-normal text-ink-soft">
            {' '}
            ({hint})
          </span>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className="field"
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function Select({
  id,
  label,
  options,
  placeholder,
  required = false,
  hint,
  error,
  className = '',
  ...rest
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label} {required ? <Req /> : null}
        {hint && (
          <span className="block font-normal normal-case tracking-normal text-ink-soft">
            {hint}
          </span>
        )}
      </label>
      <select
        id={id}
        name={id}
        className="field"
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/12 pb-2.5">
      <span className="text-white/92">{label}</span>
      <span className="font-semibold text-right">{value}</span>
    </div>
  );
}
