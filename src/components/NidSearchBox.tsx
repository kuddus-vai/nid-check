import React, { useState } from 'react';

interface NidSearchBoxProps {
  currentNid: string;
  onSearch: (nidOrForm: string, type: 'nid' | 'form') => void;
}

export const NidSearchBox: React.FC<NidSearchBoxProps> = ({ currentNid, onSearch }) => {
  const [searchType, setSearchType] = useState<'nid' | 'form'>('nid');
  const [searchValue, setSearchValue] = useState(currentNid);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue.trim(), searchType);
  };

  return (
    <div
      id="nid-search-category-section"
      className="w-full bg-white border-b border-slate-200 py-3 sm:py-4 px-4 text-center"
    >
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-2.5">
        {/* Title */}
        <h2 className="text-[#a51d45] font-semibold text-sm sm:text-base font-sans tracking-wide">
          Select Your Search Category
        </h2>

        {/* Radio options */}
        <div className="flex items-center justify-center gap-6 text-xs sm:text-sm font-medium text-slate-700">
          <label className="inline-flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="searchCategory"
              value="nid"
              checked={searchType === 'nid'}
              onChange={() => setSearchType('nid')}
              className="text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
            />
            <span className="text-slate-800">Search By NID / Voter No.</span>
          </label>

          <label className="inline-flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="searchCategory"
              value="form"
              checked={searchType === 'form'}
              onChange={() => setSearchType('form')}
              className="text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
            />
            <span className="text-slate-800">Search By Form No.</span>
          </label>
        </div>

        {/* Input and Submit */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <label htmlFor="search-input-field" className="text-xs sm:text-sm font-medium text-slate-800">
            {searchType === 'nid' ? 'NID or Voter No' : 'Form No'}
            <span className="text-red-600 font-bold ml-0.5">*</span>
          </label>

          <div className="flex items-center gap-2">
            <input
              id="search-input-field"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={searchType === 'nid' ? 'Enter NID / Voter Number' : 'Enter Form Number'}
              className="border border-slate-300 rounded px-2.5 py-1 text-xs sm:text-sm w-44 sm:w-56 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
            />

            <button
              type="submit"
              className="bg-[#28a745] hover:bg-[#218838] active:bg-[#1e7e34] text-white text-xs sm:text-sm font-medium px-4 py-1 rounded shadow-xs transition-colors cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
