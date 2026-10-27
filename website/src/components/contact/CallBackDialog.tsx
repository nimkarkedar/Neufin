"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import { ContactForm } from "./ContactForm";

// Request a call back (Kedar, 2026-10-27): the button opens the Contact page's form in the
// design system's dialog, so the visitor stays on the page they were reading. On send the
// dialog closes and a toast confirms it, since nothing else on screen does. The form is
// built only while the dialog is open, so it starts empty each time.
// TODO: the form isn't connected to the forms backend yet (src/lib/callback.ts).
const message = "Thanks, we'll call you within one business day.";

export function CallBackDialog({ className = "" }: { className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<"shown" | "leaving" | null>(null);

  // Open as a modal once the form has rendered inside it.
  useEffect(() => {
    if (open) dialog.current?.showModal();
  }, [open]);

  // The toast stays about 5 seconds, then fades out (removed when the fade ends; at once
  // with reduced motion, where there is no fade).
  useEffect(() => {
    if (toast !== "shown") return;
    const t = window.setTimeout(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setToast(null);
      else setToast("leaving");
    }, 5000);
    return () => window.clearTimeout(t);
  }, [toast]);

  const sent = () => {
    dialog.current?.close();
    setToast("shown");
  };

  // One wrapper, so the button, the dialog and the live region count as one item in the
  // footer card's column (its spacing rules look at the last children).
  return (
    <div className={className}>
      <button type="button" className="btn btn-secondary" aria-haspopup="dialog" onClick={() => setOpen(true)}>
        Request a call back
      </button>

      {open && (
        <dialog
          ref={dialog}
          className="dialog"
          // Named by the form's own title, "Tell us what you need".
          aria-labelledby="callback-title"
          onClose={() => setOpen(false)}
          // A click on the dimmed page around the window closes it.
          onClick={(e) => e.target === dialog.current && dialog.current.close()}
        >
          <button type="button" className="dialog-close" aria-label="Close" onClick={() => dialog.current?.close()}>
            <IconSvg icon={icons.close} size={24} />
          </button>
          <ContactForm bare idPrefix="callback" onSent={sent} />
        </dialog>
      )}

      {/* Screen readers hear the message through this live region, which is always on the
          page. The toast people see is drawn at the end of <body>: a block of the footer
          card lifts with a transform on hover, which would pin a fixed toast inside it. */}
      <p role="status" className="visually-hidden">
        {toast && message}
      </p>
      {toast &&
        createPortal(
          <p className="toast" aria-hidden="true" data-leaving={toast === "leaving" || undefined} onTransitionEnd={() => setToast(null)}>
            <span className="toast-icon">
              <IconSvg icon={icons.check} size={20} />
            </span>
            {message}
          </p>,
          document.body,
        )}
    </div>
  );
}
