"use client";

import { useState, useId } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";
const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
import Select from "react-select";

const subjectOptions = [
  { value: "Medicine Request", label: "Medicine Request" },
  { value: "Order Status", label: "Order Status" },
  { value: "Prescription Help", label: "Prescription Help" },
  { value: "Payment Issue", label: "Payment Issue" },
  { value: "Other", label: "Other" },
];

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const subjectSelectId = useId();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Medicine Request",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      // Send data to OUR backend API, not Telegram directly
      const response = await axios.post(`${BASE_API_URL}/contact`, formData);

      if (response.status === 200) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "Order Status", message: "" });
      } else {
        throw new Error("Server API Error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-100 h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h2>
        <p className="text-slate-600 mb-8 max-w-sm">
          Thank you for reaching out. Our support team has received your message and will reply shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="bg-gray-100 hover:bg-gray-200 text-slate-800 font-bold py-3 px-8 rounded-xl transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className=" h-full">
      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-bold text-slate-700">Your Name</label>
            <input
              required
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-bold text-slate-700">Email Address</label>
            <input
              required
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="john@example.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-bold text-slate-700">Phone (Optional)</label>
            <input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="subject"
              className="text-sm font-bold text-slate-700"
            >
              Subject
            </label>

            <Select
              instanceId={subjectSelectId}
              id="subject"
              name="subject"
              options={subjectOptions}
              value={subjectOptions.find(
                option => option.value === formData.subject
              )}
              onChange={(selectedOption) =>
                setFormData({
                  ...formData,
                  subject: selectedOption?.value ? selectedOption.value : formData.subject,
                })
              }
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-bold text-slate-700">Message</label>
          <textarea
            required
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            placeholder="How can we help you today?"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-none"
          ></textarea>
        </div>

        {status === "error" && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
            <AlertCircle className="w-5 h-5" />
            Something went wrong. Please check your connection.
          </div>
        )}

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>Processing...</>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </button>

        <p className="text-center text-xs text-slate-400 mt-4">
          By sending this message, you agree to our privacy policy.
        </p>
      </form>
    </div>
  );
}