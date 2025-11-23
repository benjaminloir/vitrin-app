import React from 'react';

const Input = ({ label, error, helperText, className = '', ...props }) => {
    return (
        <div className="w-full mb-4">
            {label && (
                <label className="block text-sm text-gray-300 mb-2 ml-1">
                    {label}
                </label>
            )}
            <input
                className={`
          w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3
          text-white placeholder-gray-500 outline-none transition-all
          focus:border-primary focus:bg-white/10 focus:shadow-[0_0_15px_rgba(124,58,237,0.3)]
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500/50 focus:border-red-500' : ''}
          ${className}
        `}
                {...props}
            />
            {helperText && !error && (
                <p className="text-gray-500 text-xs mt-1 ml-1">{helperText}</p>
            )}
            {error && (
                <p className="text-red-400 text-xs mt-1 ml-1">{error}</p>
            )}
        </div>
    );
};

export default Input;
