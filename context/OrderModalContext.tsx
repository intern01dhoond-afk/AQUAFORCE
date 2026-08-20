"use client";

import React, { createContext, useContext, useState } from "react";
import OrderModal from "@/components/OrderModal";

interface OrderModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const OrderModalContext = createContext<OrderModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function OrderModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <OrderModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <OrderModal isOpen={isOpen} onClose={closeModal} />
    </OrderModalContext.Provider>
  );
}

export function useOrderModal() {
  return useContext(OrderModalContext);
}
