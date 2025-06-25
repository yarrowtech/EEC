import React, { useState, useRef } from 'react';
import { User, Mail, AtSign, Lock, Camera, Check, AlertCircle } from 'lucide-react';

const initialProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  username: 'johnny',
  password: '',
  profilePic: '',
};

const ProfileUpdate = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [preview, setPreview] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'name':
        if (value.length < 2) {
          newErrors[name] = 'Name must be at least 2 characters';
        } else {
          delete newErrors[name];
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[name] = 'Please enter a valid email address';
        } else {
          delete newErrors[name];
        }
        break;
      case 'username':
        if (value.length < 3) {
          newErrors[name] = 'Username must be at least 3 characters';
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          newErrors[name] = 'Username can only contain letters, numbers, and underscores';
        } else {
          delete newErrors[name];
        }
        break;
      case 'password':
        if (value && value.length < 6) {
          newErrors[name] = 'Password must be at least 6 characters';
        } else {
          delete newErrors[name];
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profilePic: 'Image size must be less than 5MB' }));
        return;
      }
      
      setProfile((prev) => ({ ...prev, profilePic: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      
      if (errors.profilePic) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.profilePic;
          return newErrors;
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    Object.keys(profile).forEach(key => {
      if (key !== 'profilePic') {
        validateField(key, profile[key]);
      }
    });
    
    if (Object.keys(errors).length > 0) {
      return;
    }
    
    setLoading(true);
    setSuccess(false);
    
    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  const inputClasses = (fieldName) =>
    `w-full pl-12 pr-4 py-3 border rounded-xl shadow-sm transition-all duration-200 outline-none ${
      errors[fieldName]
        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
        : 'border-gray-300 hover:border-yellow-400 focus:border-yellow-500 focus:ring-yellow-100'
    } focus:ring-4 bg-white`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl border border-yellow-100 max-w-lg w-full mx-auto overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-amber-400 px-8 py-6">
          <h2 className="text-3xl font-bold text-white text-center">Update Profile</h2>
          <p className="text-yellow-100 text-center mt-2">Keep your information up to date</p>
        </div>

        <div className="px-8 py-8">
          <div className="space-y-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-300 shadow-lg bg-gray-100">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-100 to-amber-100">
                      <User className="w-16 h-16 text-yellow-600" />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
                  title="Change profile picture"
                >
                  <Camera className="w-5 h-5" />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              {errors.profilePic && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.profilePic}
                </p>
              )}
              <p className="text-gray-500 text-sm">Click camera icon to update photo</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className={inputClasses('name')}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className={inputClasses('email')}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Username Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username *
                </label>
                <div className="relative">
                  <AtSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                    className={inputClasses('username')}
                    placeholder="Choose a unique username"
                    required
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    (leave blank to keep current)
                  </span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    name="password"
                    value={profile.password}
                    onChange={handleChange}
                    className={inputClasses('password')}
                    placeholder="Enter new password (optional)"
                    autoComplete="new-password"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading || Object.keys(errors).length > 0}
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 disabled:from-gray-300 disabled:to-gray-400 text-white py-4 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Updating Profile...
                </div>
              ) : (
                'Update Profile'
              )}
            </button>

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <div className="bg-green-500 rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-green-800 font-semibold">Profile Updated Successfully!</p>
                  <p className="text-green-700 text-sm">Your changes have been saved.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;