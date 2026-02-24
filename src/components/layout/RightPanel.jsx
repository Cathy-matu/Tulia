import React from 'react';

export default function RightPanel({ selectedMeeting, onStatusChange, hasConflict, upcomingMeetings = [], onSelectMeeting, showMobilePanel, onCloseMobilePanel }) {
    const mobileBackdrop = (
        <div
            className={`md:hidden fixed inset-0 bg-navy/20 backdrop-blur-sm z-40 transition-opacity ${showMobilePanel ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onCloseMobilePanel}
        />
    );

    const asideClasses = `fixed top-0 right-0 bottom-0 w-[85vw] max-w-[360px] md:relative md:w-[300px] z-50 md:z-auto bg-ivory md:bg-transparent border-l border-navy/5 glass flex flex-col overflow-hidden shrink-0 transition-transform duration-300 ${showMobilePanel ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`;

    if (!selectedMeeting) {
        return (
            <>
                {mobileBackdrop}
                <aside className={asideClasses}>
                    <div className="flex border-b border-navy/5 bg-navy/5 p-1 h-[48px] shrink-0">
                        <div className="flex-1 rounded-lg flex items-center justify-center text-[0.64rem] font-mono text-navy border-none bg-white font-bold shadow-sm uppercase tracking-wider">Agenda</div>
                        <div className="flex-1 flex items-center justify-center text-[0.64rem] font-mono text-navy/30 uppercase tracking-wider font-bold">Details</div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 pb-0">
                        <h3 className="text-[0.68rem] font-mono text-navy/40 uppercase tracking-[1.5px] font-bold mb-4 px-1">Upcoming</h3>
                        <div className="flex flex-col gap-3">
                            {upcomingMeetings.length === 0 ? (
                                <div className="text-center py-10 text-navy/30 text-[0.8rem] font-medium italic">No upcoming meetings.</div>
                            ) : (
                                upcomingMeetings.slice(0, 5).map(meeting => {
                                    const roleBgMap = {
                                        'dir': 'bg-gold',
                                        'teach': 'bg-accent-blue',
                                        'sup': 'bg-accent-orange',
                                        'admin': 'bg-accent-purple'
                                    };
                                    const roleBgClass = roleBgMap[meeting.role] || 'bg-navy';

                                    return (
                                        <div
                                            key={meeting.id}
                                            onClick={() => onSelectMeeting(meeting)}
                                            className="relative glass border border-white/60 rounded-2xl p-4 cursor-pointer transition-all overflow-hidden shadow-sm hover:shadow-premium-hover hover:-translate-y-0.5 group bg-white/40"
                                        >
                                            <div className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl ${roleBgClass}`}></div>
                                            <div className="pl-1">
                                                <div className="text-[0.88rem] font-bold mb-1 leading-tight text-navy group-hover:text-navy transition-colors">{meeting.title}</div>
                                                <div className="text-[0.7rem] text-navy/50 font-mono font-medium flex items-center gap-2">
                                                    <span>{meeting.start}</span>
                                                    {meeting.location && <span className="truncate">· {meeting.location}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                    <div className="p-6 pt-4 shrink-0">
                        <div className="bg-navy/5 rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-2">
                            <span className="text-2xl grayscale opacity-50 mb-1">🎓</span>
                            <span className="text-[0.75rem] font-bold text-navy/40">Select any session</span>
                            <span className="text-[0.65rem] text-navy/30 font-medium leading-relaxed">View full details, logistics, or update status</span>
                        </div>
                    </div>
                </aside>
            </>
        );
    }

    const isDone = selectedMeeting.status === 'done';
    const isMissed = selectedMeeting.status === 'missed';

    return (
        <>
            {mobileBackdrop}
            <aside className={asideClasses}>
                <div className="flex border-b border-navy/5 bg-navy/5 p-1 h-[48px] shrink-0">
                    <div className="flex-1 flex items-center justify-center text-[0.64rem] font-mono text-navy/30 uppercase tracking-wider font-bold cursor-pointer hover:text-navy transition-all" onClick={() => onSelectMeeting(null)}>Agenda</div>
                    <div className="flex-1 rounded-lg flex items-center justify-center text-[0.64rem] font-mono text-navy border-none bg-white font-bold shadow-sm uppercase tracking-wider">Details</div>
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
        </>
    );
}
