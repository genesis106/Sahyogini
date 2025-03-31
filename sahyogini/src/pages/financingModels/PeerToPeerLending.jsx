import React, { useState, useEffect } from 'react';

const PeerToPeerLending = () => {
  const [step, setStep] = useState(1);
  const [loanDetails, setLoanDetails] = useState({
    amount: '',
    purpose: '',
    duration: '',
    interestRate: '',
    repaymentSchedule: '',
    story: '',
    collateral: '',
    creditScore: '',
    monthlyIncome: ''
  });
  const [errors, setErrors] = useState({});
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  // Calculate monthly payment when relevant values change
  useEffect(() => {
    if (loanDetails.amount && loanDetails.duration && loanDetails.interestRate) {
      const principal = parseFloat(loanDetails.amount);
      const interestRate = parseFloat(loanDetails.interestRate) / 100 / 12; // Monthly interest rate
      const numberOfPayments = parseFloat(loanDetails.duration);
      
      // Monthly payment formula: P × r × (1 + r)^n / ((1 + r)^n - 1)
      const payment = principal * interestRate * Math.pow(1 + interestRate, numberOfPayments) / 
                     (Math.pow(1 + interestRate, numberOfPayments) - 1);
      
      setMonthlyPayment(payment.toFixed(2));
    } else {
      setMonthlyPayment(null);
    }
  }, [loanDetails.amount, loanDetails.duration, loanDetails.interestRate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!loanDetails.amount) newErrors.amount = "Amount is required";
    else if (loanDetails.amount < 5000 || loanDetails.amount > 1000000) 
      newErrors.amount = "Amount must be between ₹5,000 and ₹10,00,000";
    
    if (!loanDetails.purpose) newErrors.purpose = "Purpose is required";
    if (!loanDetails.duration) newErrors.duration = "Duration is required";
    if (!loanDetails.interestRate) newErrors.interestRate = "Interest rate is required";
    if (!loanDetails.repaymentSchedule) newErrors.repaymentSchedule = "Repayment schedule is required";
    if (!loanDetails.creditScore) newErrors.creditScore = "Credit score is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoanDetails(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleNextStep = () => {
    if (validateForm()) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    // Here you would handle the actual submission to your backend
    alert("Loan application submitted successfully!");
    // Reset form for new application
    setLoanDetails({
      amount: '',
      purpose: '',
      duration: '',
      interestRate: '',
      repaymentSchedule: '',
      story: '',
      collateral: '',
      creditScore: '',
      monthlyIncome: ''
    });
    setStep(1);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Peer-to-Peer Lending Platform</h1>
          <p className="mt-3 text-lg text-gray-600">
            Connect directly with individual lenders for flexible financing options
          </p>
        </div>
        
        {/* Progress Bar */}
       {/* Progress Bar */}
<div className="max-w-3xl mx-auto mb-8">
  <div className="flex justify-between mb-2">
    <span className="text-sm font-medium">Loan Details</span>
    <span className="text-sm font-medium">Review & Submit</span>
  </div>
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div 
      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
      style={{ width: `${(step / 2) * 100}%` }} // Dynamically calculate width based on step
    ></div>
  </div>
</div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">How It Works</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <p className="font-medium">Create your loan listing</p>
                    <p className="text-sm text-gray-600">Specify amount, purpose, and terms</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <p className="font-medium">Get multiple funding offers</p>
                    <p className="text-sm text-gray-600">Lenders compete for your business</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <p className="font-medium">Accept your preferred offer</p>
                    <p className="text-sm text-gray-600">Funds are transferred within 24-48 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">4</div>
                  <div>
                    <p className="font-medium">Make regular repayments</p>
                    <p className="text-sm text-gray-600">Build your credit score with on-time payments</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Benefits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="text-blue-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="font-medium">Lower Interest Rates</p>
                  <p className="text-sm text-gray-600">Typically 2-5% lower than banks</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="text-blue-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="font-medium">Quick Processing</p>
                  <p className="text-sm text-gray-600">Get funds in as little as 48 hours</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="text-blue-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="font-medium">Flexible Terms</p>
                  <p className="text-sm text-gray-600">Customize your repayment plan</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="text-blue-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="font-medium">Full Transparency</p>
                  <p className="text-sm text-gray-600">No hidden fees or charges</p>
                </div>
              </div>
            </div>
            
            {/* Loan Calculator */}
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Loan Calculator</h2>
                {monthlyPayment ? (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-sm text-gray-600">Estimated Monthly Payment:</p>
                    <p className="text-2xl font-bold text-blue-600">₹{parseFloat(monthlyPayment).toLocaleString('en-IN')}</p>
                    <p className="text-xs text-gray-500 mt-1">Based on your current inputs</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">Fill in the loan amount, duration, and interest rate to see your estimated monthly payment.</p>
                )}
              </div>
            )}
          </div>
          
          {/* Right Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button 
                    className={`px-6 py-4 font-medium text-sm focus:outline-none ${step === 1 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                    onClick={() => setStep(1)}
                  >
                    Loan Application
                  </button>
                  <button 
                    className={`px-6 py-4 font-medium text-sm focus:outline-none ${step === 2 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'} ${Object.keys(errors).length > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => validateForm() && setStep(2)}
                    disabled={Object.keys(errors).length > 0}
                  >
                    Review & Submit
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {step === 1 ? (
                  <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Loan Amount (₹) *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">₹</span>
                          </div>
                          <input 
                            type="number" 
                            name="amount"
                            min="5000"
                            max="1000000"
                            value={loanDetails.amount}
                            onChange={handleInputChange}
                            placeholder="5,000 - 10,00,000"
                            className={`pl-8 w-full py-2 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                          />
                        </div>
                        {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Loan Purpose *
                        </label>
                        <select 
                          name="purpose"
                          value={loanDetails.purpose}
                          onChange={handleInputChange}
                          className={`w-full py-2 border ${errors.purpose ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                        >
                          <option value="">Select purpose</option>
                          <option value="Business Expansion">Business Expansion</option>
                          <option value="Working Capital">Working Capital</option>
                          <option value="Equipment Purchase">Equipment Purchase</option>
                          <option value="Inventory Financing">Inventory Financing</option>
                          <option value="Education">Education</option>
                          <option value="Medical Emergency">Medical Emergency</option>
                          <option value="Debt Consolidation">Debt Consolidation</option>
                          <option value="Home Improvement">Home Improvement</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.purpose && <p className="mt-1 text-sm text-red-600">{errors.purpose}</p>}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Loan Duration (months) *
                        </label>
                        <select 
                          name="duration"
                          value={loanDetails.duration}
                          onChange={handleInputChange}
                          className={`w-full py-2 border ${errors.duration ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                        >
                          <option value="">Select duration</option>
                          <option value="3">3 months</option>
                          <option value="6">6 months</option>
                          <option value="12">12 months</option>
                          <option value="18">18 months</option>
                          <option value="24">24 months</option>
                          <option value="36">36 months</option>
                          <option value="48">48 months</option>
                          <option value="60">60 months</option>
                        </select>
                        {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Interest Rate (% p.a.) *
                        </label>
                        <div className="relative">
                          <input 
                            type="number" 
                            name="interestRate"
                            min="6"
                            max="24"
                            step="0.5"
                            value={loanDetails.interestRate}
                            onChange={handleInputChange}
                            placeholder="6% - 24%"
                            className={`w-full py-2 pr-8 border ${errors.interestRate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">%</span>
                          </div>
                        </div>
                        {errors.interestRate && <p className="mt-1 text-sm text-red-600">{errors.interestRate}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Repayment Schedule *
                        </label>
                        <select 
                          name="repaymentSchedule"
                          value={loanDetails.repaymentSchedule}
                          onChange={handleInputChange}
                          className={`w-full py-2 border ${errors.repaymentSchedule ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                        >
                          <option value="">Select schedule</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Bi-weekly">Bi-weekly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Quarterly">Quarterly</option>
                        </select>
                        {errors.repaymentSchedule && <p className="mt-1 text-sm text-red-600">{errors.repaymentSchedule}</p>}
                      </div>
                    </div>
                    
                    {/* Additional fields for better risk assessment */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Credit Score *
                        </label>
                        <select 
                          name="creditScore"
                          value={loanDetails.creditScore}
                          onChange={handleInputChange}
                          className={`w-full py-2 border ${errors.creditScore ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                        >
                          <option value="">Select score range</option>
                          <option value="300-550">300-550 (Poor)</option>
                          <option value="551-650">551-650 (Fair)</option>
                          <option value="651-750">651-750 (Good)</option>
                          <option value="751-900">751-900 (Excellent)</option>
                        </select>
                        {errors.creditScore && <p className="mt-1 text-sm text-red-600">{errors.creditScore}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Monthly Income (₹)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">₹</span>
                          </div>
                          <input 
                            type="number" 
                            name="monthlyIncome"
                            value={loanDetails.monthlyIncome}
                            onChange={handleInputChange}
                            placeholder="Your monthly income"
                            className="pl-8 w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Collateral (if any)
                        </label>
                        <select 
                          name="collateral"
                          value={loanDetails.collateral}
                          onChange={handleInputChange}
                          className="w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">None / Select type</option>
                          <option value="Property">Property</option>
                          <option value="Vehicle">Vehicle</option>
                          <option value="Gold">Gold</option>
                          <option value="Fixed Deposit">Fixed Deposit</option>
                          <option value="Stocks">Stocks/Mutual Funds</option>
                          <option value="Business Equipment">Business Equipment</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Story (For Lenders)
                      </label>
                      <textarea 
                        name="story"
                        value={loanDetails.story}
                        onChange={handleInputChange}
                        placeholder="Tell potential lenders about yourself, your business, and how this loan will help you achieve your goals..."
                        rows={5}
                        className="w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      <p className="mt-1 text-xs text-gray-500">A compelling story increases your chances of getting funded at better rates.</p>
                    </div>
                    
                    <div className="flex justify-end pt-4">
                      <button 
                        type="submit" 
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        Continue to Review
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <h2 className="text-xl font-semibold mb-5 text-gray-800">Review Your Application</h2>
                    
                    <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-blue-800">Loan Summary</h3>
                        <button 
                          onClick={() => setStep(1)} 
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Edit Details
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Loan Amount</p>
                          <p className="text-lg font-bold">₹{parseFloat(loanDetails.amount).toLocaleString('en-IN')}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-gray-500">Duration</p>
                          <p className="text-lg font-bold">{loanDetails.duration} months</p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-gray-500">Interest Rate</p>
                          <p className="text-lg font-bold">{loanDetails.interestRate}% p.a.</p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-gray-500">Purpose</p>
                          <p className="text-lg font-bold">{loanDetails.purpose}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-gray-500">Repayment</p>
                          <p className="text-lg font-bold">{loanDetails.repaymentSchedule}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-gray-500">Credit Score</p>
                          <p className="text-lg font-bold">{loanDetails.creditScore}</p>
                        </div>
                      </div>
                      
                      {monthlyPayment && (
                        <div className="mt-4 pt-4 border-t border-blue-200">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-xs text-gray-500">Est. {loanDetails.repaymentSchedule.toLowerCase()} payment</p>
                              <p className="text-xl font-bold text-blue-700">₹{parseFloat(monthlyPayment).toLocaleString('en-IN')}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Total repayment</p>
                              <p className="text-xl font-bold text-blue-700">
                                ₹{parseFloat(monthlyPayment * loanDetails.duration).toLocaleString('en-IN')}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {loanDetails.collateral && (
                      <div className="mb-6">
                        <h3 className="font-semibold text-gray-700 mb-2">Collateral Information</h3>
                        <p className="p-3 bg-gray-50 rounded border border-gray-200">{loanDetails.collateral}</p>
                      </div>
                    )}
                    
                    {loanDetails.story && (
                      <div className="mb-6">
                        <h3 className="font-semibold text-gray-700 mb-2">Your Story</h3>
                        <div className="p-4 bg-gray-50 rounded border border-gray-200">
                          <p>{loanDetails.story}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="bg-yellow-50 p-4 rounded-lg mb-6 border border-yellow-100">
                      <h3 className="font-semibold text-yellow-800 mb-2">What Happens Next?</h3>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>Your application will be displayed to our network of verified lenders</li>
                        <li>You'll receive funding offers within 24-48 hours</li>
                        <li>You can compare offers and choose the best one</li>
                        <li>Once accepted, funds will be transferred to your bank account</li>
                      </ul>
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <input 
                        type="checkbox" 
                        id="terms" 
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                        I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                      </label>
                    </div>
                    
                    <div className="flex justify-between pt-4">
                      <button 
                        onClick={() => setStep(1)} 
                        className="px-5 py-2 border border-gray-300 text-gray-700 font-medium rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                      >
                        Back to Edit
                      </button>
                      
                      <button 
                        onClick={handleSubmit} 
                        className="px-6 py-3 bg-green-600 text-white font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                      >
                        Submit Loan Application
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerToPeerLending;