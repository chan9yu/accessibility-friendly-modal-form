import { useEffect, useRef, type MouseEvent, type PropsWithChildren } from "react";

type ModalProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
}>;

export function Modal({ isOpen, onClose, children, title, description }: ModalProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      titleRef.current?.focus();
    } else {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }

      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      data-testid="modal-overlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 modal-overlay"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? "modal-description" : undefined}
        className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="modal-title"
          ref={titleRef}
          tabIndex={-1}
          className="text-2xl font-bold text-gray-900 mb-2 outline-none"
        >
          {title}
        </h2>
        {description && (
          <p id="modal-description" className="text-gray-600 text-sm mb-6">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
