import React from 'react';
import { LayoutDashboard, Plus, Bell, BarChart3 } from 'lucide-react';

export default function Header({ onAddMeeting, onToggleNotif }) {
    return (
        <header className="sticky top-0 z-[300] glass px-8 h-[72px] flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-navy flex items-center justify-center text-xl shrink-0 shadow-premium border border-white/10 relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="relative z-10">🎓</span>
                </div>
                <div>
                    <div className="font-playfair text-2xl font-bold text-navy tracking-tight">
                        Tulia<span className="text-gold">Prof</span>
                    </div>
                    <span className="font-mono text-[0.62rem] text-navy/50 block tracking-wider uppercase font-medium">
                        Academic Meeting Manager
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 bg-ivory-dark border border-navy/5 rounded-xl px-4 py-2 text-[0.75rem] text-navy/70 hover:border-gold/50 hover:text-navy hover:bg-white transition-all font-mono font-medium shadow-sm">
                    <BarChart3 size={15} className="text-gold" /> Weekly Summary
                </button>

                <button className="flex items-center gap-2.5 bg-navy text-white border-none rounded-xl px-4 py-2 text-[0.75rem] font-semibold shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 transition-all shrink-0">
                    <div className="w-4 h-4 grid grid-cols-2 gap-[1.5px] shrink-0 opacity-90">
                        <span className="rounded-[1px] bg-[#f25022]"></span>
                        <span className="rounded-[1px] bg-[#7fba00]"></span>
                        <span className="rounded-[1px] bg-[#00a4ef]"></span>
                        <span className="rounded-[1px] bg-[#ffb900]"></span>
                    </div>
                    Connect Outlook
                </button>

                <button
                    onClick={onAddMeeting}
                    className="bg-gold text-navy-light border-none rounded-xl px-5 py-2 text-[0.75rem] font-bold shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 transition-all"
                >
                    + Schedule
                </button>

                <div
                    onClick={onToggleNotif}
                    className="relative cursor-pointer bg-white border border-navy/5 rounded-xl w-10 h-10 flex items-center justify-center hover:border-gold/50 hover:shadow-premium transition-all group"
                >
                    <Bell size={20} className="text-navy/60 group-hover:text-gold transition-colors" />
                    <div className="absolute top-2 right-2 bg-accent-orange text-white rounded-full w-4 h-4 text-[0.58rem] font-bold flex items-center justify-center border-2 border-white animate-pulse-subtle">
                        3
                    </div>
                </div>
            </div>
        </header>
    );
}
