'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const FloatingChat = () => {
  const isOpenRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Other',
    message: '',
  });

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      const response = await axios.post(`${BASE_API_URL}/contact`, formData);

      if (response.status === 200) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'Other',
          message: '',
        });
      } else {
        throw new Error('Server Error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'Other',
      message: '',
    });
  };

  // Success state
  if (status === 'success' && isOpen) {
    return (
      <>
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
          <button
            onClick={handleToggleChat}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 shadow-xl transition-all"
            aria-label="Close chat"
            type="button"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        <div className="fixed bottom-24 right-4 md:bottom-28 md:right-6 z-50 w-full max-w-md bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200 px-6 py-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="font-bold text-xl text-slate-900">Message Sent!</h2>
                </div>
                <p className="text-lg text-slate-700 font-medium">
                  Thank you for contacting us.
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggleChat}
                className="text-slate-500 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 text-center">
            <p className="text-lg text-slate-700 mb-4">
              Our support team has received your message and will reply within <strong className="text-green-600 text-xl">8 hours</strong> via email.
            </p>
            <p className="text-base text-slate-600 mb-6">
              Please check your inbox (and spam folder) for our response.
            </p>
            <button
              onClick={handleReset}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition-colors w-full"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Chat Toggle Container */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">

        {/* Chat Toggle Button */}
        <div className="relative ml-auto">
          {!isOpen && (
            <div
              className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-25"
              style={{ animationDuration: '2.5s' }}
            />
          )}
          <button
            onClick={handleToggleChat}
            className={`relative flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 ease-out shadow-xl hover:shadow-2xl ${
              isOpen
                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-110'
            }`}
            aria-label={isOpen ? 'Close help' : 'Open help'}
            type="button"
          >
            {isOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <MessageCircle className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Help Form Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:bottom-28 md:right-6 z-50 w-full max-w-md bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200 px-6 py-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-bold text-xl text-slate-900">
                  How can we help?
                </h2>
              </div>
              <button
                type="button"
                onClick={handleToggleChat}
                className="text-slate-500 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-white">
           

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="help-email" className="text-base font-bold text-slate-800">
                Your Email
              </label>
              <input
                required
                id="help-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-base"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="help-message" className="text-base font-bold text-slate-800">
                Your Message or Question
              </label>
              <textarea
                required
                id="help-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us your question or message"
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-none text-base"
              ></textarea>
            </div>

            {/* Error Message */}
            {status === 'error' && (
              <div className="flex items-start gap-3 text-red-700 bg-red-50 p-4 rounded-lg border-2 border-red-200">
                <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <p className="text-base font-medium">
                  Something went wrong. Please check your connection and try again.
                </p>
              </div>
            )}

            {/* Response Time Info */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <p className="text-base text-blue-900 font-medium text-center">
                ⏱️ We will reply via email within <strong className="text-lg">8 hours</strong>
              </p>
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>Sending...</>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
};
