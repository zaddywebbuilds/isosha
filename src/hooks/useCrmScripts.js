import { useEffect } from 'react';
import { crm } from '../config/crm.js';

/**
 * Loads Netwill Herbals' Xurge CRM scripts once the order form exists.
 *
 * WHY NOT A PLAIN <script> IN index.html
 * --------------------------------------
 * Both scripts look for the form with querySelector('[id^="orderForm"]') and
 * bind on DOMContentLoaded. The form is rendered by React, which has not
 * mounted when that event fires, so loading them from the document head
 * makes both log "Form not found" and do nothing: click tracking never
 * binds, and abandoned-order capture never runs.
 *
 * Loading them from an effect guarantees the form is in the DOM first.
 *
 * The two then differ:
 *   cart_abandonment.js checks document.readyState and calls init()
 *     immediately when the document is already parsed, so it just works.
 *   click_control.js only ever binds inside a DOMContentLoaded listener,
 *     with no readyState check, so that event has to be dispatched once
 *     more after it has loaded. Re-dispatching is safe here: the only
 *     listeners registered this late are the CRM's own.
 */
export function useCrmScripts() {
  useEffect(() => {
    if (!crm.scripts?.length) return;

    // Nothing to attach to yet means something is wrong with the form.
    if (!document.querySelector('[id^="orderForm"]')) return;

    let remaining = crm.scripts.length;
    const added = [];

    const onSettled = () => {
      remaining -= 1;
      if (remaining > 0) return;
      // Give click_control.js the event it is waiting for.
      document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: false }));
    };

    crm.scripts.forEach((src) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        onSettled();
        return;
      }
      const tag = document.createElement('script');
      tag.src = src;
      tag.async = true;
      tag.dataset.crm = 'xurge';
      tag.addEventListener('load', onSettled);
      tag.addEventListener('error', onSettled);
      document.body.appendChild(tag);
      added.push(tag);
    });

    // Left in place deliberately on unmount: the CRM scripts register their
    // own global listeners and removing the tags would not unregister them.
  }, []);
}
