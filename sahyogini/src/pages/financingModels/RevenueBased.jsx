import React, { useState } from 'react';

const RevenueFundingApplication = () => {
  const [step, setStep] = useState(1);
  const [monthlyRevenue, setMonthlyRevenue] = useState(100000);
  const [growthRate, setGrowthRate] = useState(10);
  const [paybackRate, setPaybackRate] = useState(6);
  const [fundingMultiple, setFundingMultiple] = useState(4);
  
  // Application form state
  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    industry: '',
    yearFounded: '',
    fullName: '',
    email: '',
    phone: '',
    position: '',
    fundingPurpose: '',
    monthlyMRR: '',
    annualRevenue: '',
    businessModel: '',
    existingDebt: '',
    hasAcceptedTerms: false,
    isSubmitting: false,
    isSubmitted: false
  });

  // Calculate funding amount based on monthly revenue and multiple
  const fundingAmount = monthlyRevenue * fundingMultiple;

  // Calculate monthly payment based on revenue and payback rate
  const baseMonthlyPayment = monthlyRevenue * (paybackRate / 100);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      isSubmitting: true
    });

    // Simulate API call with timeout
    setTimeout(() => {
      setFormData({
        ...formData,
        isSubmitting: false,
        isSubmitted: true
      });
    }, 1500);
  };

  // Reset form after submission
  const resetForm = () => {
    setFormData({
      companyName: '',
      website: '',
      industry: '',
      yearFounded: '',
      fullName: '',
      email: '',
      phone: '',
      position: '',
      fundingPurpose: '',
      monthlyMRR: '',
      annualRevenue: '',
      businessModel: '',
      existingDebt: '',
      hasAcceptedTerms: false,
      isSubmitting: false,
      isSubmitted: false
    });
    setStep(1);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-indigo-700">Revenue-Based Funding Application</h1>
      
      {!formData.isSubmitted ? (
        <div>
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className={`flex items-center ${step >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-400'} mr-2`}>1</div>
                <span className="hidden sm:inline">Calculator</span>
              </div>
              <div className={`flex-grow border-t ${step >= 2 ? 'border-indigo-300' : 'border-gray-200'} mx-4`}></div>
              <div className={`flex items-center ${step >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-400'} mr-2`}>2</div>
                <span className="hidden sm:inline">Company Info</span>
              </div>
              <div className={`flex-grow border-t ${step >= 3 ? 'border-indigo-300' : 'border-gray-200'} mx-4`}></div>
              <div className={`flex items-center ${step >= 3 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-400'} mr-2`}>3</div>
                <span className="hidden sm:inline">Review & Submit</span>
              </div>
            </div>
          </div>

          {/* Step 1: Calculator */}
          {step === 1 && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Revenue
                    </label>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-2">$</span>
                      <input
                        type="range"
                        min="10000"
                        max="1000000"
                        step="10000"
                        value={monthlyRevenue}
                        onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                        className="w-full"
                      />
                      <span className="ml-3 text-gray-700 w-24 text-right">
                        {formatCurrency(monthlyRevenue)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Growth Rate (%)
                    </label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="0"
                        max="30"
                        step="0.5"
                        value={growthRate}
                        onChange={(e) => setGrowthRate(Number(e.target.value))}
                        className="w-full"
                      />
                      <span className="ml-3 text-gray-700 w-16 text-right">
                        {growthRate.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payback Rate (% of Revenue)
                    </label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="1"
                        max="20"
                        step="0.5"
                        value={paybackRate}
                        onChange={(e) => setPaybackRate(Number(e.target.value))}
                        className="w-full"
                      />
                      <span className="ml-3 text-gray-700 w-16 text-right">
                        {paybackRate.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Funding Multiple (x Monthly Revenue)
                    </label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="1"
                        max="12"
                        step="0.5"
                        value={fundingMultiple}
                        onChange={(e) => setFundingMultiple(Number(e.target.value))}
                        className="w-full"
                      />
                      <span className="ml-3 text-gray-700 w-16 text-right">
                        {fundingMultiple.toFixed(1)}x
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4 text-indigo-700">Funding Summary</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-gray-500 text-sm">Funding Amount</h3>
                      <p className="text-2xl font-bold text-indigo-800">{formatCurrency(fundingAmount)}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-gray-500 text-sm">Initial Monthly Payment</h3>
                      <p className="text-lg font-semibold">{formatCurrency(baseMonthlyPayment)}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-gray-500 text-sm">Percentage of Revenue</h3>
                      <p className="text-lg font-semibold">{paybackRate}%</p>
                    </div>
                    
                    <div className="pt-4">
                      <p className="text-sm text-gray-600">
                        These are approximate figures based on your inputs. Final terms may vary based on your application.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Continue to Application
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Company Information */}
          {step === 2 && (
            <form>
              <div className="grid grid-cols-1 gap-6 mb-8">
                <h2 className="text-xl font-semibold mb-2 text-indigo-700">Company Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name*
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Website*
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Industry*
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select Industry</option>
                      <option value="SaaS">SaaS</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Marketplace">Marketplace</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="FinTech">FinTech</option>
                      <option value="EdTech">EdTech</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year Founded*
                    </label>
                    <input
                      type="number"
                      name="yearFounded"
                      value={formData.yearFounded}
                      onChange={handleInputChange}
                      min="1900"
                      max="2025"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold mb-2 mt-4 text-indigo-700">Contact Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position/Title*
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold mb-2 mt-4 text-indigo-700">Business Details</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    What will you use the funding for?*
                  </label>
                  <textarea
                    name="fundingPurpose"
                    value={formData.fundingPurpose}
                    onChange={handleInputChange}
                    rows="3"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Recurring Revenue (MRR)*
                    </label>
                    <input
                      type="text"
                      name="monthlyMRR"
                      value={formData.monthlyMRR}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., $50,000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Annual Revenue*
                    </label>
                    <input
                      type="text"
                      name="annualRevenue"
                      value={formData.annualRevenue}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., $600,000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Model*
                    </label>
                    <select
                      name="businessModel"
                      value={formData.businessModel}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select Business Model</option>
                      <option value="B2B">B2B</option>
                      <option value="B2C">B2C</option>
                      <option value="B2B2C">B2B2C</option>
                      <option value="D2C">D2C</option>
                      <option value="Marketplace">Marketplace</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Existing Debt/Financing
                    </label>
                    <input
                      type="text"
                      name="existingDebt"
                      value={formData.existingDebt}
                      onChange={handleInputChange}
                      placeholder="e.g., $100,000 venture debt"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Review Application
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Review & Submit */}
          {step === 3 && (
            <div>
              <div className="bg-indigo-50 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold mb-4 text-indigo-700">Funding Request Summary</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-gray-500 text-sm">Funding Amount</h3>
                    <p className="text-xl font-bold text-indigo-800">{formatCurrency(fundingAmount)}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-500 text-sm">Monthly Revenue</h3>
                    <p className="text-lg font-semibold">{formatCurrency(monthlyRevenue)}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-500 text-sm">Payback Rate</h3>
                    <p className="text-lg font-semibold">{paybackRate}% of revenue</p>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-500 text-sm">Funding Multiple</h3>
                    <p className="text-lg font-semibold">{fundingMultiple}x monthly revenue</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-indigo-700">Review Your Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-gray-500 text-sm">Company Name</h3>
                    <p className="font-medium">{formData.companyName || "[Not provided]"}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-500 text-sm">Website</h3>
                    <p className="font-medium">{formData.website || "[Not provided]"}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-500 text-sm">Industry</h3>
                    <p className="font-medium">{formData.industry || "[Not provided]"}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-500 text-sm">Year Founded</h3>
                    <p className="font-medium">{formData.yearFounded || "[Not provided]"}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-500 text-sm">Contact Name</h3>
                    <p className="font-medium">{formData.fullName || "[Not provided]"}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-500 text-sm">Position</h3>
                    <p className="font-medium">{formData.position || "[Not provided]"}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-500 text-sm">Email</h3>
                    <p className="font-medium">{formData.email || "[Not provided]"}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-500 text-sm">Phone</h3>
                    <p className="font-medium">{formData.phone || "[Not provided]"}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-gray-500 text-sm">Funding Purpose</h3>
                  <p className="font-medium">{formData.fundingPurpose || "[Not provided]"}</p>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    name="hasAcceptedTerms"
                    checked={formData.hasAcceptedTerms}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I confirm that all information provided is accurate. I understand that submitting this application does not guarantee funding approval.
                  </label>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Back
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!formData.hasAcceptedTerms || formData.isSubmitting}
                  className={`px-6 py-2 bg-indigo-600 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    !formData.hasAcceptedTerms || formData.isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
                  }`}
                >
                  {formData.isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for your interest in revenue-based funding. Our team will review your application and contact you within 2 business days.
          </p>
          <div className="bg-indigo-50 p-6 rounded-lg inline-block">
            <h3 className="font-semibold mb-2 text-indigo-700">Application Details</h3>
            <p className="text-gray-800 mb-1">Funding Amount: {formatCurrency(fundingAmount)}</p>
            <p className="text-gray-800">Reference Number: RBF-{Math.floor(Math.random() * 1000000)}</p>
          </div>
          <div className="mt-8">
            <button
              onClick={resetForm}
              className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Start a New Application
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevenueFundingApplication;