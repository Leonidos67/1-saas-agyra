// pages/Settings.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  User, Edit, Users, Link as LinkIcon, Shield, 
  ShoppingBag, Bell, CreditCard, 
  AlertCircle,
  Camera, MapPin
} from 'lucide-react';

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('edit-profile');
  const [formData, setFormData] = useState({
    name: user?.fullName || 'MakTraxer',
    username: user?.username || 'maktraxer',
    bio: '',
    day: '04',
    month: '09',
    year: '2008',
    location: '',
    website: '',
  });

  const menuItems = [
    { id: 'account', label: 'Account settings', icon: User },
    { id: 'edit-profile', label: 'Edit profile', icon: Edit },
    { id: 'invites', label: 'Invites', icon: Users },
    { id: 'connected', label: 'Connected accounts', icon: LinkIcon },
    { id: 'security', label: 'Account security', icon: Shield },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payments', label: 'Payment methods', icon: CreditCard },
    { id: 'resolution', label: 'Resolution center', icon: AlertCircle },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'edit-profile':
        return (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-8">Edit profile</h2>
            
            {/* Avatar Section */}
            <div className="flex items-center space-x-4 mb-8 p-4 bg-neutral-50 rounded-xl">
              <div className="relative">
                <img
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${formData.name}&background=6366f1&color=fff&size=96`}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                  <Camera size={16} />
                </button>
              </div>
              <div>
                <p className="font-semibold text-lg">{formData.name}</p>
                <p className="text-neutral-500">@{formData.username}</p>
              </div>
            </div>

            {/* Name */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                maxLength={100}
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                placeholder="Your name"
              />
              <p className="text-sm text-neutral-400 mt-1">{formData.name.length}/100</p>
            </div>

            {/* Username */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                maxLength={42}
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                placeholder="Username"
              />
              <p className="text-sm text-neutral-400 mt-1">{formData.username.length}/42</p>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                maxLength={200}
                rows={3}
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 transition-all resize-none"
                placeholder={formData.bio ? '' : 'No bio'}
              />
              <p className="text-sm text-neutral-400 mt-1">{formData.bio.length}/200</p>
            </div>

            {/* Date of Birth */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Date of birth
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={formData.day}
                  onChange={(e) => handleInputChange('day', e.target.value)}
                  maxLength={2}
                  className="w-20 px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 text-center transition-all"
                  placeholder="04"
                />
                <span className="text-2xl text-neutral-300">.</span>
                <input
                  type="text"
                  value={formData.month}
                  onChange={(e) => handleInputChange('month', e.target.value)}
                  maxLength={2}
                  className="w-20 px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 text-center transition-all"
                  placeholder="09"
                />
                <span className="text-2xl text-neutral-300">.</span>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  maxLength={4}
                  className="w-24 px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 text-center transition-all"
                  placeholder="2008"
                />
              </div>
            </div>

            {/* More details */}
            <div className="border-t border-neutral-200 pt-6 mt-8">
              <h3 className="text-lg font-semibold mb-4">More details</h3>
              <p className="text-sm text-neutral-500 mb-6">
                Choose what appears on your profile and other discovery surfaces.
              </p>

              {/* Location */}
              <div className="mb-4">
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                  <MapPin size={16} />
                  <span>Location</span>
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                  placeholder="Add your location"
                />
              </div>

              {/* Website */}
              <div className="mb-4">
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                  <LinkIcon size={16} />
                  <span>Website</span>
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                  placeholder="https://"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="border-t border-neutral-200 pt-6 mt-8">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-neutral-50 rounded-xl text-center">
                  <p className="text-2xl font-bold">$0</p>
                  <p className="text-sm text-neutral-500">Total earned</p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-xl text-center">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-neutral-500">Owned whops</p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-xl text-center">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-neutral-500">Joined whops</p>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-8">
              <button className="w-full py-3 bg-black text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors active:scale-[0.99]">
                Save changes
              </button>
            </div>
          </div>
        );

      case 'account':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Account settings</h2>
            <div className="space-y-4">
              <div className="p-4 bg-neutral-50 rounded-xl">
                <p className="font-medium">Email</p>
                <p className="text-neutral-500">{user?.email || 'Not set'}</p>
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl">
                <p className="font-medium">Member since</p>
                <p className="text-neutral-500">{new Date(user?.createdAt || '').toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Notifications</h2>
            <div className="space-y-4">
              {['Push notifications', 'Email notifications', 'SMS notifications'].map((item) => (
                <div key={item} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                  <span className="font-medium">{item}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-neutral-500 text-lg">Coming soon</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-full">
      {/* Left Sidebar - Same style as Messenger/Home */}
      <div className="w-64 border-r border-neutral-200 flex flex-col h-full flex-shrink-0">

        {/* Navigation */}
        <nav className="p-2">

          {/* Settings Section */}
          <div className="mt-2 px-2">
            <div className="flex-shrink-0">
                <h1 className="text-xl font-semibold text-neutral-800">Settings</h1>
                {/* <div className="mt-3 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                    type="text"
                    placeholder="Search messages..."
                    className="w-full pl-9 pr-4 py-2 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10"
                    />
                </div> */}
            </div>
            
            <div className="space-y-1 mt-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl transition-all active:scale-[0.95] text-left ${
                    activeSection === item.id
                      ? 'bg-black/10 font-medium'
                      : 'hover:bg-black/5'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 overflow-y-auto bg-white p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default Settings;