import React from 'react';

export default function DayView({ meetings, viewDate, onSelectMeeting, setViewDate }) {
    const hours = Array.from({ length: 14 }, (_, i) => i + 7); // 7 AM to 8 PM

    const dayMeetings = meetings.filter(m => m.date === viewDate).sort((a, b) => a.start.localeCompare(b.start));

    const handlePrevDay = () => {
        const d = new Date(viewDate);
        d.setDate(d.getDate() - 1);
        setViewDate(d.toISOString().split('T')[0]);
    };

    const handleNextDay = () => {
        const d = new Date(viewDate);
        d.setDate(d.getDate() + 1);
        setViewDate(d.toISOString().split('T')[0]);
    };

    const handleToday = () => {
        const d = new Date();
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        setViewDate(d.toISOString().split('T')[0]);
    };

    return (
        <div className="flex-1 overflow-y-auto bg-brown-surface/50 flex flex-col">
            <div className="bg-brown-surface border-b border-border px-5 py-3 flex items-center justify-between shadow-sm sticky top-0 z-10">
                <div className="font-playfair text-[1.05rem] font-bold text-gray-900">Today's Schedule</div>
                <div className="flex items-center gap-1.5">
                    <button onClick={handlePrevDay} className="bg-surface-2 border-[1.5px] border-border rounded-lg text-gray-500 px-2.5 py-1 hover:border-gold hover:text-gold hover:bg-gold-bg transition-all text-[0.8rem]">‹</button>
                    <span className="font-mono text-[0.68rem] text-gray-500 px-2 py-1">{viewDate}</span>
                    <button onClick={handleNextDay} className="bg-surface-2 border-[1.5px] border-border rounded-lg text-gray-500 px-2.5 py-1 hover:border-gold hover:text-gold hover:bg-gold-bg transition-all text-[0.8rem]">›</button>
                    <button onClick={handleToday} className="bg-surface-2 border-[1.5px] border-border rounded-lg text-gray-500 px-2 py-1 hover:border-gold hover:text-gold hover:bg-gold-bg transition-all text-[0.62rem] ml-1">Today</button>
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
                                            rounded-2xl p-4 mb-2 cursor-pointer transition-all border shadow-sm hover:shadow-premium-hover hover:-translate-y-0.5 relative z-10
                                            ${meeting.status === 'done'
                                                ? '!bg-amber-100 !border-amber-300 opacity-60 grayscale-[0.2] text-amber-900'
                                                : meeting.color === 'blue' || (!meeting.color && meeting.role === 'teach')
                                                    ? '!bg-blue-100 !border-blue-300 text-blue-900'
                                                    : meeting.color === 'purple' || (!meeting.color && meeting.role === 'admin')
                                                        ? '!bg-purple-100 !border-purple-300 text-purple-900'
                                                        : meeting.color === 'yellow' || (!meeting.color && meeting.role === 'dir')
                                                            ? '!bg-yellow-100 !border-yellow-300 text-yellow-900'
                                                            : '!bg-orange-100 !border-orange-300 text-orange-900'}
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
