import React from 'react'

interface CardPopProps {
  onClose?: () => void;
  amt?: number | null,
  customerName?: string;
  orderId?: string;
}

function getPaymentLink(amount: number): string {

  const productIds = {
    '35-49': 'MOBtu',
    '50-74': 'YprJG',
    '75-99': 'JLQFa',
    '100-124': 'nvemN',
    '125-149': 'wq9jS',
    '150-174': 'ZI68i',
    '175-199': 'PIQ2v',
    '200-224': 'ptEZA',
    '225-249': '0bY9f',
    '250-274': '9tixS',
    '275-299': 'cDr9W',
    '300-349': 'lvtGC',
    '350-399': 'suyeg',
    '400-449': 'ofPYb',
    '450-499': 'j9C54',
  };

  let productId = productIds['125-149']; // default

  if (amount >= 35 && amount < 50) productId = productIds['35-49'];
  else if (amount >= 50 && amount < 75) productId = productIds['50-74'];
  else if (amount >= 75 && amount < 100) productId = productIds['75-99'];
  else if (amount >= 100 && amount < 125) productId = productIds['100-124'];
  else if (amount >= 125 && amount < 150) productId = productIds['125-149'];
  else if (amount >= 150 && amount < 175) productId = productIds['150-174'];
  else if (amount >= 175 && amount < 200) productId = productIds['175-199'];
  else if (amount >= 200 && amount < 225) productId = productIds['200-224'];
  else if (amount >= 225 && amount < 250) productId = productIds['225-249'];
  else if (amount >= 250 && amount < 275) productId = productIds['250-274'];
  else if (amount >= 275 && amount < 300) productId = productIds['275-299'];
  else if (amount >= 300 && amount < 350) productId = productIds['300-349'];
  else if (amount >= 350 && amount < 400) productId = productIds['350-399'];
  else if (amount >= 400 && amount < 450) productId = productIds['400-449'];
  else if (amount >= 450 && amount < 550) productId = productIds['450-499'];

  return `https://payhip.com/buy?link=${productId}`;

}

const CardPop = ({ onClose, amt, customerName, orderId }: CardPopProps) => {

  const PaymentLink = getPaymentLink(amt ? amt : 35);
  return (
    // Full-screen backdrop overlay
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>

      {/* Modal Card Container */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-gray-100 relative flex flex-col animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10" onClick={(e) => e.stopPropagation()}>
          <div>
            <h2 className="text-xl font-bold text-gray-950">Complete Your Payment</h2>
            <p className="text-sm text-gray-500 mt-1">Order #{orderId}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 p-2 rounded-full transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-sm leading-relaxed text-gray-700">

          {/* Greeting & Main Notice */}
          <p className="font-semibold text-gray-950 text-base">Dear {customerName},</p>
          <p>Card companies usually have restrictions on online medicines purchase. To ensure smooth card payments, payment will appear as Software purchase. However, you will receive the exact products of your order.</p>

          {/* Steps */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-3">
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Click on the button below to complete the payment.</li>
              <li>We have given you extra discount on the payment (Discount is randomly selected by the system).</li>
            </ol>
            {/* Warning Callout */}
            <p className="text-amber-700 bg-amber-50 border border-amber-200/60 rounded-lg p-3 text-xs font-medium mt-2">
              ⚠️ <span className="font-semibold">Please note:</span> Do not mention medicine or related terms now or in the future. (MENTION: SOFTWARE PURCHASE)
            </p>
          </div>

          <div className="space-y-2">
            <a
              href={PaymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl shadow-sm transition-colors duration-150"
            >
              Pay Now
            </a>
          </div>

          {/* Delivery & Timeline Details */}
          <div className="grid grid-cols-2 gap-4 border-t border-b border-gray-100 py-4 text-xs">
            <div>
              <span className="block text-gray-400 font-medium">Confirmation</span>
              <span className="font-semibold text-gray-900">Email within 12 hours</span>
            </div>
            <div>
              <span className="block text-gray-400 font-medium">Tracking Details</span>
              <span className="font-semibold text-gray-900">Shared in 3-5 business days</span>
            </div>
            <div>
              <span className="block text-gray-400 font-medium">Delivery Timeline</span>
              <span className="font-semibold text-gray-900">7–15 business days</span>
            </div>
            <div>
              <span className="block text-gray-400 font-medium">Packaging</span>
              <span className="font-semibold text-gray-900">Safely & discreetly packed</span>
            </div>
          </div>

          {/* FAQ / Why Section */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-950">Why Do We Use This Payment Method?</h4>
            <p className="text-gray-500 text-xs">
              We use this method to keep your information safe and your orders reliable. It helps us serve you without delays or interruptions. Many customers have used this method successfully and securely. Your payment applies exclusively to Order and does not alter your order choices.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CardPop;