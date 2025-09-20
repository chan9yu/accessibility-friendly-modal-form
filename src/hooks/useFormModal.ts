import { useRef, useEffect } from "react";
import { useModal } from "./useModal";

export type FormData = {
  name: string;
  email: string;
  experience: string;
  github?: string;
};

export function useFormModal() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const resolveRef = useRef<((value: FormData | null) => void) | null>(null);

  const openFormModal = () => {
    return new Promise<FormData | null>((resolve) => {
      resolveRef.current = resolve;
      openModal();
    });
  };

  const closeFormModal = (data: FormData | null = null) => {
    closeModal();
    if (resolveRef.current) {
      resolveRef.current(data);
      resolveRef.current = null;
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isModalOpen) {
        closeFormModal(null);
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return {
    isModalOpen,
    openFormModal,
    closeFormModal,
  };
}
