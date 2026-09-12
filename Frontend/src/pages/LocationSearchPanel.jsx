import React from 'react';
import { MdLocationPin } from 'react-icons/md';
import { FaClockRotateLeft } from 'react-icons/fa6';

const LocationSearchPanel = ({ suggestions = [], onSelect, activeField }) => {
  return (
    <div className="p-4 sm:p-5 max-h-[60vh] overflow-y-auto space-y-2">
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          {suggestions.length > 0 ? `Suggested ${activeField || 'Locations'}` : 'Recent Places'}
        </span>
        {suggestions.length > 0 && (
          <span className="text-xs text-gray-400 font-medium">
            {suggestions.length} results
          </span>
        )}
      </div>

      {suggestions.length > 0 ? (
        suggestions.map((suggestion, idx) => (
          <div
            key={idx}
            onClick={() => onSelect(suggestion)}
            className="flex items-center gap-3.5 p-3.5 rounded-2xl hover:bg-gray-100 active:bg-gray-200 cursor-pointer transition border border-transparent hover:border-gray-200/60 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-black group-hover:text-white flex items-center justify-center text-gray-700 text-lg transition shrink-0">
              <MdLocationPin />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-sm truncate">
                {suggestion}
              </h4>
              <p className="text-xs text-gray-500 truncate">
                Select this address as {activeField || 'location'}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="py-8 text-center space-y-2">
          <div className="w-10 h-10 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
            <FaClockRotateLeft className="text-sm" />
          </div>
          <p className="text-xs text-gray-400">
            Type at least 3 characters to search for addresses
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationSearchPanel;
