import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { NidData } from '../types';

interface EditDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: NidData;
  onSave: (updated: NidData) => void;
}

export const EditDataModal: React.FC<EditDataModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
}) => {
  const [formData, setFormData] = useState<NidData>(data);

  if (!isOpen) return null;

  const handleChange = (field: keyof NidData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePresentAddressChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      presentAddress: { ...prev.presentAddress, addressLine: value },
    }));
  };

  const handlePermanentAddressChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      permanentAddress: { ...prev.permanentAddress, addressLine: value },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs no-print">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50">
          <h3 className="font-semibold text-slate-800 text-base">
            তথ্য সম্পাদনা (Edit NID Information)
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs sm:text-sm">
            
            <div className="bg-blue-50/70 border border-blue-200 rounded p-3 text-blue-900 font-semibold text-xs">
              জাতীয় পরিচিতি তথ্য
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">জাতীয় পরিচয় পত্র নম্বর (NID)</label>
                <input
                  type="text"
                  value={formData.nationalId}
                  onChange={(e) => handleChange('nationalId', e.target.value)}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">পিন নম্বর (PIN)</label>
                <input
                  type="text"
                  value={formData.pin}
                  onChange={(e) => handleChange('pin', e.target.value)}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">ফরম নম্বর (Form No)</label>
                <input
                  type="text"
                  value={formData.formNo || '-'}
                  onChange={(e) => handleChange('formNo', e.target.value)}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">ভোটার এলাকা (Voter Area)</label>
                <input
                  type="text"
                  value={formData.voterArea}
                  onChange={(e) => handleChange('voterArea', e.target.value)}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-blue-50/70 border border-blue-200 rounded p-3 text-blue-900 font-semibold text-xs">
              ব্যক্তিগত তথ্য
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">নাম (বাংলা)</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">নাম (ইংরেজি)</label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={(e) => handleChange('nameEn', e.target.value)}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:ring-1 focus:ring-blue-500 focus:outline-none uppercase"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">জন্ম তারিখ (Date of Birth)</label>
                <input
                  type="text"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">পিতার নাম</label>
                <input
                  type="text"
                  value={formData.father}
                  onChange={(e) => handleChange('father', e.target.value)}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">মাতার নাম</label>
                <input
                  type="text"
                  value={formData.mother}
                  onChange={(e) => handleChange('mother', e.target.value)}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">স্বামী/স্ত্রীর নাম</label>
                <input
                  type="text"
                  value={formData.spouse || '-'}
                  onChange={(e) => handleChange('spouse', e.target.value)}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-blue-50/70 border border-blue-200 rounded p-3 text-blue-900 font-semibold text-xs">
              অন্যান্য তথ্য
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">ধর্ম (Religion)</label>
                <input
                  type="text"
                  value={formData.religion}
                  onChange={(e) => handleChange('religion', e.target.value)}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">লিঙ্গ (Gender)</label>
                <input
                  type="text"
                  value={formData.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">পেশা (Occupation)</label>
                <input
                  type="text"
                  value={formData.occupation || '-'}
                  onChange={(e) => handleChange('occupation', e.target.value)}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">জন্মস্থান (Birth Place)</label>
                <input
                  type="text"
                  value={formData.birthPlace}
                  onChange={(e) => handleChange('birthPlace', e.target.value)}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-blue-50/70 border border-blue-200 rounded p-3 text-blue-900 font-semibold text-xs">
              ঠিকানা (Addresses)
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">বর্তমান ঠিকানা (Present Address)</label>
                <textarea
                  value={formData.presentAddress.addressLine}
                  onChange={(e) => handlePresentAddressChange(e.target.value)}
                  rows={2}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">স্থায়ী ঠিকানা (Permanent Address)</label>
                <textarea
                  value={formData.permanentAddress.addressLine}
                  onChange={(e) => handlePermanentAddressChange(e.target.value)}
                  rows={2}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2.5 px-5 py-3 border-t border-slate-200 bg-slate-50">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-[#28a745] hover:bg-[#218838] rounded transition-colors shadow-xs cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
