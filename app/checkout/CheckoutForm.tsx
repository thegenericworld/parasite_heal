// app/checkout/CheckoutForm.tsx
"use client";

import { useCheckout } from "@/contexts/CheckoutContext";
import type { PaymentMethod } from "@/contexts/CheckoutContext";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import Select, { SingleValue, StylesConfig } from "react-select";
import countryList from "react-select-country-list";
import { useRouter } from "next/navigation";
import CardPop from "./CardPop";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

// Define a more specific type for your form data
interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  stateRegion: string;
  country: string;
}

interface LocalCartItem {
  product_variant_id: string;
  quantity: number;
}

export default function CheckoutForm() {
  const {
    paymentMethod,
    setPaymentMethod,
    orderTotal,
  } = useCheckout();
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    stateRegion: "",
    country: "",
  });
  const [orderId, setOrderId] = useState<string | null>(null);

  const [errors, setErrors] = useState<
    Partial<Record<keyof CheckoutFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCardPop, setShowCardPop] = useState(false);
  const router = useRouter();

  type CountryOption = { value: string; label: string };
  type PaymentMethodOption = { value: string; label: string; description?: string };

  const countryOptions = useMemo<CountryOption[]>(() => {
    const allCountries = countryList().getData() as CountryOption[];

    // These labels must match the library's data exactly
    const whitelist = [
      'United States',
      'United Kingdom',
      'Australia'
    ];

    return allCountries.filter(country => whitelist.includes(country.label));
  }, []);

  // Payment method options for react-select
  const paymentMethodOptions: PaymentMethodOption[] = [
    { value: 'cards', label: 'Paypal / Cards', description: 'Pay using Paypal, debit card, credit card' },
    { value: 'bank', label: 'Bank Transfer / Wise - ✨ 20% OFF ✨', description: 'Direct bank transfer or Pay using Wise, Western Union' },
    { value: 'crypto', label: 'Crypto - ✨ 20% OFF ✨', description: 'Pay using crypto currency like USDT, Bitcoin, etc' },
  ];

  // Derive selected option either from stored name or code
  const selectedCountryOption: CountryOption | null = useMemo(() => {
    const current = (formData.country || "").trim();
    if (!current) return null;
    // If it's a 2-letter code, map by value; otherwise try matching by label (full name)
    if (/^[A-Za-z]{2}$/.test(current)) {
      const byCode = countryOptions.find((opt) => opt.value.toUpperCase() === current.toUpperCase());
      return byCode || null;
    }
    const byLabel = countryOptions.find((opt) => opt.label.toLowerCase() === current.toLowerCase());
    return byLabel || null;
  }, [formData.country, countryOptions]);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.postalCode.trim())
      newErrors.postalCode = "Postal Code is required";
    if (!formData.stateRegion.trim())
      newErrors.stateRegion = "State/Region is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Clear error for the field as user types
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name as keyof CheckoutFormData];
        return newErrors;
      });
    }
  };

  // Country change handler: store full country name in formData.country
  const handleCountryChange = (option: SingleValue<CountryOption>) => {
    const selected = option;
    setFormData((prev) => ({
      ...prev,
      country: selected?.label || "",
    }));
    if (errors.country) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n.country;
        return n;
      });
    }
  };

  // Minimal styles to match inputs while keeping it compact
  const selectStyles: StylesConfig<CountryOption, false> = {
    control: (base, state) => ({
      ...base,
      borderColor: errors.country ? "#ef4444" : state.isFocused ? "#0ea5e9" : "#cbd5e1",
      borderWidth: '2px',
      boxShadow: state.isFocused ? "0 0 0 1px #0ea5e9" : "none",
      minHeight: 52,
      borderRadius: '0.75rem',
      backgroundColor: errors.country ? '#fef2f2' : '#f8fafc',
      '&:hover': { borderColor: state.isFocused ? "#0ea5e9" : "#9ca3af" },
      fontSize: '1rem',
    }),
    placeholder: (base) => ({ ...base, color: "#64748b" }),
    valueContainer: (base) => ({ ...base, padding: '8px 16px' }),
    input: (base) => ({ ...base, margin: 0, fontSize: '1rem' }),
    indicatorsContainer: (base) => ({ ...base, height: 52 }),
    menu: (base) => ({ ...base, zIndex: 40, fontSize: '1rem' }),
    option: (base) => ({
      ...base,
      padding: '12px 16px'
    })
  };

  // Get the user's browser timezone (e.g., "Asia/Kolkata", "America/New_York")
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-validate coupon code with debounce
  useEffect(() => {
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const finalTotal = orderTotal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setSubmitSuccess(false);
    setShowSuccessModal(false);
    setShowCardPop(false);
    setSubmitError("");

    if (!validateForm()) {
      setSubmitError("Please correct the errors in the form.");
      return;
    }

    setIsSubmitting(true);
    try {

      const cartItems = JSON.parse(
        localStorage.getItem("guest_cart_items") || "[]"
      );
      const items = cartItems.map((item: LocalCartItem) => ({
        product_variant_id: parseInt(item.product_variant_id),
        quantity: item.quantity,
      }));

      const res = await axios.post(`${BASE_API_URL}/checkout/createGuestOrder`, {
        userData: formData,
        items,
        website: "PH",
        paymentMethod,
        // couponCode: appliedCouponCode,
      }, {
        headers: {
          "x-client-timezone": userTimezone // <--- Added Header here
        }
      });

      if (res?.data === undefined) {
        console.log("Error in creating order");
        return;
      }

      if (paymentMethod === 'bank') {
        router.push(`/pay-with-bank/${res.data.id}`);
      }
      if (paymentMethod === 'crypto') {
        window.location.href = res.data.paymentLink;
      } else {
        if (orderTotal < 330) {
          setOrderId(res.data.id);
          setShowCardPop(true);
        }
        else {
          setShowSuccessModal(true);
        }
      }


    } catch (error) {
      // console.error("Order placement failed:", error);
      // setSubmitError(
      //   `Order placement failed: ${
      //     error instanceof Error
      //       ? error.message
      //       : "An unexpected error occurred."
      //   }`
      // );
      console.error(error);
      setSubmitError("Order is Successful: You will soon receive a mail with the payment link via email. Please check your inbox (and spam folder) for order updates, payment instructions, and shipping notifications.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInputField = (
    label: string,
    name: keyof CheckoutFormData,
    type: string = "text",
    placeholder?: string
  ) => (
    <div key={name}>
      <label
        htmlFor={name}
        className="block font-semibold text-gray-800 mb-2"
      >
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        id={name} // Link label to input for accessibility
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required={name === "phone" ? false : true}
        placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
        className={`w-full px-4 py-2 border-2 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 text-base md:text-lg bg-white
          ${errors[name] ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}
        `}
        aria-invalid={!!errors[name]} // ARIA for invalid state
        aria-describedby={errors[name] ? `${name}-error` : undefined} // ARIA for error message
      />
      {errors[name] && (
        <p id={`${name}-error`} className="mt-2 text-base text-red-600 flex items-center gap-1 font-medium">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="md:border-gray-200 md:rounded-md md:shadow-md p-2 md:p-8">
      <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2 flex items-center">
        <svg className="w-6 h-6 text-black mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Shipping Details
      </h2>
      <p className="text-gray-600 text-sm mb-6">Please provide accurate information for delivery</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {" "}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {" "}
          {/* Responsive grid for name fields */}
          {renderInputField("First Name", "firstName", "text", "John")}
          {renderInputField("Last Name", "lastName", "text", "Doe")}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {" "}
          {/* Responsive grid for contact fields */}
          {renderInputField(
            "Email Address",
            "email",
            "email",
            "john.doe@example.com"
          )}
          {renderInputField(
            "Phone Number",
            "phone",
            "tel",
            "+1 (555) 123-4567"
          )}
        </div>

        {renderInputField("Street Address", "address", "text", "123 Main St")}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {" "}
          {/* Grid for city, postal code, state */}
          {renderInputField("City", "city", "text", "New York")}
          {renderInputField("Postal Code", "postalCode", "text", "10001")}
          {renderInputField("State / Region", "stateRegion", "text", "NY")}
        </div>

        {/* Country Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <p>
            <label htmlFor="country" className="block text-[15px] sm:text-base font-semibold text-gray-800 mb-2">
              Country *
            </label>
            <Select
              id="country"
              instanceId="country-select"
              options={countryOptions}
              value={selectedCountryOption}
              onChange={handleCountryChange}
              placeholder="Select a country"
              isSearchable
              styles={selectStyles}
              classNamePrefix="react-select"
            />
          </p>
          <p className="md:mt-8 text-gray-700">If you are from different country, please contact: <a className="text-blue-600 font-bold" href="mailto:ParasiteHeal@gmail.com">ParasiteHeal@gmail.com</a></p>
        </div>


        {/* Payment Method Selection */}
        <div>
          <label className="block  font-semibold text-gray-800 mb-4">
            How would you like to pay? *
          </label>
          <div className="space-y-3">
            {paymentMethodOptions.map((option) => (
              <div key={option.value} className="flex items-start">
                <input
                  type="radio"
                  id={`payment-${option.value}`}
                  name="paymentMethod"
                  value={option.value}
                  checked={paymentMethod === option.value}
                  onChange={(e) => {
                    if (e.target.value === 'crypto' || e.target.value === 'cards' || e.target.value === 'bank') {
                      setPaymentMethod(e.target.value as PaymentMethod);
                    }
                  }}
                  className="mt-1 h-5 w-5 text-blue-600 cursor-pointer accent-blue-600"
                />
                <label htmlFor={`payment-${option.value}`} className="ml-3 cursor-pointer flex-1">
                  <div className="font-semibold text-gray-900">{option.label}</div>
                  {option.description && (
                    <div className="text-sm my-1 text-gray-800">{option.description}</div>
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Coupon Code Section */}
        {/* <div className="border-t border-b border-gray-200 py-6">
            <label className="block font-semibold text-gray-800 mb-4">
              Have a coupon code?
            </label>
            <div className="mb-4">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 text-base"
              />
            </div>

            {couponLoading && (
              <div className="px-4 py-3 rounded-lg flex items-center gap-2 bg-blue-50 border border-blue-200">
                <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span className="text-blue-700">Validating coupon...</span>
              </div>
            )}

            {couponValidation && !couponLoading && (
              <div
                className={`px-4 py-3 rounded-lg flex items-start gap-2 ${
                  couponValidation.valid
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                {couponValidation.valid ? (
                  <svg className="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
                <div>
                  <p className={`font-semibold ${couponValidation.valid ? "text-green-800" : "text-red-800"}`}>
                    {couponValidation.valid ? `Coupon Code is Valid. ${couponValidation.discount_percentage}% discount applied!` : "Coupon Code is Invalid."}
                  </p>
                </div>
              </div>
            )}
          </div> */}

        {submitError && (
          <div
            className="bg-green-50 border-l-4 border-green-500 text-green-700 px-5 py-4 rounded-lg flex items-start gap-3 shadow-md"
            role="alert"
          >
            {/* <svg className="w-6 h-6 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg> */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <strong className="font-bold block">Success!</strong>
              <span className="block text-sm mt-1">{submitError}</span>
            </div>
          </div>
        )}

        <div className="md:hidden flex justify-between items-center mt-6 py-4 border-t border-b border-gray-200">
          <span className="text-lg font-bold text-gray-900">Order Total</span>
          <span className="text-2xl font-bold text-black">${finalTotal.toFixed(2)}</span>
        </div>

        <button
          type="submit"
          className={`w-full px-6 py-4 mt-4 md:mt-8 text-lg font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg
        text-white bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-sky-300 cursor-pointer transform hover:-translate-y-0.5 hover:shadow-xl`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              Processing Order...
            </>
          ) : (
            <>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Place Order & Pay
            </>
          )}
        </button>



      </form>
      {showSuccessModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4 ">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full border-4 border-gray-600">
            <div className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h3>
              <p className="text-gray-600 text-base mb-2">
                We have received your order. Our team have sent you an email with the payment instructions. Please check your inbox (and spam folder).
              </p>
              <p className="text-gray-600 text-base mb-6">
                If you have any questions or need assistance, please contact our support team at <a href="mailto:ParasiteHeal@gmail.com" className="text-blue-600 hover:underline">ParasiteHeal@gmail.com</a>.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {
        showCardPop && (
          <CardPop amt={finalTotal} customerName={formData.firstName + " " + formData.lastName} orderId={orderId || "00"} onClose={() => setShowCardPop(false)} />
        )
      }


    </div>
  );
}