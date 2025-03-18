import React from 'react';
import { MdLocationPin } from "react-icons/md";

const LocationSearchPanel = ({ suggestions = [], onSelect }) => {
    return (
        <div className="p-4">
            {suggestions.length > 0 && (
                <div className="mb-2 text-gray-600 font-medium">
                    {`Found ${suggestions.length} suggestions`}
                </div>
            )}
            {suggestions.map((suggestion, idx) => (
                <div 
                    key={idx} 
                    onClick={() => onSelect(suggestion)}
                    className="mt-3 border-gray-600 rounded-sm border-2 cursor-pointer hover:bg-gray-100"
                >
                    <div className="flex gap-4 my-4 items-center">
                        <div className="bg-gray-200 h-10 w-10 flex items-center justify-center rounded-full text-gray-700 text-xl">
                            <MdLocationPin />
                        </div>
                        <h4 className="font-medium text-gray-800 text-sm sm:text-base">
                            {suggestion}
                        </h4>
                    </div>
                </div>
            ))}
            {suggestions.length === 0 && (
                <div className="text-gray-500 text-sm mt-2">No suggestions available</div>
            )}
        </div>
    );
};

export default LocationSearchPanel;
