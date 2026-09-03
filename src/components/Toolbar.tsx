import React from 'react';
import { Printer, Code2, Edit3, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

interface ToolbarProps {
  activeSample: 'rumana' | 'sanjit' | 'custom';
  onSelectSample: (sample: 'rumana' | 'sanjit') => void;
  onOpenJson: () => void;
  onOpenEdit: () => void;
  showWatermark: boolean;
  onToggleWatermark: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  activeSample,
  onSelectSample,
  onOpenJson,
  onOpenEdit,
  showWatermark,
  onToggleWatermark,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-2.5 shadow-2xs no-print">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-white font-bold text-xs shadow-xs">
            NID
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-800 text-sm tracking-tight">
                NID Server Copy Layout
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                <CheckCircle2 className="w-2.5 h-2.5" />
                API Verified
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-sans hidden sm:block">
              Bangladesh Election Commission (NIDW) Official Format
            </p>
          </div>
        </div>

        {/* Center: Sample Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-medium">
          <button
            type="button"
            onClick={() => onSelectSample('rumana')}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              activeSample === 'rumana'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            রুমানা আকতার (API Data)
          </button>
          <button
            type="button"
            onClick={() => onSelectSample('sanjit')}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              activeSample === 'sanjit'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            সনজিৎ কুমার (PDF Sample)
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Watermark Toggle */}
          <button
            type="button"
            onClick={onToggleWatermark}
            className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded border transition-colors cursor-pointer ${
              showWatermark
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
            title="Toggle NIDW background watermark"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Watermark</span>
          </button>

          {/* Edit Fields */}
          <button
            type="button"
            onClick={onOpenEdit}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
            title="Edit fields in document"
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Edit Data</span>
          </button>

          {/* View/Paste JSON */}
          <button
            type="button"
            onClick={onOpenJson}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
            title="View API JSON response or paste new API output"
          >
            <Code2 className="w-3.5 h-3.5 text-blue-600" />
            <span>API JSON</span>
          </button>

          {/* Print / Save PDF Button */}
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#007bff] hover:bg-[#0069d9] active:bg-[#0056b3] rounded shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>

      </div>
    </header>
  );
};
