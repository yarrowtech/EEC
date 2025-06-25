import React, { useState } from 'react';
import { CreditCard, DollarSign, Calendar, Download, ChevronDown, CheckCircle, AlertCircle } from 'lucide-react';

const FeesPayment = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);

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
                        onClick={() => setSelectedPayment(payment)}
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