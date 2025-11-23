import React from 'react';

const Card = ({ children, className = '', hover = false, ...props }) => {
    const baseStyles = 'glass-card p-6 transition-all duration-300';
    const hoverStyles = hover ? 'hover:translate-y-[-5px] hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]' : '';

    return (
        <div className={`${baseStyles} ${hoverStyles} ${className}`} {...props}>
            {children}
        </div>
    );
};

export default Card;
