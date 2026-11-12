import { useCallback, useState } from 'react';
import { contact, formIntegration } from '../config/site.js';

/**
 * ORDER FORM INTEGRATION POINT
 * ============================
 * This hook is the single place where a completed order enquiry leaves the
 * page. Nothing else in the codebase sends customer data anywhere.
 *
 * Choose the destination by setting `formIntegration.mode` in
 * src/config/site.js:
 *
 *   'demo'      (default) Nothing is sent. The visitor is told plainly that
 *               ordering is not yet live. No personal data is transmitted and
 *               none is written to storage. The form never claims success.
 *
 *   'whatsapp'  Opens WhatsApp with the order details pre-filled, addressed to
 *               `contact.whatsapp`. The customer presses send themselves.
 *
 *   'endpoint'  POSTs the payload below as JSON to `formIntegration.endpointUrl`.
 *               Works with Formspree, Getform, Basin, a Google Apps Script web
 *               app, a serverless function, or the client's own CRM.
 *
 * The JSON payload sent in 'endpoint' mode:
 * {
 *   product:   'Isosha Herbal Capsules',
 *   package:   { id, title, bottles, unitPrice },
 *   quantity:  Number,
 *   total:     Number,          // quantity * package price, in naira
 *   currency:  'NGN',
 *   customer:  { fullName, phone, whatsapp, state, city, address, notes },
 *   consent:   true,            // the visitor ticked the consent box
 *   submittedAt: ISO 8601 string
 * }
 *
 * To add a different provider, add a branch to `submit` below. Keep the demo
 * branch intact so the site is never left in a state where it reports a
 * successful order that nobody received.
 */

const STATUS = {
  idle: 'idle',
  sending: 'sending',
  success: 'success',
  demo: 'demo',
  error: 'error',
};

export function useOrderSubmission() {
  const [status, setStatus] = useState(STATUS.idle);
  const [message, setMessage] = useState('');

  const reset = useCallback(() => {
    setStatus(STATUS.idle);
    setMessage('');
  }, []);

  const submit = useCallback(async (payload) => {
    const mode = formIntegration.mode;

    /* ---------------------------------------------------------------- */
    /* DEMO: no destination configured yet.                              */
    /* ---------------------------------------------------------------- */
    if (mode === 'demo') {
      setStatus(STATUS.demo);
      setMessage(
        'Online ordering is not yet connected on this site, so this enquiry has not been sent to anyone and nothing you typed has been stored. Please contact Netwill Herbals directly to place your order.',
      );
      return { ok: false, mode };
    }

    /* ---------------------------------------------------------------- */
    /* WHATSAPP                                                          */
    /* ---------------------------------------------------------------- */
    if (mode === 'whatsapp') {
      if (!contact.whatsapp) {
        setStatus(STATUS.error);
        setMessage(
          'A WhatsApp number has not been configured for this site yet. Please contact Netwill Herbals directly.',
        );
        return { ok: false, mode };
      }

      const lines = [
        `Order enquiry: ${payload.product}`,
        `Package: ${payload.package.title} (${payload.package.bottles} bottle${payload.package.bottles > 1 ? 's' : ''})`,
        `Quantity: ${payload.quantity}`,
        `Total: NGN ${payload.total.toLocaleString('en-NG')}`,
        '',
        `Name: ${payload.customer.fullName}`,
        `Phone: ${payload.customer.phone}`,
        payload.customer.whatsapp ? `WhatsApp: ${payload.customer.whatsapp}` : null,
        `State: ${payload.customer.state}`,
        `City: ${payload.customer.city}`,
        `Address: ${payload.customer.address}`,
        payload.customer.notes ? `Notes: ${payload.customer.notes}` : null,
      ].filter(Boolean);

      const url = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
      window.open(url, '_blank', 'noopener,noreferrer');

      setStatus(STATUS.success);
      setMessage(
        'WhatsApp has been opened with your order details. Press send in WhatsApp to deliver your enquiry.',
      );
      return { ok: true, mode };
    }

    /* ---------------------------------------------------------------- */
    /* ENDPOINT                                                          */
    /* ---------------------------------------------------------------- */
    if (mode === 'endpoint') {
      if (!formIntegration.endpointUrl) {
        setStatus(STATUS.error);
        setMessage(
          'The order endpoint has not been configured. Please contact Netwill Herbals directly.',
        );
        return { ok: false, mode };
      }

      setStatus(STATUS.sending);
      try {
        const response = await fetch(formIntegration.endpointUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...formIntegration.endpointHeaders,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        setStatus(STATUS.success);
        setMessage(formIntegration.successMessage);
        return { ok: true, mode };
      } catch {
        setStatus(STATUS.error);
        setMessage(formIntegration.errorMessage);
        return { ok: false, mode };
      }
    }

    setStatus(STATUS.error);
    setMessage(
      `Unknown form integration mode "${mode}". Check formIntegration.mode in src/config/site.js.`,
    );
    return { ok: false, mode };
  }, []);

  return { status, message, submit, reset, STATUS };
}
