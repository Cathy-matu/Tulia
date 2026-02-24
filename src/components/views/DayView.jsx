import React from 'react';

export default function DayView({ meetings, viewDate, onSelectMeeting }) {
    const hours = Array.from({ length: 14 }, (_, i) => i + 7); // 7 AM to 8 PM

    const dayMeetings = meetings.filter(m => m.date === viewDate).sort((a, b) => a.start.localeCompare(b.start));

    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col">
            <div className="bg-white border-b border-border px-5 py-3 flex items-center justify-between shadow-sm sticky top-0 z-10">
                <div className="font-playfair text-[1.05rem] font-bold text-gray-900">Today's Schedule</div>
                <div className="flex items-center gap-1.5">
                    <button className="bg-surface-2 border-[1.5px] border-border rounded-lg text-gray-500 px-2.5 py-1 hover:border-gold hover:text-gold hover:bg-gold-bg transition-all text-[0.8rem]">‹</button>
                    <span className="font-mono text-[0.68rem] text-gray-500 px-2 py-1">{viewDate}</span>
                    <button className="bg-surface-2 border-[1.5px] border-border rounded-lg text-gray-500 px-2.5 py-1 hover:border-gold hover:text-gold hover:bg-gold-bg transition-all text-[0.8rem]">›</button>
                    <button className="bg-surface-2 border-[1.5px] border-border rounded-lg text-gray-500 px-2 py-1 hover:border-gold hover:text-gold hover:bg-gold-bg transition-all text-[0.62rem] ml-1">Today</button>
                </div>
            </div>

            <div className="p-5 flex-1">
                {hours.map(hour => {
                    const timeStr = `${String(hour).padStart(2, '0')}:00`;
                    const hourMeetings = dayMeetings.filter(m => parseInt(m.start) === hour);

                    return (
                        <div key={hour} className="flex gap-6 min-h-[64px] group">
                            <div className="font-mono text-[0.68rem] text-navy/20 w-12 shrink-0 pt-2 text-right font-bold group-hover:text-navy/40 transition-colors">{timeStr}</div>
                            <div className="flex-1 border-t border-navy/5 pt-1.5 min-h-[64px] relative">
                                {hourMeetings.map(meeting => (
                                    <div
                                        key={meeting.id}
                                        onClick={() => onSelectMeeting(meeting)}
                                        className={`
                                            rounded-2xl p-4 mb-2 cursor-pointer transition-all glass border border-white/60 shadow-sm hover:shadow-premium-hover hover:-translate-y-0.5 relative z-10
                                            ${meeting.role === 'dir' ? 'hover:border-gold/30' : meeting.role === 'teach' ? 'hover:border-accent-blue/30' : meeting.role === 'sup' ? 'hover:border-accent-orange/30' : 'hover:border-accent-purple/30'}
                                            ${meeting.status === 'done' ? 'opacity-50 grayscale-[0.2]' : ''}
                                        `}
                                    >
                                        <div className={`text-[0.92rem] font-bold text-navy leading-tight ${meeting.status === 'done' ? 'line-through text-navy/40' : ''}`}>
                                            {meeting.title}
                                        </div>
                                        <div className="font-mono text-[0.7rem] text-navy/40 mt-1.5 font-medium flex items-center gap-3">
                                            <span>🕒 {meeting.start}–{meeting.end}</span>
                                            {meeting.location && <span>📍 {meeting.location}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
