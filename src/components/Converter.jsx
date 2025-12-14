import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ArrowDownUp, Calculator } from 'lucide-react';
import CurrencySelect from './CurrencySelect';
import AmountInput from './AmountInput';
import RateInfo from './RateInfo';


// using https://www.exchangerate-api.com/docs/standard-requests
const VITE_APP_EXCHANGE_RATE_API_KEY = import.meta.env.VITE_APP_EXCHANGE_RATE_API_KEY

const Converter = () => {
  const [currencies, setCurrencies] = useState({});
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');

  // Fetch available currencies
  const fetchCurrencies = useCallback(async () => {
    try {
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/${VITE_APP_EXCHANGE_RATE_API_KEY}/latest/USD`);
      setCurrencies(response.data.conversion_rates);
    } catch (err) {
      setError('Failed to fetch currencies. Please try again later.');
      console.error('Error fetching currencies:', err);
    }
  }, []);

  // Fetch exchange rate
  const fetchExchangeRate = useCallback(async () => {
    if (!fromCurrency || !toCurrency) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${VITE_APP_EXCHANGE_RATE_API_KEY}/pair/${fromCurrency}/${toCurrency}`
      );
      
      const rate = response.data.conversion_rate;
      setExchangeRate(rate);
      
      // Update converted amount
      const amountValue = parseFloat(amount) || 0;
      setConvertedAmount(amountValue * rate);
      
      // Set last updated time
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }));
    } catch (err) {
      setError('Failed to fetch exchange rate. Please try again.');
      console.error('Error fetching exchange rate:', err);
    } finally {
      setIsLoading(false);
    }
  }, [fromCurrency, toCurrency, amount]);

  // Swap currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Initialize on mount
  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);

  // Fetch exchange rate when currencies or amount changes
  useEffect(() => {
    fetchExchangeRate();
  }, [fetchExchangeRate]);

  // Handle amount change
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    
    // Recalculate immediately
    const amountValue = parseFloat(value) || 0;
    setConvertedAmount(amountValue * exchangeRate);
  };

  // Handle from currency change
  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  // Handle to currency change
  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">{error}</p>
          <button
            onClick={fetchCurrencies}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-2 gap-10 p-4 ">
        <div className='grid grid-cols-1 gap-10'>
            {/* Converter */}
            <div className="bg-[#1A1A1A] dark:bg-[#1A1A1A] rounded-2xl shadow-lg p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                    <Calculator className="w-6 h-6 text-[#A8FFBA] dark:text-[#A8FFBA]" />
                    <h2 className="text-xl font-semibold text-white dark:text-white">
                        Convert to Over 165 Currency
                    </h2>
                </div>

                {/* Converter Form */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Source Currency */}
                    <div className="space-y-6">
                        <CurrencySelect
                        label="From"
                        value={fromCurrency}
                        onChange={handleFromCurrencyChange}
                        currencies={currencies}
                        isLoading={isLoading}
                        />

                        <AmountInput
                        value={amount}
                        onChange={handleAmountChange}
                        disabled={isLoading}
                        />
                        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Source amount</p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white">
                                {parseFloat(amount).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                                })} {fromCurrency}
                            </p>
                        </div>
                    </div>

                    {/* Target Currency */}
                    <div className="space-y-6">
                        <CurrencySelect
                        label="To"
                        value={toCurrency}
                        onChange={handleToCurrencyChange}
                        currencies={currencies}
                        isLoading={isLoading}
                        />
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Converted Amount
                            </label>
                            <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
                                <p className="text-xl font-semibold text-gray-800 dark:text-white">
                                    {convertedAmount.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })} {toCurrency}
                                </p>
                            </div>
                        </div>
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400">You'll receive</p>
                            <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                                {convertedAmount.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                                })} {toCurrency}
                            </p>
                        </div>
                    </div>
                
                </div>

                {/* Swap Button */}
                <div className="flex items-center justify-center lg:justify-center mt-6">
                    <button
                    onClick={swapCurrencies}
                    disabled={isLoading}
                    className="p-4 rounded-full bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-800/50 transition-all duration-200 disabled:opacity-50"
                    aria-label="Swap currencies"
                    >
                    <ArrowDownUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </button>
                </div>

                {/* Rate Info */}
                {exchangeRate > 0 && (
                    <RateInfo
                        rate={exchangeRate}
                        fromCurrency={fromCurrency}
                        toCurrency={toCurrency}
                        lastUpdated={lastUpdated}
                        onRefresh={fetchExchangeRate}
                        isLoading={isLoading}
                    />
                )}

                {/* Loading State */}
                {isLoading && (
                <div className="mt-6 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Loading exchange rates...</p>
                </div>
                )}
            </div>

            {/* Detail */}
            <div className='bg-[#A0A0A0] dark:bg-[#A0A0A0] rounded-2xl shadow-lg p-6 md:p-8'>
                <h3 className='text-xl font-semibold text-white dark:text-white mb-2'>Convert to Over 165 Currency</h3>
                <p className='text-[#4A4A4A] dark:text-[#4A4A4A]'>Easy to use currency converter with free API support</p>
            </div>
        </div>

        <div className='grid grid-cols-1 gap-10'>
            {/* Detail */}
            <div className='bg-[#A0A0A0] dark:bg-[#A0A0A0] rounded-2xl shadow-lg p-6 md:p-8'>
                <h3 className='text-xl font-semibold text-white dark:text-white mb-2'>Convert to Over 165 Currency</h3>
                <p className='text-[#4A4A4A] dark:text-[#4A4A4A]'>Easy to use currency converter with free API support</p>
            </div>

            <div className='bg-[#F5F5F5] dark:bg-[#F5F5F5] rounded-2xl shadow-lg p-6 md:p-8'>
                <h3 className='text-xl font-semibold text-black dark:text-black mb-2'>Currency Supported</h3>
                <div>
                    {/* Currency Supported Component */}
                </div>
            </div>

        </div>
      
    </div>
  );
};

export default Converter;