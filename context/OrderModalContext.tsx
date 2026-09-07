"use client";

import React, { createContext, useContext, useState } from "react";
import OrderModal from "@/components/OrderModal";
import MobileVerificationModal from "@/components/MobileVerificationModal";

interface VerifiedUser {
  fullName: string;
  phone: string;
}

interface OrderModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  verifiedUser: VerifiedUser | null;
}

const OrderModalContext = createContext<OrderModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  verifiedUser: null,
});

export function OrderModalProvider({ children }: { children: React.ReactNode }) {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState<VerifiedUser | null>(null);

  const openModal = () => {
    if (!verifiedUser) {
      // Require Name & Mobile OTP verification first
      setIsVerificationOpen(true);
    } else {
      // Already verified in this session -> directly open order modal at checkout!
      setIsOrderModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsOrderModalOpen(false);
    setIsVerificationOpen(false);
  };

  const handleVerified = (data: { fullName: string; phone: string }) => {
    setVerifiedUser(data);
    setIsVerificationOpen(false);
    // Immediately open OrderModal straight into checkout with verified data pre-filled!
    setIsOrderModalOpen(true);
  };

  return (
    <OrderModalContext.Provider
      value={{
        isOpen: isOrderModalOpen || isVerificationOpen,
        openModal,
        closeModal,
        verifiedUser,
      }}
    >
      {children}

      {/* Step 1: Mobile Verification Modal */}
      <MobileVerificationModal
        isOpen={isVerificationOpen}
        onClose={() => setIsVerificationOpen(false)}
        onVerified={handleVerified}
      />

      {/* Step 2: Product & Checkout Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        verifiedUser={verifiedUser}
        startAtCheckout={false}
      />
    </OrderModalContext.Provider>
  );
}

export function useOrderModal() {
  return useContext(OrderModalContext);
}

