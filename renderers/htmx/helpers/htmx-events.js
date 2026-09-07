/**
 * Qahera UI Kit — HTMX Event Bridge (htmx-events.js)
 * 
 * Bridges HTMX response headers (HX-Trigger) with Qahera Alpine.js behavior modules
 * and provides smooth transitions, focus cleanup, and global error toasts.
 */

(function () {
  'use strict';

  if (typeof document === 'undefined') return;

  document.addEventListener('DOMContentLoaded', function () {
    // 1. Listen to HTMX trigger events and dispatch custom window events
    document.body.addEventListener('htmx:afterOnLoad', function (evt) {
      // Check for custom server trigger headers
      const triggerHeader = evt.detail.xhr?.getResponseHeader('HX-Trigger');
      if (!triggerHeader) return;

      try {
        const triggers = JSON.parse(triggerHeader);
        for (const [eventName, eventDetail] of Object.entries(triggers)) {
          window.dispatchEvent(
            new CustomEvent(eventName, {
              detail: eventDetail,
              bubbles: true,
            })
          );
        }
      } catch (e) {
        // Plain event name trigger (non-JSON)
        window.dispatchEvent(new CustomEvent(triggerHeader.trim(), { bubbles: true }));
      }
    });

    // 2. Global listener for qhr-toast-show event
    window.addEventListener('qhr-toast-show', function (evt) {
      const detail = evt.detail || {};
      const container = document.querySelector('.qhr-toast-container');
      if (!container) return;

      // If container has Alpine x-data="qhrToast()"
      if (window.Alpine && container._x_dataStack) {
        const toastData = container._x_dataStack[0];
        if (toastData && typeof toastData.add === 'function') {
          toastData.add(detail.title || 'إشعار', detail.message || '', detail.tone || 'info', detail.duration || 4000);
          return;
        }
      }
    });

    // 3. Global listener for qhr-modal-close event
    window.addEventListener('qhr-modal-close', function (evt) {
      const openModal = document.querySelector('.qhr-modal-backdrop[x-data]');
      if (openModal && window.Alpine && openModal._x_dataStack) {
        const modalData = openModal._x_dataStack[0];
        if (modalData && typeof modalData.hide === 'function') {
          modalData.hide();
        }
      }
    });

    // 4. Handle HTMX network errors with a graceful danger toast
    document.body.addEventListener('htmx:responseError', function (evt) {
      const status = evt.detail.xhr?.status || '500';
      window.dispatchEvent(
        new CustomEvent('qhr-toast-show', {
          detail: {
            title: 'خطأ في الاتصال بالخادم (' + status + ')',
            message: 'تعذر إتمام العملية المطلوبة، يرجى المحاولة مرة أخرى.',
            tone: 'danger',
            duration: 5000,
          },
        })
      );
    });
  });
})();
