import React from 'react';

export default function InfoItem({ icon: Icon, children, iconColor = 'text-slate-500' }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon className={`h-4 w-4 ${iconColor} flex-shrink-0`} />
      <span className="text-slate-600">{children}</span>
    </div>
  );
}