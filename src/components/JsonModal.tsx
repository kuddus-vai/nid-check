import React, { useState } from 'react';
import { X, Check, Copy, AlertCircle, Upload } from 'lucide-react';
import { NidData } from '../types';

interface JsonModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: NidData;
  rawApiPayload: any;
  onImport: (newData: NidData, rawPayload?: any) => void;
}

export const JsonModal: React.FC<JsonModalProps> = ({
  isOpen,
  onClose,
  rawApiPayload,
  onImport,
}) => {
  const [jsonText, setJsonText] = useState(() => JSON.stringify(rawApiPayload, null, 2));
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setError(null);

      // Detect structure:
      // Can be either full API wrapper: { response: { data: { ... } } }
      // or directly { data: { ... } }
      // or direct NidData { name: "...", nationalId: "..." }
      let targetData: any = null;
      if (parsed.response?.data) {
        targetData = parsed.response.data;
      } else if (parsed.data) {
        targetData = parsed.data;
      } else if (parsed.name || parsed.nationalId) {
        targetData = parsed;
      } else {
        throw new Error('Could not find valid NID data object in JSON. Make sure it contains "name", "nationalId", or response.data.');
      }

      // Normalization
      const normalized: NidData = {
        name: targetData.name || 'রুমানা আকতার',
        nameEn: targetData.nameEn || 'RUMANA AKTAR',
        father: targetData.father || '',
        mother: targetData.mother || '',
        spouse: targetData.spouse || '-',
        nationalId: targetData.nationalId || targetData.pin || '',
        pin: targetData.pin || targetData.nationalId || '',
        formNo: targetData.formNo || '-',
        voterArea: targetData.voterArea || '',
        dateOfBirth: targetData.dateOfBirth || '',
        age: targetData.age || '',
        birthDay: targetData.birthDay || '',
        gender: targetData.gender || 'মহিলা',
        occupation: targetData.occupation || '-',
        birthPlace: targetData.birthPlace || '',
        Nationality: targetData.Nationality || 'বাংলাদেশী',
        religion: targetData.religion || 'ইসলাম',
        photo: targetData.photo || '',
        presentAddress: typeof targetData.presentAddress === 'object' ? targetData.presentAddress : {
          division: '',
          region: '',
          district: '',
          upozila: '',
          addressLine: typeof targetData.presentAddress === 'string' ? targetData.presentAddress : ''
        },
        permanentAddress: typeof targetData.permanentAddress === 'object' ? targetData.permanentAddress : {
          division: '',
          region: '',
          district: '',
          upozila: '',
          addressLine: typeof targetData.permanentAddress === 'string' ? targetData.permanentAddress : ''
        }
      };

      onImport(normalized, parsed);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Invalid JSON syntax');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs no-print">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50">
          <div>
            <h3 className="font-semibold text-slate-800 text-base">
              API Response Data & JSON Importer
            </h3>
            <p className="text-xs text-slate-500">
              View current API response payload or paste new Server Copy response
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-3">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="relative">
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              rows={16}
              spellCheck={false}
              className="w-full font-mono text-xs p-3 bg-slate-900 text-emerald-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 selection:bg-emerald-800 selection:text-white"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy JSON'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors shadow-xs cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Apply & Render</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
