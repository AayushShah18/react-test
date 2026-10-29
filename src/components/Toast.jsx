import { useEffect } from "react";

const TOAST_DURATION_MS = 5000;

function Toast({ message, actionLabel, onAction, onDismiss }) {
  // Hide the toast automatically after a few seconds. Changing the message restarts the timer.
  useEffect(() => {
    const timer = setTimeout(onDismiss, TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  return (
    <div className="toast" role="status">
      <span>{message}</span>
      {actionLabel && (
        <button className="toast-action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
      <button className="toast-close" onClick={onDismiss} aria-label="Dismiss">
        ✕
      </button>
    </div>
  );
}

export default Toast;
