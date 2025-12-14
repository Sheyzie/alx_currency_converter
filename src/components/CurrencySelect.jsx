import React from 'react';

const CurrencySelect = ({ 
  label, 
  value, 
  onChange, 
  currencies, 
  isLoading,
  disabled 
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        disabled={isLoading || disabled}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      >
        <option value="">Select currency</option>
        {Object.entries(currencies).map(([code, name]) => (
          <option key={code} value={code}>
            {code} - {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelect;