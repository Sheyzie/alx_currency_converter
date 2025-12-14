import React from 'react';
import { RefreshCw } from 'lucide-react';

const RateInfo = ({ 
  rate, 
  fromCurrency, 
  toCurrency, 
  lastUpdated, 
  onRefresh,
  isLoading 
}) => {
  return (
    <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Current exchange rate
          </p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">
            1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Last updated: {lastUpdated}
          </p>
        </div>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-2 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
          aria-label="Refresh rates"
        >
          <RefreshCw 
            className={`w-5 h-5 text-green-600 dark:text-green-400 ${isLoading ? 'animate-spin' : ''}`}
          />
        </button>
      </div>
    </div>
  );
};

export default RateInfo;