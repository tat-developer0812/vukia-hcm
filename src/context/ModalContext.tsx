"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

interface ModalContextType {
  isOpen: boolean;
  defaultCar?: string;
  openModal: (carSlug?: string, source?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultCar, setDefaultCar] = useState<string | undefined>();

  const openModal = (carSlug?: string, source?: string) => {
    trackEvent("quote_modal_open", {
      car: carSlug ?? "none",
      source: source ?? "unknown",
    });
    setDefaultCar(carSlug);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ isOpen, defaultCar, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
}
