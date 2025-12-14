import { useState, useEffect } from 'react';
import { Globe, Moon, Sun} from 'lucide-react';

const Header = () => {
    const [darkMode, setDarkMode] = useState(false);
    
      useEffect(() => {
        // Check user preference or system setting
        if (localStorage.theme === 'dark' || 
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          setDarkMode(true);
        }
    
        if (localStorage.theme === 'light') {
          setDarkMode(false);
        }
      }, []);
    
      useEffect(() => {
        if (darkMode) {
          document.documentElement.classList.add('dark');
          localStorage.theme = 'dark';
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.theme = 'light';
        }
      }, [darkMode]);
    
      const toggleDarkMode = () => {
        setDarkMode(!darkMode);
      };
    return (
        <header className="w-full py-6">
        <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between gap-3 bg-[#1A1A1A] rounded-2xl px-10 py-4">
                <div className='flex items-center gap-3 w-md'>
                    <Globe className="inline w-8 h-8 text-[#A8FFBA] dark:text-[#A8FFBA]" />
                    <h1 className="inline text-3xl font-bold text-white dark:text-white">
                        CURRENCY CONVERTER
                    </h1>
                </div>

                <button
                    onClick={toggleDarkMode}
                    className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 z-50"
                    aria-label="Toggle dark mode"
                >
                    {darkMode ? (
                    <Sun className="w-5 h-5 text-yellow-500" />
                    ) : (
                    <Moon className="w-5 h-5 text-gray-700" />
                    )}
                </button>
            </div>
            <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
            Real-time exchange rates with live conversion
            </p>
        </div>
        </header>
    );
};

export default Header;