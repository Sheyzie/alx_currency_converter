import React from 'react';

const AmountInput = ({ 
  value, 
  onChange, 
  onFocus,
  disabled 
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Amount
      </label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        disabled={disabled}
        placeholder="Enter amount"
        min="0"
        step="0.01"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />
    </div>
  );
};

export default AmountInput;