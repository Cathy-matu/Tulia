import React from 'react';
import { ROLES } from '../../constants/initialData';

export default function LeftSidebar({ activeRole, onToggleRole, viewDate }) {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.toLocaleString('default', { month: 'long' });

    return (
        <aside className="fixed bottom-0 left-0 right-0 h-[64px] md:relative md:h-full md:w-[80px] md:hover:w-[260px] w-full glass bg-white/90 md:bg-transparent backdrop-blur-xl border-t md:border-t-0 md:border-r border-navy/5 flex flex-row md:flex-col shrink-0 transition-all duration-300 group z-40 overflow-visible md:overflow-hidden justify-around md:justify-start px-2 md:px-0 shadow-[0_-4px_20px_-2px_rgba(26,34,54,0.08)] md:shadow-none">
            {/* Branding Header */}
            <div className="hidden md:flex h-[72px] items-center justify-center border-b border-navy/5 px-2 group-hover:px-6 group-hover:justify-start transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-white font-playfair font-bold text-xl shadow-premium shrink-0">
                    T
                </div>
                <div className="ml-4 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-300 delay-100 flex flex-col">
                    <span className="font-playfair text-lg font-bold text-navy tracking-tight leading-none">Tulia<span className="text-gold">Prof</span></span>
                    <span className="font-mono text-[0.55rem] text-navy/40 uppercase tracking-widest font-bold mt-1">Management</span>
                </div>
            </div>

            {/* Mini Calendar (Visual Only) */}
            <div className="hidden md:flex py-6 flex-col items-center border-b border-navy/5 group-hover:px-6 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-white border border-navy/5 flex flex-col items-center justify-center shadow-sm group-hover:w-full group-hover:h-auto group-hover:py-3 transition-all">
                    <span className="text-[0.6rem] font-mono text-navy/40 uppercase font-bold group-hover:mb-1">{currentMonth.substring(0, 3)}</span>
                    <span className="text-xl font-bold text-navy leading-none">{currentDay}</span>
                    <span className="text-[0.65rem] font-bold text-navy mt-1 opacity-0 group-hover:opacity-100 hidden group-hover:block transition-all">{viewDate}</span>
                </div>
            </div>

            {/* Role Filters */}
            <div className="flex-1 md:overflow-y-auto py-0 md:py-6 px-1 md:px-3 flex flex-row md:flex-col gap-2 md:gap-3 group-hover:px-4 items-center md:items-stretch overflow-x-auto no-scrollbar">
                <div className="hidden md:block px-2 mb-2 opacity-0 group-hover:opacity-100 group-hover:block transition-all duration-300 delay-100">
                    <h3 className="text-[0.6rem] font-mono text-navy/30 uppercase tracking-[2px] font-bold">Role Filters</h3>
                </div>

                {Object.entries(ROLES).map(([id, role]) => {
                    const isActive = activeRole === id;

                    const activeClassMap = {
                        'dir': 'bg-gold text-white border-transparent shadow-premium scale-[1.02]',
                        'teach': 'bg-accent-blue text-white border-transparent shadow-premium scale-[1.02]',
                        'sup': 'bg-accent-orange text-white border-transparent shadow-premium scale-[1.02]',
                        'admin': 'bg-accent-purple text-white border-transparent shadow-premium scale-[1.02]',
                    };

                    const inactiveClassMap = {
                        'dir': 'bg-white border-navy/5 text-navy/40 hover:border-gold/40 hover:text-gold',
                        'teach': 'bg-white border-navy/5 text-navy/40 hover:border-accent-blue/40 hover:text-accent-blue',
                        'sup': 'bg-white border-navy/5 text-navy/40 hover:border-accent-orange/40 hover:text-accent-orange',
                        'admin': 'bg-white border-navy/5 text-navy/40 hover:border-accent-purple/40 hover:text-accent-purple',
                    };

                    const buttonClasses = isActive ? activeClassMap[role.className] : inactiveClassMap[role.className];

                    return (
                        <button
                            key={id}
                            onClick={() => onToggleRole(id)}
                            className={`
                                w-11 h-11 md:w-12 md:h-12 rounded-xl border flex items-center justify-center text-lg transition-all shadow-sm shrink-0
                                md:group-hover:w-full md:group-hover:justify-start md:group-hover:px-4 md:group-hover:gap-3
                                ${buttonClasses}
                            `}
                            title={role.label}
                        >
                            <span className="shrink-0">{role.icon}</span>
                            <span className="opacity-0 md:group-hover:opacity-100 hidden md:group-hover:block whitespace-nowrap text-[0.75rem] font-bold transition-opacity duration-300">
                                {role.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* User Profile Footer */}
            <div className="hidden md:block p-3 border-t border-navy/5 group-hover:p-4 transition-all">
                <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center group-hover:w-full group-hover:justify-start group-hover:px-4 group-hover:gap-3 cursor-pointer hover:bg-navy/10 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-navy text-white flex items-center justify-center font-bold text-xs shrink-0">JM</div>
                    <div className="opacity-0 group-hover:opacity-100 hidden group-hover:block flex-col overflow-hidden">
                        <span className="text-[0.75rem] font-bold text-navy truncate block">Japheth Mursi</span>
                        <span className="text-[0.6rem] font-mono text-navy/40 uppercase tracking-widest block">Deputy Director</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
