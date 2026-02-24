import React from 'react';
import { ROLES } from '../../constants/initialData';

export default function Toolbar({ activeRoles, onToggleRole, currentView, onViewChange }) {
    return (
        <div className="px-8 py-3.5 flex items-center gap-3 glass border-b border-navy/5 overflow-x-auto relative z-10 h-[64px]">
            <span className="font-mono text-[0.66rem] text-navy/30 uppercase tracking-[2px] shrink-0 mr-2 font-bold">Categories</span>

            {Object.entries(ROLES).map(([id, role]) => {
                const isActive = activeRoles.has(id);
                return (
                    <div
                        key={id}
                        onClick={() => onToggleRole(id)}
                        className={`
              px-4 py-1.5 rounded-xl text-[0.74rem] font-bold border-none cursor-pointer transition-all whitespace-nowrap shadow-sm
              ${role.className === 'dir' ? (isActive ? 'bg-gold text-white shadow-premium' : 'bg-gold/10 text-gold-dark hover:bg-gold/20') : ''}
              ${role.className === 'teach' ? (isActive ? 'bg-accent-blue text-white shadow-premium' : 'bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20') : ''}
              ${role.className === 'sup' ? (isActive ? 'bg-accent-orange text-white shadow-premium' : 'bg-accent-orange/10 text-accent-orange hover:bg-accent-orange/20') : ''}
              ${role.className === 'admin' ? (isActive ? 'bg-accent-purple text-white shadow-premium' : 'bg-accent-purple/10 text-accent-purple hover:bg-accent-purple/20') : ''}
            `}
                    >
                        {role.icon} {role.label}
                    </div>
                );
            })}

            <div className="w-px h-5 bg-border mx-1 shrink-0"></div>

            <div className="flex bg-navy/5 p-1 rounded-xl ml-auto shrink-0 border border-navy/5">
                <div
                    onClick={() => onViewChange('day')}
                    className={`px-5 py-1.5 rounded-lg text-[0.74rem] cursor-pointer font-bold transition-all ${currentView === 'day' ? 'bg-white text-navy shadow-premium' : 'text-navy/40 hover:text-navy/60'}`}
                >
                    Day
                </div>
                <div
                    onClick={() => onViewChange('week')}
                    className={`px-5 py-1.5 rounded-lg text-[0.74rem] cursor-pointer font-bold transition-all ${currentView === 'week' ? 'bg-white text-navy shadow-premium' : 'text-navy/40 hover:text-navy/60'}`}
                >
                    Week
                </div>
            </div>
        </div>
    );
}
