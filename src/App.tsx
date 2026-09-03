import React, { useState } from 'react';
import { NidData } from './types';
import { RUMANA_AKTAR, SANJIT_KUMAR_SARKER, RAW_USER_API_RESPONSE } from './data/sampleData';
import { NidReport } from './components/NidReport';
import { Toolbar } from './components/Toolbar';
import { JsonModal } from './components/JsonModal';
import { EditDataModal } from './components/EditDataModal';
import { Info, Sparkles, Check, Database } from 'lucide-react';

export default function App() {
  const [activeData, setActiveData] = useState<NidData>(RUMANA_AKTAR);
  const [rawPayload, setRawPayload] = useState<any>(RAW_USER_API_RESPONSE);
  const [activeSample, setActiveSample] = useState<'rumana' | 'sanjit' | 'custom'>('rumana');
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showWatermark, setShowWatermark] = useState(false);
  const [searchNotification, setSearchNotification] = useState<string | null>(null);

  const handleSelectSample = (sample: 'rumana' | 'sanjit') => {
    setActiveSample(sample);
    if (sample === 'rumana') {
      setActiveData(RUMANA_AKTAR);
      setRawPayload(RAW_USER_API_RESPONSE);
    } else {
      setActiveData(SANJIT_KUMAR_SARKER);
      setRawPayload({
        api: "সার্ভার কপি ব্যাকআপ ২৪ ঘন্টা",
        http_status: 200,
        success: true,
        response: {
          code: 200,
          data: SANJIT_KUMAR_SARKER
        }
      });
    }
  };

  const handleSearch = (query: string, type: 'nid' | 'form') => {
    const cleanQuery = query.replace(/\s+/g, '');
    if (!cleanQuery) return;

    if (cleanQuery === '7324699953' || cleanQuery === '19611315823431017' || cleanQuery === '1431017') {
      handleSelectSample('sanjit');
      showNotice(`তথ্য পাওয়া গেছে: সনজিৎ কুমার সরকার (${cleanQuery})`);
    } else if (cleanQuery === '19889116242000020') {
      handleSelectSample('rumana');
      showNotice(`তথ্য পাওয়া গেছে: রুমানা আকতার (${cleanQuery})`);
    } else {
      // Dynamic search: update current record's NID / Form
      setActiveData(prev => ({
        ...prev,
        nationalId: type === 'nid' ? cleanQuery : prev.nationalId,
        pin: type === 'nid' ? cleanQuery : prev.pin,
        formNo: type === 'form' ? cleanQuery : prev.formNo,
      }));
      setActiveSample('custom');
      showNotice(`অনুসন্ধান সম্পন্ন হয়েছে: ${cleanQuery}`);
    }
  };

  const showNotice = (msg: string) => {
    setSearchNotification(msg);
    setTimeout(() => setSearchNotification(null), 3500);
  };

  const handlePhotoChange = (newUrl: string) => {
    setActiveData(prev => ({ ...prev, photo: newUrl }));
    setActiveSample('custom');
    showNotice('ছবি সফলভাবে পরিবর্তন করা হয়েছে!');
  };

  const handleJsonImport = (importedData: NidData, newRawPayload?: any) => {
    setActiveData(importedData);
    if (newRawPayload) {
      setRawPayload(newRawPayload);
    }
    setActiveSample('custom');
    showNotice('নতুন API ডেটা সফলভাবে লোড হয়েছে!');
  };

  const handleEditSave = (updated: NidData) => {
    setActiveData(updated);
    setActiveSample('custom');
    showNotice('তথ্য সফলভাবে সংরক্ষণ করা হয়েছে!');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Top Interactive Toolbar */}
      <Toolbar
        activeSample={activeSample}
        onSelectSample={handleSelectSample}
        onOpenJson={() => setIsJsonModalOpen(true)}
        onOpenEdit={() => setIsEditModalOpen(true)}
        showWatermark={showWatermark}
        onToggleWatermark={() => setShowWatermark(!showWatermark)}
      />

      {/* Floating search / action notification toast */}
      {searchNotification && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-md shadow-lg text-xs sm:text-sm font-medium flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2 no-print">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{searchNotification}</span>
        </div>
      )}

      {/* API Metadata Bar (informative for developer/user) */}
      <div className="bg-slate-200/70 border-b border-slate-300/80 py-1.5 px-4 text-slate-700 text-xs no-print">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="font-semibold text-slate-800 flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-slate-600" />
              API সোর্স:
            </span>
            <span className="bg-white/80 border border-slate-300 px-1.5 py-0.5 rounded text-slate-800 font-medium">
              {rawPayload?.api || 'সার্ভার কপি ব্যাকআপ ২৪ ঘন্টা'}
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-600">
              ক্রেডিট কাটা হয়েছে: <strong className="text-slate-800">{rawPayload?.credits_charged ?? 10}</strong>
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-600">
              অবশিষ্ট ব্যালেন্স: <strong className="text-slate-800">{rawPayload?.balance_left ?? 11}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-slate-600 hidden md:inline">
              লেআউট: Bangladesh Election Commission NIDW
            </span>
            <button
              type="button"
              onClick={() => setIsJsonModalOpen(true)}
              className="text-blue-700 hover:text-blue-900 hover:underline font-medium cursor-pointer"
            >
              কাঁচা JSON দেখুন →
            </button>
          </div>
        </div>
      </div>

      {/* Main Printable Document Canvas */}
      <main className="flex-1 py-4 sm:py-8 px-2 sm:px-4 flex justify-center items-start">
        <NidReport
          data={activeData}
          onSearch={handleSearch}
          onPhotoChange={handlePhotoChange}
          showWatermark={showWatermark}
        />
      </main>

      {/* Footer Instructions (Screen only) */}
      <footer className="py-4 text-center text-xs text-slate-500 border-t border-slate-200 bg-white no-print">
        <div className="max-w-4xl mx-auto px-4 space-y-1">
          <p>
            This layout reproduces the official NID Server Copy from the Bangladesh Election Commission (NIDW) according to your API response.
          </p>
          <p className="text-[11px] text-slate-400">
            Tip: Click <strong>"Print / PDF"</strong> to generate or print a clean A4 copy without buttons or background borders.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <JsonModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        currentData={activeData}
        rawApiPayload={rawPayload}
        onImport={handleJsonImport}
      />

      <EditDataModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        data={activeData}
        onSave={handleEditSave}
      />

    </div>
  );
}
