"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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

  // Load verified user from localStorage on mount so returning users don't need OTP again
  useEffect(() => {
    try {
      const saved = localStorage.getItem("promec_verified_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.phone && parsed?.fullName) {
          setVerifiedUser(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to read verified user from localStorage:", e);
    }
  }, []);

  const openModal = () => {
    if (!verifiedUser) {
      // Require Name & Mobile OTP verification first
      setIsVerificationOpen(true);
    } else {
      // Already verified previously -> skip OTP completely and open product modal!
      setIsOrderModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsOrderModalOpen(false);
    setIsVerificationOpen(false);
  };

  const handleVerified = (data: { fullName: string; phone: string }) => {
    setVerifiedUser(data);
    // Persist so user is never asked for OTP again
    try {
      localStorage.setItem("promec_verified_user", JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save verified user to localStorage:", e);
    }
    setIsVerificationOpen(false);
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

