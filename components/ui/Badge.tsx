
import React from 'react';

interface BadgeProps {
  colorClass: string;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ colorClass, children }) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {children}
    </span>
  );
};

export default Badge;
