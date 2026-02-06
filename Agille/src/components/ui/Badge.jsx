import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
    const variants = {
        default: 'bg-gray-100 text-gray-800',
        available: 'bg-green-100 text-green-800',
        reserved: 'bg-yellow-100 text-yellow-800',
        overdue: 'bg-red-100 text-red-800',
        returned: 'bg-blue-100 text-blue-800',
        active: 'bg-emerald-100 text-emerald-800',
        inactive: 'bg-gray-100 text-gray-600'
    };

    return (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
