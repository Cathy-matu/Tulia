import React from 'react';

export default function RightPanel({ selectedMeeting, onStatusChange, hasConflict }) {
    if (!selectedMeeting) {
        return (
            <aside className="w-[300px] border-l border-navy/5 glass flex flex-col overflow-hidden shrink-0">
                <div className="flex border-b border-navy/5 bg-navy/5 p-1 h-[48px]">
                    <div className="flex-1 rounded-lg flex items-center justify-center text-[0.64rem] font-mono text-navy border-none bg-white font-bold shadow-sm uppercase tracking-wider">Details</div>
                    <div className="flex-1 flex items-center justify-center text-[0.64rem] font-mono text-navy/30 cursor-pointer hover:text-navy transition-all uppercase tracking-wider font-bold">Alerts</div>
                    <div className="flex-1 flex items-center justify-center text-[0.64rem] font-mono text-navy/30 cursor-pointer hover:text-navy transition-all uppercase tracking-wider font-bold">Stats</div>
                </div>
                <div className="flex-1 p-8 flex flex-col items-center justify-center text-center gap-4 text-navy/20">
                    <div className="w-20 h-20 rounded-[2.5rem] bg-navy/5 flex items-center justify-center text-4xl mb-2 grayscale opacity-40">🎓</div>
                    <div className="font-playfair text-xl font-bold text-navy/10 tracking-tight">TuliaProf</div>
                    <span className="text-[0.8rem] font-medium leading-relaxed italic">Select a meeting<br />to view details</span>
                </div>
            </aside>
        );
    }

    const isDone = selectedMeeting.status === 'done';
    const isMissed = selectedMeeting.status === 'missed';

    return (
        <aside className="w-[300px] border-l border-navy/5 glass flex flex-col overflow-hidden shrink-0">
            <div className="flex border-b border-navy/5 bg-navy/5 p-1 h-[48px]">
                <div className="flex-1 rounded-lg flex items-center justify-center text-[0.64rem] font-mono text-navy border-none bg-white font-bold shadow-sm uppercase tracking-wider">Details</div>
                <div className="flex-1 flex items-center justify-center text-[0.64rem] font-mono text-navy/30 cursor-pointer hover:text-navy transition-all uppercase tracking-wider font-bold">Alerts</div>
                <div className="flex-1 flex items-center justify-center text-[0.64rem] font-mono text-navy/30 cursor-pointer hover:text-navy transition-all uppercase tracking-wider font-bold">Stats</div>
            </div>
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
                <h2 className="font-playfair text-[1.4rem] font-bold text-navy mb-1 leading-tight tracking-tight">{selectedMeeting.title}</h2>

                {hasConflict && (
                    <div className="bg-accent-orange/15 border border-accent-orange/20 rounded-2xl p-4 text-[0.78rem] text-accent-orange font-bold flex gap-3 shadow-sm">
                        <span className="text-lg">⚠️</span>
                        <span>This schedule overlaps with another session.</span>
                    </div>
                )}

                <div className="space-y-1">
                    <div className="text-[0.62rem] font-mono text-navy/30 uppercase tracking-[2px] font-bold">Schedule</div>
                    <div className="text-[0.88rem] text-navy font-bold">{selectedMeeting.date}</div>
                    <div className="text-[0.82rem] text-navy/60 font-medium font-mono">{selectedMeeting.start} – {selectedMeeting.end}</div>
                </div>

                <div className="space-y-1">
                    <div className="text-[0.62rem] font-mono text-navy/30 uppercase tracking-[2px] font-bold">Logistics</div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <span className="text-navy/30 text-[0.8rem] w-5">📍</span>
                            <div className="text-[0.82rem] text-navy/70 font-medium leading-relaxed">{selectedMeeting.location || 'Not specified'}</div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-navy/30 text-[0.8rem] w-5">👥</span>
                            <div className="text-[0.82rem] text-navy/70 font-medium leading-relaxed">{selectedMeeting.participants || 'None listed'}</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="text-[0.62rem] font-mono text-navy/30 uppercase tracking-[2px] font-bold">Notes & Agenda</div>
                    <div className="text-[0.82rem] text-navy/70 font-medium leading-relaxed italic bg-white/40 p-4 rounded-2xl border border-navy/5">{selectedMeeting.notes || 'No notes for this session.'}</div>
                </div>

                <div className="flex gap-3 pt-4">
                    <button
                        onClick={() => onStatusChange(selectedMeeting.id, 'done')}
                        className={`flex-1 py-3 rounded-2xl border-none text-[0.76rem] font-bold transition-all shadow-sm ${isDone ? 'bg-accent-green text-white shadow-premium' : 'bg-navy/5 text-navy/50 hover:bg-accent-green/10 hover:text-accent-green'}`}
                    >
                        {isDone ? '✓ Completed' : 'Mark Completed'}
                    </button>
                    <button
                        onClick={() => onStatusChange(selectedMeeting.id, 'missed')}
                        className={`flex-1 py-3 rounded-2xl border-none text-[0.76rem] font-bold transition-all shadow-sm ${isMissed ? 'bg-accent-orange text-white shadow-premium' : 'bg-navy/5 text-navy/50 hover:bg-accent-orange/10 hover:text-accent-orange'}`}
                    >
                        {isMissed ? '✕ Missed' : 'Mark Missed'}
                    </button>
                </div>
            </div>
        </aside>
    );
}
