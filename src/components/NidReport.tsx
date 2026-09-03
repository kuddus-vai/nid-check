import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { NidData } from '../types';
import { NidHeader } from './NidHeader';
import { NidSearchBox } from './NidSearchBox';
import { Camera, RefreshCw } from 'lucide-react';

interface NidReportProps {
  data: NidData;
  onSearch?: (nidOrForm: string, type: 'nid' | 'form') => void;
  onPhotoChange?: (newUrl: string) => void;
  showWatermark?: boolean;
}

export const NidReport: React.FC<NidReportProps> = ({
  data,
  onSearch,
  onPhotoChange,
  showWatermark = false,
}) => {
  const [imgError, setImgError] = useState(false);
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);

  // Default fallback avatars if external photo url is broken or invalid
  const femaleFallback = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=500&q=80';
  const maleFallback = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=500&q=80';
  const isFemale = data.gender?.toLowerCase().includes('মহিলা') || data.gender?.toLowerCase().includes('female');
  
  const currentPhoto = (!imgError && data.photo && !data.photo.includes('..'))
    ? data.photo
    : (isFemale ? femaleFallback : maleFallback);

  // XML formatted voter payload for QR Code according to Bangladesh EC standards
  const qrPayload = `<voter><nid>${data.nationalId}</nid><pin>${data.pin || data.nationalId}</pin><name>${data.nameEn}</name><dob>${data.dateOfBirth}</dob><area>${data.voterArea}</area></voter>`;

  const formatAddress = (addr: typeof data.presentAddress) => {
    if (addr.addressLine && addr.addressLine.trim().length > 10) {
      return addr.addressLine;
    }
    const parts = [
      `বাসা/হোল্ডিং: ${addr.homeOrHoldingNo || '-'}`,
      `গ্রাম/রাস্তা: ${addr.villageOrRoad || '-'}`,
      addr.postOffice ? `ডাকঘর: ${addr.postOffice}` : 'ডাকঘর: -',
      `উপজেলা: ${addr.upozila || '-'}`,
      `জেলা: ${addr.district || '-'}`,
      `বিভাগ: ${addr.division || '-'}`,
      'দেশ: বাংলাদেশ।'
    ];
    return parts.join(', ');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onPhotoChange) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onPhotoChange(reader.result);
          setImgError(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      id="nid-server-copy-document"
      className="w-full max-w-[820px] mx-auto bg-white border border-slate-300 shadow-md relative print:shadow-none print:border-none print:max-w-none text-slate-900"
      style={{
        printColorAdjust: 'exact',
        WebkitPrintColorAdjust: 'exact',
      }}
    >
      {/* Optional Watermark */}
      {showWatermark && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.035] overflow-hidden select-none z-0">
          <div className="transform -rotate-45 text-center">
            <p className="text-8xl font-black tracking-widest text-slate-900">NIDW</p>
            <p className="text-4xl font-bold text-slate-900 mt-2">BANGLADESH ELECTION COMMISSION</p>
          </div>
        </div>
      )}

      {/* 1. Header Banner */}
      <NidHeader onHomeClick={() => onSearch && onSearch(data.nationalId, 'nid')} />

      {/* 2. Search / Category Filter Bar */}
      <NidSearchBox
        currentNid={data.nationalId}
        onSearch={(val, type) => onSearch && onSearch(val, type)}
      />

      {/* 3. Main Data Sheet */}
      <div className="p-4 sm:p-6 lg:p-7 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* Left Column: Photo, Name in English, and QR Code */}
          <div className="md:col-span-4 flex flex-col items-center pt-1">
            {/* Passport Photo Frame */}
            <div
              className="relative group border border-slate-300 shadow-xs bg-slate-50 p-1 w-36 sm:w-40 h-44 sm:h-48 flex items-center justify-center overflow-hidden rounded-xs"
              onMouseEnter={() => setIsPhotoHovered(true)}
              onMouseLeave={() => setIsPhotoHovered(false)}
            >
              <img
                src={currentPhoto}
                alt={data.nameEn || data.name}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
              />

              {/* Photo Change Overlay (hidden during print) */}
              <label
                htmlFor="photo-upload-input"
                className={`no-print absolute inset-0 bg-black/60 text-white flex flex-col items-center justify-center gap-1 cursor-pointer transition-opacity text-xs font-medium ${
                  isPhotoHovered ? 'opacity-100' : 'opacity-0'
                }`}
                title="Click to upload custom photo"
              >
                <Camera className="w-5 h-5" />
                <span>Change Photo</span>
                <input
                  id="photo-upload-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </label>
            </div>

            {/* English Name (Bold, Uppercase, centered) */}
            <div className="mt-2.5 text-center w-full px-1">
              <h3 className="font-bold text-slate-900 text-sm sm:text-[15px] uppercase tracking-wide leading-snug font-sans">
                {data.nameEn || 'RUMANA AKTAR'}
              </h3>
            </div>

            {/* QR Code */}
            <div className="mt-3.5 p-1.5 bg-white border border-slate-200 rounded-xs shadow-2xs">
              <QRCodeSVG
                value={qrPayload}
                size={116}
                level="M"
                includeMargin={false}
              />
            </div>
          </div>

          {/* Right Column: 5 Tables / Formatted Information Sections */}
          <div className="md:col-span-8 space-y-3 sm:space-y-3.5">

            {/* Section 1: জাতীয় পরিচিতি তথ্য */}
            <div className="border border-[#bce8f1] rounded-xs overflow-hidden">
              <div className="bg-[#d9edf7] px-3 py-1 border-b border-[#bce8f1]">
                <h4 className="font-bold text-slate-800 text-[13px] sm:text-[14px]">
                  জাতীয় পরিচিতি তথ্য
                </h4>
              </div>
              <div className="divide-y divide-slate-200 text-xs sm:text-[13px] bg-white">
                <div className="grid grid-cols-12">
                  <div className="col-span-5 px-3 py-1 font-medium text-slate-700 bg-slate-50/50 border-r border-slate-200">
                    জাতীয় পরিচয় পত্র নম্বর
                  </div>
                  <div className="col-span-7 px-3 py-1 font-semibold text-slate-900 font-mono tracking-tight">
                    {data.nationalId}
                  </div>
                </div>

                <div className="grid grid-cols-12">
                  <div className="col-span-5 px-3 py-1 font-medium text-slate-700 bg-slate-50/50 border-r border-slate-200">
                    পিন নম্বর
                  </div>
                  <div className="col-span-7 px-3 py-1 text-slate-900 font-mono">
                    {data.pin || data.nationalId}
                  </div>
                </div>

                <div className="grid grid-cols-12">
                  <div className="col-span-5 px-3 py-1 font-medium text-slate-700 bg-slate-50/50 border-r border-slate-200">
                    ফরম নাম্বার
                  </div>
                  <div className="col-span-7 px-3 py-1 text-slate-900 font-mono">
                    {data.formNo || '-'}
                  </div>
                </div>

                <div className="grid grid-cols-12">
                  <div className="col-span-5 px-3 py-1 font-medium text-slate-700 bg-slate-50/50 border-r border-slate-200">
                    ভোটার এলাকা
                  </div>
                  <div className="col-span-7 px-3 py-1 text-slate-900">
                    {data.voterArea}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: ব্যক্তিগত তথ্য */}
            <div className="border border-[#bce8f1] rounded-xs overflow-hidden">
              <div className="bg-[#d9edf7] px-3 py-1 border-b border-[#bce8f1]">
                <h4 className="font-bold text-slate-800 text-[13px] sm:text-[14px]">
                  ব্যক্তিগত তথ্য
                </h4>
              </div>
              <div className="divide-y divide-slate-200 text-xs sm:text-[13px] bg-white">
                <div className="grid grid-cols-12">
                  <div className="col-span-5 px-3 py-1 font-medium text-slate-700 bg-slate-50/50 border-r border-slate-200">
                    নাম (বাংলা)
                  </div>
                  <div className="col-span-7 px-3 py-1 font-semibold text-slate-900">
                    {data.name}
                  </div>
                </div>

                <div className="grid grid-cols-12">
                  <div className="col-span-5 px-3 py-1 font-medium text-slate-700 bg-slate-50/50 border-r border-slate-200">
                    নাম (ইংরেজি)
                  </div>
                  <div className="col-span-7 px-3 py-1 text-slate-900 uppercase font-sans font-medium">
                    {data.nameEn}
                  </div>
                </div>

                <div className="grid grid-cols-12">
                  <div className="col-span-5 px-3 py-1 font-medium text-slate-700 bg-slate-50/50 border-r border-slate-200">
                    জন্ম তারিখ
                  </div>
                  <div className="col-span-7 px-3 py-1 text-slate-900 font-mono">
                    {data.dateOfBirth} {data.age && <span className="text-[11px] text-slate-500 font-sans ml-1.5">({data.age})</span>}
                  </div>
                </div>

                <div className="grid grid-cols-12">
                  <div className="col-span-5 px-3 py-1 font-medium text-slate-700 bg-slate-50/50 border-r border-slate-200">
                    পিতার নাম
                  </div>
                  <div className="col-span-7 px-3 py-1 text-slate-900">
                    {data.father}
                  </div>
                </div>

                <div className="grid grid-cols-12">
                  <div className="col-span-5 px-3 py-1 font-medium text-slate-700 bg-slate-50/50 border-r border-slate-200">
                    মাতার নাম
                  </div>
                  <div className="col-span-7 px-3 py-1 text-slate-900">
                    {data.mother}
                  </div>
                </div>

                <div className="grid grid-cols-12">
                  <div className="col-span-5 px-3 py-1 font-medium text-slate-700 bg-slate-50/50 border-r border-slate-200">
                    স্বামী/স্ত্রীর নাম
                  </div>
                  <div className="col-span-7 px-3 py-1 text-slate-900">
                    {data.spouse || '-'}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: অন্যান্য তথ্য */}
            <div className="border border-[#bce8f1] rounded-xs overflow-hidden">
              <div className="bg-[#d9edf7] px-3 py-1 border-b border-[#bce8f1]">
                <h4 className="font-bold text-slate-800 text-[13px] sm:text-[14px]">
                  অন্যান্য তথ্য
                </h4>
              </div>
              <div className="divide-y divide-slate-200 text-xs sm:text-[13px] bg-white">
                <div className="grid grid-cols-12">
                  <div className="col-span-5 px-3 py-1 font-medium text-slate-700 bg-slate-50/50 border-r border-slate-200">
                    ধর্ম
                  </div>
                  <div className="col-span-7 px-3 py-1 text-slate-900">
                    {data.religion}
                  </div>
                </div>

                <div className="grid grid-cols-12">
                  <div className="col-span-5 px-3 py-1 font-medium text-slate-700 bg-slate-50/50 border-r border-slate-200">
                    লিঙ্গ
                  </div>
                  <div className="col-span-7 px-3 py-1 text-slate-900">
                    {data.gender}
                  </div>
                </div>

                <div className="grid grid-cols-12">
                  <div className="col-span-5 px-3 py-1 font-medium text-slate-700 bg-slate-50/50 border-r border-slate-200">
                    পেশা
                  </div>
                  <div className="col-span-7 px-3 py-1 text-slate-900">
                    {data.occupation || '-'}
                  </div>
                </div>

                <div className="grid grid-cols-12">
                  <div className="col-span-5 px-3 py-1 font-medium text-slate-700 bg-slate-50/50 border-r border-slate-200">
                    জন্মস্থান
                  </div>
                  <div className="col-span-7 px-3 py-1 text-slate-900">
                    {data.birthPlace}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: বর্তমান ঠিকানা */}
            <div className="border border-[#bce8f1] rounded-xs overflow-hidden">
              <div className="bg-[#d9edf7] px-3 py-1 border-b border-[#bce8f1]">
                <h4 className="font-bold text-slate-800 text-[13px] sm:text-[14px]">
                  বর্তমান ঠিকানা
                </h4>
              </div>
              <div className="p-2.5 sm:px-3 sm:py-2 text-xs sm:text-[13px] text-slate-800 leading-relaxed bg-white">
                {formatAddress(data.presentAddress)}
              </div>
            </div>

            {/* Section 5: স্থায়ী ঠিকানা */}
            <div className="border border-[#bce8f1] rounded-xs overflow-hidden">
              <div className="bg-[#d9edf7] px-3 py-1 border-b border-[#bce8f1]">
                <h4 className="font-bold text-slate-800 text-[13px] sm:text-[14px]">
                  স্থায়ী ঠিকানা
                </h4>
              </div>
              <div className="p-2.5 sm:px-3 sm:py-2 text-xs sm:text-[13px] text-slate-800 leading-relaxed bg-white">
                {formatAddress(data.permanentAddress)}
              </div>
            </div>

          </div>
        </div>

        {/* Footer Disclaimers */}
        <div className="mt-8 pt-4 border-t border-slate-200/80 text-center space-y-1.5">
          <p className="text-red-600 text-xs sm:text-[13px] font-semibold tracking-normal">
            উপরে প্রদর্শিত তথ্যসমূহ জাতীয় পরিচয়পত্র সংশ্লিষ্ট, ভোটার তালিকার সাথে সরাসরি সম্পর্কযুক্ত নয়।
          </p>
          <p className="text-slate-600 text-[11px] sm:text-xs font-normal tracking-wide font-sans">
            This is Software Generated Report From Bangladesh Election Commission, Signature & Seal Aren't Required.
          </p>
        </div>
      </div>
    </div>
  );
};
