import React, { useState, useEffect } from 'react';

const Crowdfunding = () => {
  const [step, setStep] = useState(1);
  const [campaignDetails, setCampaignDetails] = useState({
    title: '',
    category: '',
    targetAmount: '',
    duration: '',
    description: '',
    rewards: [],
    campaignType: 'all_or_nothing',
    imagePlaceholder: '/api/placeholder/600/400',
  });
  const [progress, setProgress] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Update progress bar as user completes steps
  useEffect(() => {
    const detailsProgress = calculateDetailsProgress();
    const rewardsProgress = calculateRewardsProgress();
    
    if (step === 1) {
      setProgress(detailsProgress * 0.6);
    } else if (step === 2) {
      setProgress(60 + rewardsProgress * 0.3);
    } else if (step === 3) {
      setProgress(90 + 10 * (isSubmitting ? 1 : 0));
    }
  }, [campaignDetails, step, isSubmitting]);

  const calculateDetailsProgress = () => {
    let filled = 0;
    const total = 5; // title, category, targetAmount, duration, description
    
    if (campaignDetails.title) filled++;
    if (campaignDetails.category) filled++;
    if (campaignDetails.targetAmount >= 10000) filled++;
    if (campaignDetails.duration) filled++;
    if (campaignDetails.description.length > 50) filled++;
    
    return (filled / total) * 100;
  };

  const calculateRewardsProgress = () => {
    if (campaignDetails.rewards.length === 0) return 0;
    
    let validRewards = 0;
    campaignDetails.rewards.forEach(reward => {
      if (reward.amount && reward.description && reward.deliveryTime) {
        validRewards++;
      }
    });
    
    return (validRewards / campaignDetails.rewards.length) * 100;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCampaignDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors(prev => ({...prev, [name]: ''}));
    }
  };

  const handleNumberInputChange = (name, value) => {
    setCampaignDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors(prev => ({...prev, [name]: ''}));
    }
  };

  const validateStep1 = () => {
    const errors = {};
    
    if (!campaignDetails.title) {
      errors.title = 'Title is required';
    }
    
    if (!campaignDetails.category) {
      errors.category = 'Category is required';
    }
    
    if (!campaignDetails.targetAmount) {
      errors.targetAmount = 'Target amount is required';
    } else if (campaignDetails.targetAmount < 10000) {
      errors.targetAmount = 'Target amount must be at least ₹10,000';
    }
    
    if (!campaignDetails.duration) {
      errors.duration = 'Duration is required';
    }
    
    if (!campaignDetails.description) {
      errors.description = 'Description is required';
    } else if (campaignDetails.description.length < 50) {
      errors.description = 'Description must be at least 50 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    if (campaignDetails.rewards.length === 0) {
      setFormErrors({rewards: 'At least one reward tier is required'});
      return false;
    }
    
    const rewardErrors = [];
    campaignDetails.rewards.forEach((reward, index) => {
      const errors = {};
      if (!reward.amount) errors.amount = 'Amount is required';
      if (!reward.description) errors.description = 'Description is required';
      if (!reward.deliveryTime) errors.deliveryTime = 'Delivery time is required';
      
      if (Object.keys(errors).length > 0) {
        rewardErrors[index] = errors;
      }
    });
    
    if (rewardErrors.length > 0) {
      setFormErrors({rewardTiers: rewardErrors});
      return false;
    }
    
    return true;
  };

  const handleContinue = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    } else if (step === 2) {
      if (validateStep2()) {
        setStep(3);
      }
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 2000);
  };

  const addReward = () => {
    setCampaignDetails((prev) => ({
      ...prev,
      rewards: [...prev.rewards, { amount: '', description: '', deliveryTime: '' }],
    }));
  };

  const updateReward = (index, field, value) => {
    const updatedRewards = [...campaignDetails.rewards];
    updatedRewards[index][field] = value;
    setCampaignDetails((prev) => ({
      ...prev,
      rewards: updatedRewards,
    }));
    
    // Clear errors for this reward if they exist
    if (formErrors.rewardTiers && formErrors.rewardTiers[index] && formErrors.rewardTiers[index][field]) {
      const updatedRewardErrors = [...formErrors.rewardTiers];
      delete updatedRewardErrors[index][field];
      setFormErrors(prev => ({
        ...prev,
        rewardTiers: updatedRewardErrors
      }));
    }
  };

  const removeReward = (index) => {
    const updatedRewards = [...campaignDetails.rewards];
    updatedRewards.splice(index, 1);
    setCampaignDetails((prev) => ({
      ...prev,
      rewards: updatedRewards,
    }));
  };

  const isCampaignDetailsValid =
    campaignDetails.title &&
    campaignDetails.category &&
    campaignDetails.targetAmount >= 10000 &&
    campaignDetails.duration &&
    campaignDetails.description &&
    campaignDetails.description.length >= 50;

  const isRewardsValid = campaignDetails.rewards.length > 0 && 
    campaignDetails.rewards.every(reward => 
      reward.amount && reward.description && reward.deliveryTime);

  const handleCampaignTypeChange = (type) => {
    setCampaignDetails(prev => ({
      ...prev,
      campaignType: type
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-teal-700">StartFunder</h1>
        <p className="mt-2 text-gray-600 text-lg">
          Launch your ideas and turn your dreams into reality
        </p>
      </div>

      {/* Progress bar */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-teal-500 h-3 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Campaign Details</span>
          <span>Rewards</span>
          <span>Launch</span>
        </div>
      </div>

      {submitSuccess ? (
        <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
          <div className="text-5xl mb-4 text-green-500">🎉</div>
          <h2 className="text-2xl font-bold mb-4">Campaign Successfully Created!</h2>
          <p className="mb-6 text-gray-700">
            Your campaign "{campaignDetails.title}" has been submitted for review. We'll notify you once it's approved and goes live.
          </p>
          <button 
            className="px-6 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
            onClick={() => {
              setSubmitSuccess(false);
              setCampaignDetails({
                title: '',
                category: '',
                targetAmount: '',
                duration: '',
                description: '',
                rewards: [],
                campaignType: 'all_or_nothing',
                imagePlaceholder: '/api/placeholder/600/400',
              });
              setStep(1);
            }}
          >
            Create Another Campaign
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div className="p-6 border rounded-lg bg-white shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-teal-700">How It Works</h2>
                <div className="space-y-4">
                  {[
                    'Create your campaign with a compelling story',
                    'Set your funding target and campaign duration',
                    'Offer rewards to incentivize contributions',
                    'Share your campaign and engage with backers',
                    'Receive funds when your target is reached',
                  ].map((text, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-teal-500 text-white p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0 mr-3">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 border rounded-lg bg-white shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-teal-700">Campaign Types</h2>
                <div className="space-y-4">
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      campaignDetails.campaignType === 'all_or_nothing' 
                        ? 'border-teal-500 bg-teal-50' 
                        : 'hover:border-gray-400'
                    }`}
                    onClick={() => handleCampaignTypeChange('all_or_nothing')}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-2 border ${
                        campaignDetails.campaignType === 'all_or_nothing' 
                          ? 'bg-teal-500 border-teal-500' 
                          : 'border-gray-400'
                      }`}>
                        {campaignDetails.campaignType === 'all_or_nothing' && (
                          <div className="w-2 h-2 bg-white rounded-full m-1"></div>
                        )}
                      </div>
                      <p className="font-bold">All-or-Nothing</p>
                    </div>
                    <p className="text-sm mt-2 pl-6 text-gray-700">Receive funds only if you reach your target amount</p>
                  </div>
                  
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      campaignDetails.campaignType === 'keep_what_you_raise' 
                        ? 'border-teal-500 bg-teal-50' 
                        : 'hover:border-gray-400'
                    }`}
                    onClick={() => handleCampaignTypeChange('keep_what_you_raise')}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-2 border ${
                        campaignDetails.campaignType === 'keep_what_you_raise' 
                          ? 'bg-teal-500 border-teal-500' 
                          : 'border-gray-400'
                      }`}>
                        {campaignDetails.campaignType === 'keep_what_you_raise' && (
                          <div className="w-2 h-2 bg-white rounded-full m-1"></div>
                        )}
                      </div>
                      <p className="font-bold">Keep-What-You-Raise</p>
                    </div>
                    <p className="text-sm mt-2 pl-6 text-gray-700">Receive all pledged funds regardless of target</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border rounded-lg bg-white shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-teal-700">Success Tips</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Create a compelling story with clear objectives</li>
                  <li>Add images and videos to showcase your project</li>
                  <li>Set realistic funding goals and timeline</li>
                  <li>Offer attractive rewards at different price points</li>
                  <li>Promote your campaign on social media</li>
                  <li>Engage with your backers and provide updates</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Form Section */}
          <div className="lg:col-span-2">
            <div className="p-6 border rounded-lg bg-white shadow-sm">
              <div className="border-b mb-6">
                <div className="flex flex-wrap">
                  <button
                    className={`px-4 py-2 font-medium transition ${
                      step === 1 ? 'border-b-2 border-teal-500 text-teal-700' : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setStep(1)}
                  >
                    Campaign Details
                  </button>
                  <button
                    className={`px-4 py-2 font-medium transition ${
                      step === 2 ? 'border-b-2 border-teal-500 text-teal-700' : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => isCampaignDetailsValid && setStep(2)}
                    disabled={!isCampaignDetailsValid}
                  >
                    Rewards
                  </button>
                  <button
                    className={`px-4 py-2 font-medium transition ${
                      step === 3 ? 'border-b-2 border-teal-500 text-teal-700' : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => isCampaignDetailsValid && isRewardsValid && setStep(3)}
                    disabled={!isCampaignDetailsValid || !isRewardsValid}
                  >
                    Review & Launch
                  </button>
                </div>
              </div>

              {/* Campaign Details */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block mb-1 font-medium">Campaign Title <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="title"
                      value={campaignDetails.title}
                      onChange={handleInputChange}
                      placeholder="Enter a catchy title for your campaign"
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-teal-500 outline-none transition ${
                        formErrors.title ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.title && <p className="mt-1 text-red-500 text-sm">{formErrors.title}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-1 font-medium">Category <span className="text-red-500">*</span></label>
                      <select
                        name="category"
                        value={campaignDetails.category}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-teal-500 outline-none appearance-none bg-white transition ${
                          formErrors.category ? 'border-red-500' : 'border-gray-300'
                        }`}
                        style={{ backgroundImage: "url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"%3e%3cpolyline points=\"6 9 12 15 18 9\"%3e%3c/polyline%3e%3c/svg%3e')", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                      >
                        <option value="">Select category</option>
                        {[
                          'Business & Entrepreneurship',
                          'Agriculture & Farming',
                          'Arts & Crafts',
                          'Technology & Innovation',
                          'Education & Training',
                          'Social Enterprise',
                          'Other',
                        ].map((category, index) => (
                          <option key={index} value={category.toLowerCase().replace(/ /g, '_')}>
                            {category}
                          </option>
                        ))}
                      </select>
                      {formErrors.category && <p className="mt-1 text-red-500 text-sm">{formErrors.category}</p>}
                    </div>

                    <div>
                      <label className="block mb-1 font-medium">Funding Target (₹) <span className="text-red-500">*</span></label>
                      <div className={`w-full p-3 border rounded-lg focus-within:ring-2 focus-within:ring-teal-300 focus-within:border-teal-500 flex items-center transition ${
                        formErrors.targetAmount ? 'border-red-500' : 'border-gray-300'
                      }`}>
                        <span className="text-gray-500 mr-1">₹</span>
                        <input
                          type="number"
                          min="10000"
                          value={campaignDetails.targetAmount}
                          onChange={(e) => handleNumberInputChange('targetAmount', e.target.value)}
                          placeholder="Min. ₹10,000"
                          className="w-full outline-none"
                        />
                      </div>
                      {formErrors.targetAmount && <p className="mt-1 text-red-500 text-sm">{formErrors.targetAmount}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">Campaign Duration <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-5 gap-3">
                      {[15, 30, 45, 60, 90].map((duration) => (
                        <div
                          key={duration}
                          className={`border rounded-lg p-3 text-center cursor-pointer transition ${
                            parseInt(campaignDetails.duration) === duration 
                              ? 'border-teal-500 bg-teal-50 text-teal-700' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          onClick={() => handleInputChange({ target: { name: 'duration', value: duration.toString() } })}
                        >
                          <div className="font-bold">{duration}</div>
                          <div className="text-sm">days</div>
                        </div>
                      ))}
                    </div>
                    {formErrors.duration && <p className="mt-1 text-red-500 text-sm">{formErrors.duration}</p>}
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">Campaign Image</label>
                    <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition">
                      <div className="mb-2">
                        <img 
                          src={campaignDetails.imagePlaceholder} 
                          alt="Campaign preview" 
                          className="max-h-48 mx-auto object-contain rounded"
                        />
                      </div>
                      <p className="text-gray-500">Click to upload an image (Recommended: 1200 x 675 pixels)</p>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">Campaign Description <span className="text-red-500">*</span></label>
                    <textarea
                      name="description"
                      value={campaignDetails.description}
                      onChange={handleInputChange}
                      placeholder="Describe your project, what you're raising funds for, and how you'll use them... (min. 50 characters)"
                      rows={6}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-teal-500 outline-none transition ${
                        formErrors.description ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.description && <p className="mt-1 text-red-500 text-sm">{formErrors.description}</p>}
                    <div className="flex justify-between text-sm mt-1">
                      <span className={campaignDetails.description.length < 50 ? "text-red-500" : "text-green-500"}>
                        {campaignDetails.description.length} / 50 min characters
                      </span>
                      <span className="text-gray-500">
                        {5000 - campaignDetails.description.length} characters remaining
                      </span>
                    </div>
                  </div>

                  <button
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      isCampaignDetailsValid 
                        ? 'bg-teal-500 hover:bg-teal-600 text-white' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!isCampaignDetailsValid}
                    onClick={handleContinue}
                  >
                    Continue to Rewards
                  </button>
                </div>
              )}

              {/* Rewards */}
              {step === 2 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-teal-700">Reward Tiers</h2>
                    <button
                      className="px-4 py-2 border border-teal-500 text-teal-500 rounded-lg hover:bg-teal-50 transition-colors flex items-center"
                      onClick={addReward}
                    >
                      <span className="mr-1">+</span> Add Reward
                    </button>
                  </div>
                  
                  <p className="mb-6 text-gray-700">
                    Create rewards to encourage backers to contribute to your campaign. Rewards can be products,
                    services, or experiences.
                  </p>

                  {formErrors.rewards && <p className="mb-4 text-red-500">{formErrors.rewards}</p>}

                  {campaignDetails.rewards.length === 0 ? (
                    <div className="p-8 border border-dashed rounded-lg text-center bg-gray-50">
                      <p className="text-gray-500 mb-4">No reward tiers added yet</p>
                      <button
                        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                        onClick={addReward}
                      >
                        Add Your First Reward
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {campaignDetails.rewards.map((reward, index) => (
                        <div key={index} className="p-5 border rounded-lg shadow-sm bg-white">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg">Reward Tier {index + 1}</h3>
                            <button
                              className="p-1 text-red-500 hover:text-red-700 transition-colors"
                              onClick={() => removeReward(index)}
                            >
                              Remove
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block mb-1 font-medium">Pledge Amount (₹) <span className="text-red-500">*</span></label>
                              <div className={`w-full p-3 border rounded-lg focus-within:ring-2 focus-within:ring-teal-300 focus-within:border-teal-500 flex items-center transition ${
                                formErrors.rewardTiers && formErrors.rewardTiers[index]?.amount ? 'border-red-500' : 'border-gray-300'
                              }`}>
                                <span className="text-gray-500 mr-1">₹</span>
                                <input
                                  type="number"
                                  min="100"
                                  value={reward.amount}
                                  onChange={(e) => updateReward(index, 'amount', e.target.value)}
                                  placeholder="Min. ₹100"
                                  className="w-full outline-none"
                                />
                              </div>
                              {formErrors.rewardTiers && formErrors.rewardTiers[index]?.amount && (
                                <p className="mt-1 text-red-500 text-sm">{formErrors.rewardTiers[index].amount}</p>
                              )}
                            </div>

                            <div>
                              <label className="block mb-1 font-medium">Estimated Delivery <span className="text-red-500">*</span></label>
                              <select
                                value={reward.deliveryTime}
                                onChange={(e) => updateReward(index, 'deliveryTime', e.target.value)}
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-teal-500 outline-none appearance-none bg-white transition ${
                                  formErrors.rewardTiers && formErrors.rewardTiers[index]?.deliveryTime ? 'border-red-500' : 'border-gray-300'
                                }`}
                                style={{ backgroundImage: "url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"%3e%3cpolyline points=\"6 9 12 15 18 9\"%3e%3c/polyline%3e%3c/svg%3e')", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                              >
                                <option value="">Select when</option>
                                {['Immediate', 'Within 1 month', 'Within 3 months', 'Within 6 months', 'Custom timeframe'].map(
                                  (time, idx) => (
                                    <option key={idx} value={time.toLowerCase().replace(/ /g, '_')}>
                                      {time}
                                    </option>
                                  )
                                )}
                              </select>
                              {formErrors.rewardTiers && formErrors.rewardTiers[index]?.deliveryTime && (
                                <p className="mt-1 text-red-500 text-sm">{formErrors.rewardTiers[index].deliveryTime}</p>
                              )}
                            </div>
                          </div>

                          <div>
                            <label className="block mb-1 font-medium">Reward Description <span className="text-red-500">*</span></label>
                            <textarea
                              value={reward.description}
                              onChange={(e) => updateReward(index, 'description', e.target.value)}
                              placeholder="Describe what backers will receive for this pledge amount..."
                              rows={3}
                              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-teal-500 outline-none transition ${
                                formErrors.rewardTiers && formErrors.rewardTiers[index]?.description ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {formErrors.rewardTiers && formErrors.rewardTiers[index]?.description && (
                              <p className="mt-1 text-red-500 text-sm">{formErrors.rewardTiers[index].description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-8 flex justify-between">
                  <button
                      className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                      onClick={addReward}
                    >
                      Add Another Reward
                    </button>
                    <button
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        isRewardsValid
                          ? 'bg-teal-500 hover:bg-teal-600 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!isRewardsValid}
                      onClick={handleContinue}
                    >
                      Continue to Review
                    </button>
                  </div>
                </div>
              )}

              {/* Review & Launch */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-bold text-teal-700 mb-4">Review & Launch</h2>
                  <p className="mb-6 text-gray-700">
                    Review your campaign details and rewards before launching.
                  </p>

                  <div className="p-6 border rounded-lg bg-gray-50 mb-6">
                    <h3 className="text-lg font-bold text-teal-700 mb-2">Campaign Details</h3>
                    <p><strong>Title:</strong> {campaignDetails.title}</p>
                    <p><strong>Category:</strong> {campaignDetails.category}</p>
                    <p><strong>Target Amount:</strong> ₹{campaignDetails.targetAmount}</p>
                    <p><strong>Duration:</strong> {campaignDetails.duration} days</p>
                    <p><strong>Description:</strong> {campaignDetails.description}</p>
                  </div>

                  {campaignDetails.rewards.length > 0 && (
                    <div className="p-6 border rounded-lg bg-gray-50 mb-6">
                      <h3 className="text-lg font-bold text-teal-700 mb-2">Reward Tiers</h3>
                      {campaignDetails.rewards.map((reward, index) => (
                        <div key={index} className="mb-4">
                          <p><strong>Tier {index + 1}:</strong></p>
                          <p><strong>Pledge Amount:</strong> ₹{reward.amount}</p>
                          <p><strong>Delivery Time:</strong> {reward.deliveryTime}</p>
                          <p><strong>Description:</strong> {reward.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      !isSubmitting
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? 'Submitting...' : 'Launch Campaign'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Crowdfunding;