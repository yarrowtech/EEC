import React, { useState } from 'react';
import { CreditCard, DollarSign, Calendar, Download, ChevronDown, CheckCircle, AlertCircle, X } from 'lucide-react';

const FeesPayment = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showUPIModal, setShowUPIModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);

  const feesData = {
    studentName: "Sarah Smith",
    class: "10-A",
    totalFees: 50000,
    paidFees: 35000,
    pendingFees: 15000,
    nextDueDate: "2024-03-15",
    payments: [
      {
        id: 1,
        type: "Tuition Fee",
        amount: 25000,
        dueDate: "2024-03-15",
        status: "Paid",
        paidOn: "2024-03-01"
      },
      {
        id: 2,
        type: "Laboratory Fee",
        amount: 5000,
        dueDate: "2024-03-15",
        status: "Pending"
      },
      {
        id: 3,
        type: "Library Fee",
        amount: 2000,
        dueDate: "2024-03-15",
        status: "Paid",
        paidOn: "2024-03-01"
      }
    ]
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 mb-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Fees Payment</h1>
        <p className="text-yellow-100">Manage and pay school fees</p>
      </div>

      {/* Student Info & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Info</h3>
          <div className="space-y-2">
            <p className="text-gray-600">Name: {feesData.studentName}</p>
            <p className="text-gray-600">Class: {feesData.class}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800">₹{feesData.totalFees}</h3>
            <p className="text-gray-600">Total Fees</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-600">₹{feesData.paidFees}</h3>
            <p className="text-gray-600">Paid Fees</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-red-600">₹{feesData.pendingFees}</h3>
            <p className="text-gray-600">Pending Fees</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600">Next Due Date: {new Date(feesData.nextDueDate).toLocaleDateString()}</span>
            </div>
          </div>

          <button className="flex items-center space-x-2 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
            <Download className="w-4 h-4" />
            <span>Download Receipt</span>
          </button>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Fee Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Due Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {feesData.payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{payment.type}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-900">
                      <DollarSign className="w-4 h-4 mr-1 text-gray-500" />
                      ₹{payment.amount}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(payment.dueDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      payment.status === 'Paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {payment.status === 'Pending' ? (
                      <button
                        onClick={() => setShowPaymentModal(true)}
                        className="inline-flex items-center px-3 py-1 border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-50"
                      >
                        <CreditCard className="w-4 h-4 mr-1" />
                        Pay Now
                      </button>
                    ) : (
                      <span className="flex items-center text-green-600">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Paid on {new Date(payment.paidOn).toLocaleDateString()}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Total Fees Due & Pay Now Button */}
      <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-sm mb-6 mt-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Total Fees Due</h2>
          <p className="text-2xl text-red-600 font-semibold">₹{feesData.pendingFees}</p>
        </div>
        <button
          className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all text-lg tracking-wide"
          onClick={() => setShowPaymentModal(true)}
        >
          Pay Now
        </button>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-yellow-300 animate-fadeIn">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-yellow-600 text-3xl font-bold focus:outline-none" onClick={() => setShowPaymentModal(false)}><X /></button>
            <h2 className="text-2xl font-bold mb-6 text-yellow-700 text-center">Select Payment Method</h2>
            <div className="space-y-4">
              <button
                className="w-full flex items-center gap-3 border border-yellow-300 py-3 rounded-xl hover:bg-yellow-50 transition-all duration-200 group justify-center"
                onClick={() => setShowUPIModal(true)}
              >
                <DollarSign className="w-6 h-6 text-yellow-500" />
                <span className="text-base font-medium text-gray-700 group-hover:text-gray-900">UPI</span>
              </button>
              <button
                className="w-full flex items-center gap-3 border border-yellow-300 py-3 rounded-xl hover:bg-yellow-50 transition-all duration-200 group justify-center"
                onClick={() => setShowCardModal(true)}
              >
                <CreditCard className="w-6 h-6 text-yellow-500" />
                <span className="text-base font-medium text-gray-700 group-hover:text-gray-900">Credit/Debit Card</span>
              </button>
              <button
                className="w-full flex items-center gap-3 border border-yellow-300 py-3 rounded-xl hover:bg-yellow-50 transition-all duration-200 group justify-center"
                onClick={() => setShowBankModal(true)}
              >
                <DollarSign className="w-6 h-6 text-yellow-500" />
                <span className="text-base font-medium text-gray-700 group-hover:text-gray-900">Net Banking</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPI QR Modal */}
      {showUPIModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm relative border border-yellow-300 animate-fadeIn flex flex-col items-center">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-yellow-600 text-3xl font-bold focus:outline-none" onClick={() => setShowUPIModal(false)}><X /></button>
            <h2 className="text-xl font-bold mb-4 text-yellow-700 text-center">Scan UPI QR to Pay</h2>
            <img src="/koushik-upi-qr.jpeg" alt="UPI QR Code" className="w-64 h-64 object-contain rounded-lg border-2 border-yellow-300 mb-4" />
            <p className="text-gray-600 text-center">Open your UPI app and scan the QR code to complete the payment.</p>
          </div>
        </div>
      )}

      {/* Card Payment Modal */}
      {showCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative border border-yellow-300 animate-fadeIn flex flex-col items-center">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-yellow-600 text-3xl font-bold focus:outline-none" onClick={() => setShowCardModal(false)}><X /></button>
            <h2 className="text-xl font-bold mb-4 text-yellow-700 text-center">Pay with Card</h2>
            <form className="w-full space-y-4">
              <input type="text" placeholder="Card Number" maxLength={19} className="w-full border border-yellow-300 rounded-lg px-4 py-4 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-lg shadow-sm" />
              <div className="flex gap-6">
                <input type="text" placeholder="MM/YY" maxLength={5} className="flex-1 border border-yellow-300 rounded-lg px-4 py-4 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-lg shadow-sm" />
                <input type="text" placeholder="CVV" maxLength={4} className="w-24 border border-yellow-300 rounded-lg px-4 py-4 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-lg shadow-sm" />
              </div>
              <input type="text" placeholder="Cardholder Name" className="w-full border border-yellow-300 rounded-lg px-4 py-4 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-lg shadow-sm" />
              <button type="button" className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white py-4 rounded-xl font-bold shadow-lg transition-all text-lg tracking-wide">Pay</button>
            </form>
          </div>
        </div>
      )}

      {/* Net Banking Modal */}
      {showBankModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm relative border border-yellow-300 animate-fadeIn flex flex-col items-center">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-yellow-600 text-3xl font-bold focus:outline-none" onClick={() => setShowBankModal(false)}><X /></button>
            <h2 className="text-xl font-bold mb-4 text-yellow-700 text-center">Net Banking</h2>
            <form className="w-full space-y-4">
              <select className="w-full border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 text-gray-800 text-base shadow-sm">
                <option value="">Select Bank</option>
                <option value="SBI">State Bank of India</option>
                <option value="HDFC">HDFC Bank</option>
                <option value="ICICI">ICICI Bank</option>
                <option value="AXIS">Axis Bank</option>
                <option value="PNB">Punjab National Bank</option>
                <option value="BOB">Bank of Baroda</option>
              </select>
              <input type="text" placeholder="Account Holder Name" className="w-full border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
              <input type="text" placeholder="Account Number" className="w-full border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
              <input type="text" placeholder="IFSC Code" className="w-full border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
              <input type="text" placeholder="Branch Name" className="w-full border border-yellow-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-yellow-50 placeholder-gray-400 text-gray-800 text-base shadow-sm" />
              <button type="button" className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all text-lg tracking-wide">Pay</button>
            </form>
          </div>
        </div>
      )}

      {/* Payment Methods */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border-2 border-yellow-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-6 h-6 text-yellow-500" />
                <div>
                  <p className="font-medium text-gray-800">Credit/Debit Card</p>
                  <p className="text-sm text-gray-500">Pay securely with your card</p>
                </div>
              </div>
              <input type="radio" name="payment" className="text-yellow-500" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm hover:border-2 hover:border-yellow-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <DollarSign className="w-6 h-6 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-800">Net Banking</p>
                  <p className="text-sm text-gray-500">Pay through your bank</p>
                </div>
              </div>
              <input type="radio" name="payment" className="text-yellow-500" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm hover:border-2 hover:border-yellow-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <DollarSign className="w-6 h-6 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-800">UPI</p>
                  <p className="text-sm text-gray-500">Pay using UPI</p>
                </div>
              </div>
              <input type="radio" name="payment" className="text-yellow-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesPayment;