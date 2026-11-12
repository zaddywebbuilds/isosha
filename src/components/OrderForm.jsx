import { useEffect, useRef, useState } from 'react';
import {
  packages,
  getPackage,
  formatPrice,
  maxQuantity,
  currency,
} from '../config/pricing.js';
import { product } from '../config/product.js';
import { nigerianStates } from '../config/states.js';
import { contact, formIntegration } from '../config/site.js';
import { useOrderSubmission } from '../hooks/useOrderSubmission.js';
import { Eyebrow, Icon } from './ui.jsx';

const EMPTY = {
  fullName: '',
  phone: '',
  whatsapp: '',
  state: '',
  city: '',
  address: '',
  notes: '',
  consent: false,
};

const REQUIRED = {
  fullName: 'Please enter your full name.',
  phone: 'Please enter a phone number we can reach you on.',
  state: 'Please choose your state.',
  city: 'Please enter your city or town.',
  address: 'Please enter the delivery address.',
};

/** Accepts 10 to 15 digits, allowing +, spaces, dashes and brackets. */
const phonePattern = /^[+()\-\s\d]{10,20}$/;

export default function OrderForm({ selected, onSelect }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { status, message, submit, reset, STATUS } = useOrderSubmission();
  const feedbackRef = useRef(null);

  const pkg = getPackage(selected);
  const total = pkg.price * quantity;
  const isDemo = formIntegration.mode === 'demo';

  // Move focus to the feedback message once there is something to read.
  useEffect(() => {
    if (status !== STATUS.idle) feedbackRef.current?.focus();
  }, [status, STATUS.idle]);

  const update = (field) => (event) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
    if (status !== STATUS.idle) reset();
  };

  const validate = () => {
    const next = {};
    for (const [field, msg] of Object.entries(REQUIRED)) {
      if (!values[field].trim()) next[field] = msg;
    }
    if (values.phone.trim() && !phonePattern.test(values.phone.trim())) {
      next.phone = 'Please check this phone number.';
    }
    if (values.whatsapp.trim() && !phonePattern.test(values.whatsapp.trim())) {
      next.whatsapp = 'Please check this WhatsApp number.';
    }
    if (!values.consent) {
      next.consent =
        'Please confirm you are happy for us to use these details to contact you about this order.';
    }
    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const first = document.querySelector('[aria-invalid="true"]');
      first?.focus();
      return;
    }

    const payload = {
      product: product.name,
      package: {
        id: pkg.id,
        title: pkg.title,
        bottles: pkg.bottles,
        unitPrice: pkg.price,
      },
      quantity,
      total,
      currency: currency.code,
      customer: {
        fullName: values.fullName.trim(),
        phone: values.phone.trim(),
        whatsapp: values.whatsapp.trim(),
        state: values.state,
        city: values.city.trim(),
        address: values.address.trim(),
        notes: values.notes.trim(),
      },
      consent: true,
      submittedAt: new Date().toISOString(),
    };

    const result = await submit(payload);
    if (result.ok && formIntegration.mode === 'endpoint') {
      setValues(EMPTY);
      setQuantity(1);
    }
  };

  const feedbackTone =
    status === STATUS.success
      ? 'border-leaf/50 bg-leaf-wash text-forest'
      : status === STATUS.error
        ? 'border-red-300 bg-red-50 text-red-900'
        : 'border-gold/60 bg-[#fdf8e3] text-[#5b4a05]';

  return (
    <section
      id="order"
      className="bg-cream py-16 md:py-24"
      aria-labelledby="order-heading"
    >
      <div className="shell">
        <div className="reveal max-w-2xl">
          <Eyebrow>Order</Eyebrow>
          <h2
            id="order-heading"
            className="mt-5 text-[2.1rem] sm:text-4xl lg:text-[2.9rem] text-forest"
          >
            Complete your order enquiry
          </h2>
          <p className="mt-5 text-ink-soft leading-relaxed">
            Select your preferred package and complete your order enquiry. A
            member of the team confirms your order, the delivery charge for your
            location and the payment arrangement before anything is dispatched.
          </p>
        </div>

        {isDemo && (
          <p className="reveal mt-8 flex items-start gap-3 rounded-xl border border-dashed border-gold-deep bg-[#fdf8e3] p-4 text-[0.87rem] text-[#5b4a05] leading-relaxed">
            <Icon name="doc" className="w-5 h-5 mt-0.5 shrink-0" />
            <span>
              <strong className="font-bold">
                Demonstration form, not yet connected.
              </strong>{' '}
              This form is fully built and validates your entries, but it has no
              order destination configured, so nothing is sent and nothing is
              stored. Set <code className="font-mono text-[0.82em]">formIntegration.mode</code>{' '}
              in <code className="font-mono text-[0.82em]">src/config/site.js</code>{' '}
              to connect WhatsApp or a form endpoint.
            </span>
          </p>
        )}

        <div className="mt-10 grid lg:grid-cols-[1.25fr_0.75fr] gap-8 lg:gap-10 items-start">
          {/* ---------------------------------------------------------- */}
          {/* Form                                                       */}
          {/* ---------------------------------------------------------- */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="reveal card p-6 sm:p-8"
          >
            <fieldset className="border-0 p-0 m-0">
              <legend className="eyebrow text-[0.65rem] text-forest-line mb-4">
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
                        <span className="text-[0.82rem] font-bold text-forest">
                          {p.bottles} bottle{p.bottles > 1 ? 's' : ''}
                        </span>
                        {active && (
                          <Icon name="check" className="w-4 h-4 text-leaf" />
                        )}
                      </span>
                      <span className="block mt-1 font-serif text-[1.3rem] text-forest leading-none">
                        {formatPrice(p.price)}
                      </span>
                      <span className="block mt-1 text-[0.72rem] text-ink-soft">
                        {p.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 max-w-[12rem]">
                <label htmlFor="quantity" className="field-label">
                  Quantity
                </label>
                <select
                  id="quantity"
                  name="quantity"
                  className="field"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                >
                  {Array.from({ length: maxQuantity }, (_, i) => i + 1).map(
                    (n) => (
                      <option key={n} value={n}>
                        {n} &times; {pkg.title}
                      </option>
                    ),
                  )}
                </select>
                <p className="mt-1.5 text-[0.75rem] text-ink-soft">
                  Each unit is one whole {pkg.title.toLowerCase()}. Package
                  prices are not recombined.
                </p>
              </div>
            </fieldset>

            <hr className="my-7 border-forest/10" />

            <fieldset className="border-0 p-0 m-0">
              <legend className="eyebrow text-[0.65rem] text-forest-line mb-4">
                Your details
              </legend>

              <div className="grid sm:grid-cols-2 gap-x-5 gap-y-4">
                <Field
                  id="fullName"
                  label="Full name"
                  required
                  autoComplete="name"
                  value={values.fullName}
                  onChange={update('fullName')}
                  error={errors.fullName}
                  className="sm:col-span-2"
                />
                <Field
                  id="phone"
                  label="Phone number"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="0801 234 5678"
                  value={values.phone}
                  onChange={update('phone')}
                  error={errors.phone}
                />
                <Field
                  id="whatsapp"
                  label="WhatsApp number"
                  type="tel"
                  hint="Optional"
                  placeholder="If different from above"
                  value={values.whatsapp}
                  onChange={update('whatsapp')}
                  error={errors.whatsapp}
                />

                <div>
                  <label htmlFor="state" className="field-label">
                    State <Req />
                  </label>
                  <select
                    id="state"
                    name="state"
                    className="field"
                    autoComplete="address-level1"
                    value={values.state}
                    onChange={update('state')}
                    aria-invalid={errors.state ? 'true' : undefined}
                    aria-describedby={errors.state ? 'state-error' : undefined}
                  >
                    <option value="">Select your state</option>
                    {nigerianStates.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <FieldError id="state-error" message={errors.state} />
                </div>

                <Field
                  id="city"
                  label="City or town"
                  required
                  autoComplete="address-level2"
                  value={values.city}
                  onChange={update('city')}
                  error={errors.city}
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
                    placeholder="House number, street, area and any landmark"
                    value={values.address}
                    onChange={update('address')}
                    aria-invalid={errors.address ? 'true' : undefined}
                    aria-describedby={
                      errors.address ? 'address-error' : undefined
                    }
                  />
                  <FieldError id="address-error" message={errors.address} />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="notes" className="field-label">
                    Additional notes{' '}
                    <span className="font-normal normal-case tracking-normal text-ink-soft">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={2}
                    className="field resize-y"
                    placeholder="Delivery preferences or anything else we should know"
                    value={values.notes}
                    onChange={update('notes')}
                  />
                  <p className="mt-1.5 text-[0.75rem] text-ink-soft">
                    Please do not include medical or health information here.
                  </p>
                </div>
              </div>
            </fieldset>

            {/* Privacy and consent */}
            <div className="mt-7 rounded-xl bg-mist border border-forest/10 p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={values.consent}
                  onChange={update('consent')}
                  aria-invalid={errors.consent ? 'true' : undefined}
                  aria-describedby={
                    errors.consent ? 'consent-error' : 'consent-note'
                  }
                  className="mt-1 w-5 h-5 shrink-0 accent-[#60B609]"
                />
                <span className="text-[0.85rem] text-ink leading-relaxed">
                  I agree that Netwill Herbals may use the details above to
                  contact me about this order and to arrange delivery. <Req />
                </span>
              </label>
              <p
                id="consent-note"
                className="mt-2.5 pl-8 text-[0.75rem] text-ink-soft leading-relaxed"
              >
                Your details are used only to process this order enquiry. See
                the Privacy Policy for how information is handled.
              </p>
              <FieldError
                id="consent-error"
                message={errors.consent}
                className="pl-8"
              />
            </div>

            <button type="submit" className="btn btn-gold mt-7 w-full sm:w-auto">
              {status === STATUS.sending ? 'Sending…' : 'Submit Order Enquiry'}
              {status !== STATUS.sending && (
                <Icon name="arrow" className="w-4 h-4" />
              )}
            </button>

            {/* Feedback. Never claims success unless something really was sent. */}
            <div aria-live="polite">
              {status !== STATUS.idle && message && (
                <p
                  ref={feedbackRef}
                  tabIndex={-1}
                  className={`mt-5 rounded-xl border p-4 text-[0.88rem] leading-relaxed ${feedbackTone}`}
                >
                  {message}
                </p>
              )}
            </div>
          </form>

          {/* ---------------------------------------------------------- */}
          {/* Summary                                                    */}
          {/* ---------------------------------------------------------- */}
          <aside className="reveal lg:sticky lg:top-28">
            <div className="rounded-[1.25rem] bg-forest text-white p-6 sm:p-7">
              <h3 className="text-[1.4rem]">Order summary</h3>
              <div className="mt-5 space-y-3 text-[0.9rem]">
                <Row label="Product" value={product.name} />
                <Row label="Package" value={pkg.title} />
                <Row
                  label="Bottles"
                  value={String(pkg.bottles * quantity)}
                />
                <Row
                  label="Capsules"
                  value={String(
                    pkg.bottles * quantity * product.capsulesPerBottle,
                  )}
                />
                <Row label="Unit price" value={formatPrice(pkg.price)} />
                <Row label="Quantity" value={String(quantity)} />
              </div>

              <div className="mt-5 pt-5 border-t border-white/20">
                <p className="eyebrow text-[0.6rem] text-gold">Total</p>
                <p className="mt-1.5 font-serif text-[2.4rem] leading-none">
                  {formatPrice(total)}
                </p>
                <p className="mt-2.5 text-[0.76rem] text-white/60 leading-relaxed">
                  Delivery is not included. The delivery charge for your
                  location is confirmed by the seller before dispatch.
                </p>
              </div>
            </div>

            {contact.whatsapp ? (
              <a
                href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
                  contact.whatsappMessage.replace('{package}', pkg.title),
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-leaf mt-4 w-full"
              >
                <Icon name="whatsapp" className="w-5 h-5" />
                Order on WhatsApp
              </a>
            ) : (
              <p className="mt-4 rounded-xl border border-dashed border-gold-deep bg-[#fdf8e3] p-3.5 text-[0.8rem] text-[#5b4a05] leading-relaxed">
                A WhatsApp ordering button appears here once the client&rsquo;s
                real WhatsApp number is added to{' '}
                <code className="font-mono text-[0.85em]">contact.whatsapp</code>{' '}
                in <code className="font-mono text-[0.85em]">src/config/site.js</code>.
                No placeholder number is shown, so no stranger is called by
                mistake.
              </p>
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
    <p id={id} className={`mt-1.5 text-[0.78rem] font-medium text-red-700 ${className}`}>
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

function Row({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/12 pb-2.5">
      <span className="text-white/60">{label}</span>
      <span className="font-semibold text-right">{value}</span>
    </div>
  );
}
