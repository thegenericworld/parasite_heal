"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

export type PaymentMethod = 'crypto' | 'cards' | 'bank';

interface CouponValidation {
  valid: boolean;
  message: string;
  discount_percentage: number;
}

interface CheckoutContextType {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  orderTotal: number;
  setOrderTotal: (total: number) => void;
  couponValidation: CouponValidation | null;
  setCouponValidation: (validation: CouponValidation | null) => void;
  appliedCouponCode: string;
  setAppliedCouponCode: (code: string) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank');
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [couponValidation, setCouponValidation] = useState<CouponValidation | null>(null);
  const [appliedCouponCode, setAppliedCouponCode] = useState<string>('');

  return (
    <CheckoutContext.Provider value={{ 
      paymentMethod, 
      setPaymentMethod, 
      orderTotal, 
      setOrderTotal,
      couponValidation,
      setCouponValidation,
      appliedCouponCode,
      setAppliedCouponCode
    }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}