"use client";

import React, { createContext, useContext, useState } from "react";
import BulkEnquiryModal from "@/components/BulkEnquiryModal";

interface BulkEnquiryContextType {
  isOpen: boolean;
  openBulkModal: () => void;
  closeBulkModal: () => void;
}

const BulkEnquiryContext = createContext<BulkEnquiryContextType>({
  isOpen: false,
  openBulkModal: () => {},
  closeBulkModal: () => {},
});

export function BulkEnquiryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openBulkModal = () => setIsOpen(true);
  const closeBulkModal = () => setIsOpen(false);

  return (
    <BulkEnquiryContext.Provider value={{ isOpen, openBulkModal, closeBulkModal }}>
      {children}
      <BulkEnquiryModal isOpen={isOpen} onClose={closeBulkModal} />
    </BulkEnquiryContext.Provider>
  );
}

export function useBulkEnquiry() {
  return useContext(BulkEnquiryContext);
}
