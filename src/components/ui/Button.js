import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
    const baseStyles = 'glass-btn inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-white/10 hover:bg-white/20 border-white/20 hover:border-primary hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]',
        secondary: 'bg-transparent hover:bg-white/5 border-white/10 hover:border-white/30',
        ghost: 'bg-transparent border-transparent hover:bg-white/5',
        danger: 'bg-red-500/10 hover:bg-red-500/20 border-red-500/20 hover:border-red-500 text-red-200'
    };

    const sizes = {
        sm: 'px-4 py-1.5 text-sm',
        md: 'px-6 py-2.5 text-base',
        lg: 'px-8 py-3.5 text-lg'
    };

    // Combine classes manually since we don't have clsx/tailwind-merge yet
    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
        <button className={combinedClassName} {...props}>
            {children}
        </button>
    );
};

export default Button;
