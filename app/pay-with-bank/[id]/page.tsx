import React from 'react';
import CopyButton from './CopyButton';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

// Matches your API payload structure perfectly
interface ApiResponse {
    order: {
        order_id: number;
        total: string;
        subtotal: string;
        shipping_fee: string;
        discount: string;
        name: string;
        email: string;
        phone: string;
        street: string;
        city: string;
        postcode: string;
        state: string;
        country: string;
    };
}

const getData = async (orderId: string): Promise<ApiResponse | null> => {
    try {
        const res = await fetch(`${BASE_API_URL}/checkout/${orderId}`, {
            next: { revalidate: 0 }, // Avoid stale data for critical checkout information
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("Failed to fetch order details:", error);
        return null;
    }
};

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
    const { id: orderId } = await params;
    const data = await getData(orderId);

    if (!data || !data.order) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center max-w-sm">
                    <p className="text-red-600 font-semibold">Order Error</p>
                    <p className="text-gray-500 text-sm mt-1">Could not load details for Order #{orderId}. Please try again.</p>
                </div>
            </div>
        );
    }

    const { order } = data;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-800">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                {/* Banner Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white sm:px-10">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Payment Instructions</h1>
                            <p className="mt-1 text-blue-100 font-medium text-sm sm:text-base">Bank Trasnfer/ Wire Transfer / Wise / Western Union</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10 self-start sm:self-auto text-sm">
                            Order ID: <span className="font-mono font-bold">#{order.order_id}</span>
                        </div>
                    </div>
                </div>

                {/* Main Body */}
                <div className="px-6 py-8 sm:px-10 space-y-8">

                    {/* Dynamic Greeting */}
                    <div className="bg-blue-50/40 border border-blue-100 rounded-xl p-5">
                        <p className="text-lg">
                            Dear <strong className="text-blue-950">{order.name}</strong>,
                        </p>
                        <p className="mt-1 text-gray-600 leading-relaxed">
                            Thank you for your order! Please transfer the total amount shown below to our verified business bank account to complete your purchase.
                        </p>
                    </div>

                    {/* Dynamic Order Summary Grid */}
                    <div className="border border-gray-200 rounded-xl p-5 bg-gray-50/50">
                        <h3 className="text-sm font-bold text-gray-900 tracking-wide uppercase mb-3">Order Invoice Summary</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-gray-600">
                                <span>Items Subtotal:</span>
                                <span className="font-medium">${order.subtotal}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping Fee:</span>
                                <span className="font-medium">${order.shipping_fee}</span>
                            </div>
                            {parseFloat(order.discount) > 0 && (
                                <div className="flex justify-between text-emerald-600">
                                    <span>Discount Applied:</span>
                                    <span>-${order.discount}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
                                <span>Total Amount Due:</span>
                                <span className="text-indigo-600 text-lg">${order.total} USD</span>
                            </div>
                        </div>
                    </div>

                    {/* Copyable Bank Details Grid */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-5 bg-indigo-600 rounded-full inline-block"></span>
                            Bank Information
                        </h3>

                        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm divide-y divide-gray-100">

                            <div className="p-4 sm:grid sm:grid-cols-4 sm:items-center sm:gap-4">
                                <span className="text-xs font-bold tracking-wider text-gray-400 uppercase block sm:inline">Bank Name</span>
                                <span className="text-sm font-semibold text-gray-900 sm:col-span-2 block mt-0.5 sm:mt-0">Kotak Mahindra Bank</span>
                                <div className="sm:text-right mt-2 sm:mt-0"><CopyButton text="Kotak Mahindra Bank" /></div>
                            </div>

                            <div className="p-4 sm:grid sm:grid-cols-4 sm:items-center sm:gap-4 bg-gray-50/30">
                                <span className="text-xs font-bold tracking-wider text-gray-400 uppercase block sm:inline">Account Name</span>
                                <span className="text-sm font-semibold text-gray-900 sm:col-span-2 block mt-0.5 sm:mt-0">Akshay Sakode</span>
                                <div className="sm:text-right mt-2 sm:mt-0"><CopyButton text="Akshay Sakode" /></div>
                            </div>

                            <div className="p-4 sm:grid sm:grid-cols-4 sm:items-center sm:gap-4">
                                <span className="text-xs font-bold tracking-wider text-gray-400 uppercase block sm:inline">Account Number</span>
                                <span className="text-base font-mono font-bold text-indigo-700 sm:col-span-2 block mt-0.5 sm:mt-0 tracking-wide">9812897488</span>
                                <div className="sm:text-right mt-2 sm:mt-0"><CopyButton text="9812897488" /></div>
                            </div>

                            <div className="p-4 sm:grid sm:grid-cols-4 sm:items-center sm:gap-4 bg-gray-50/30">
                                <span className="text-xs font-bold tracking-wider text-gray-400 uppercase block sm:inline">IFSC Code</span>
                                <span className="text-sm font-mono font-semibold text-gray-900 sm:col-span-2 block mt-0.5 sm:mt-0">KKBK0001835</span>
                                <div className="sm:text-right mt-2 sm:mt-0"><CopyButton text="KKBK0001835" /></div>
                            </div>

                            <div className="p-4 sm:grid sm:grid-cols-4 sm:items-center sm:gap-4">
                                <span className="text-xs font-bold tracking-wider text-gray-400 uppercase block sm:inline">SWIFT Code</span>
                                <span className="text-sm font-mono font-semibold text-gray-900 sm:col-span-2 block mt-0.5 sm:mt-0">KKBKINBB</span>
                                <div className="sm:text-right mt-2 sm:mt-0"><CopyButton text="KKBKINBB" /></div>
                            </div>

                            <div className="p-4 sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 bg-gray-50/30">
                                <span className="text-xs font-bold tracking-wider text-gray-400 uppercase block sm:inline mt-1">Address</span>
                                <span className="text-xs text-gray-600 sm:col-span-2 block mt-0.5 sm:mt-0 leading-relaxed">
                                    340th Sandesh Dawa Bazar, CITY - Nagpur, STATE - Maharashtra, PINCODE / ZIPCODE - 440018, Country - INDIA
                                </span>
                                <div className="sm:text-right mt-2 sm:mt-0">
                                    <CopyButton text="340th Sandesh Dawa Bazar, CITY - Nagpur, STATE - Maharashtra, PINCODE / ZIPCODE - 440018, Country - INDIA" />
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Action Instruction Cards */}
                    <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
                        <h4 className="text-base font-bold text-gray-900 mb-4">How to Complete Your Payment:</h4>
                        <ol className="space-y-3.5 text-sm text-gray-600">
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-xs mt-0.5">1</span>
                                <span>Open your standard banking terminal, portal app, or third-party platforms like <strong>Wise</strong> or <strong>Western Union</strong>.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-xs mt-0.5">2</span>
                                <span>Add above shown bank details. (use copy button to copy details without mistake)</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-xs mt-0.5">3</span>
                                <span>Pay exactly <strong className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">${order.total} USD</strong>.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-xs mt-0.5">4</span>
                                <span>Mail a screenshot of your payment receipt to our email address (<a href="mailto:ParasiteHeal@gmail.com" className='text-blue-600'>ParasiteHeal@gmail.com</a>).</span>
                            </li>
                        </ol>
                    </div>

                    {/* Shipping & Delivery Grid */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                        <h4 className="text-sm font-bold text-gray-900 tracking-wide uppercase mb-4">Shipping & Order Timeline</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-600">
                            <li className="bg-white p-3.5 rounded-lg border border-gray-100">
                                <span className="block font-semibold text-gray-900 mb-1">Clearing Time</span>
                                International payments take **3–5 business days** to hit our account.
                            </li>
                            <li className="bg-white p-3.5 rounded-lg border border-gray-100">
                                <span className="block font-semibold text-gray-900 mb-1">Payment Confirmation</span>
                                Once we receive your payment, we will send you a confirmation email immediately.
                            </li>
                            <li className="bg-white p-3.5 rounded-lg border border-gray-100">
                                <span className="block font-semibold text-gray-900 mb-1">Tracking Code Release</span>
                                Tracking details will be shared in 3 business days after confirmation.
                            </li>
                            <li className="bg-white p-3.5 rounded-lg border border-gray-100">
                                <span className="block font-semibold text-gray-900 mb-1">Transit Window</span>
                                Delivery takes 7–15 business days. Your package will be safely packed.
                            </li>
                        </ul>
                    </div>

                    {/* Footer block */}
                    <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-gray-500">
                        <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 w-full sm:w-auto">
                            <p className="font-semibold text-gray-700">Have questions?</p>
                            <p className="mt-0.5">Mail us at: <a href="mailto:ParasiteHeal@gmail.com" className="text-blue-600">ParasiteHeal@gmail.com</a></p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}