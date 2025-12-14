import { useState, useEffect, useCallback } from "react";
import axios from 'axios';

// using https://www.exchangerate-api.com/docs/standard-requests
const VITE_APP_EXCHANGE_RATE_API_KEY = import.meta.env.VITE_APP_EXCHANGE_RATE_API_KEY

function SupportedCurrency() {
    const [ supportedCurrencies, setSupportedCurrencies ] = useState([])

    // Fetch available currencies
    const fetchSupportedCurrencies = useCallback(async () => {
        try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${VITE_APP_EXCHANGE_RATE_API_KEY}/codes`);
        setSupportedCurrencies(response.data.supported_codes);
        } catch (err) {
            console.error('Error fetching currencies:', err);
        }
    }, []);

    useEffect(() => {
    fetchSupportedCurrencies();
  }, [fetchSupportedCurrencies]);

  return (
    <>
        <div className="max-h-150 overflow-y-auto p-2 bg-[#A8FFBA] dark:bg-[#A8FFBA] rounded-2xl">
            {supportedCurrencies.map((supportedCurrency) => (
                <div key={supportedCurrency[0]} className="flex justify-between" >
                    <p className="text-black dark:text-black">{supportedCurrency[1]} </p>
                    <p className="text-black dark:text-black">{supportedCurrency[0]}</p>
                </div>
            ))}
        </div>
    </>
  )
}

export default SupportedCurrency


