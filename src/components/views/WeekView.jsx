import React from 'react';
import { ROLES } from '../../constants/initialData';

export default function WeekView({ meetings, onSelectMeeting }) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const hours = Array.from({ length: 14 }, (_, i) => i + 7);

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-ivory/30">
            <div className="glass border-b border-navy/5 px-8 py-4 flex items-center justify-between sticky top-0 z-10 h-[64px]">
                <div className="font-playfair text-[1.15rem] font-bold text-navy tracking-tight">Weekly Schedule</div>
                <div className="flex items-center gap-2">
                    <button className="bg-white border border-navy/5 rounded-xl text-navy/40 w-8 h-8 flex items-center justify-center hover:border-gold hover:text-gold transition-all text-[0.85rem] shadow-sm">‹</button>
                    <span className="font-mono text-[0.72rem] text-navy/50 px-3 py-1 font-bold tracking-wider uppercase">Feb 23 – Mar 01</span>
                    <button className="bg-white border border-navy/5 rounded-xl text-navy/40 w-8 h-8 flex items-center justify-center hover:border-gold hover:text-gold transition-all text-[0.85rem] shadow-sm">›</button>
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <div className="grid grid-cols-[64px_repeat(7,1fr)] min-w-[800px]">
                    <div className="glass sticky top-0 z-[5] border-b border-navy/5 border-r border-navy/5 h-[48px]"></div>
                    {days.map((day, i) => (
                        <div key={day} className={`glass sticky top-0 z-[5] p-3 text-center border-b border-r border-navy/5 font-mono text-[0.66rem] text-navy/30 font-bold uppercase tracking-[2px] ${i === 2 ? 'bg-gold/5 text-gold border-b-gold' : ''}`}>
                            {day}
                            <span className="text-xl font-bold block mt-px text-navy">{23 + i}</span>
                        </div>
                    ))}

                    {hours.map(hour => (
                        <React.Fragment key={hour}>
                            <div className="font-mono text-[0.68rem] text-navy/20 p-2 pt-3 text-right border-r border-navy/5 border-b border-navy/5 bg-transparent font-bold">
                                {String(hour).padStart(2, '0')}:00
                            </div>
                            {days.map((_, i) => {
                                const dayMeetings = meetings.filter(m => {
                                    const mDay = new Date(m.date).getDay();
                                    return mDay === i && parseInt(m.start) === hour;
                                });

                                return (
                                    <div key={i} className="border-r border-navy/5 border-b border-navy/5 min-h-[60px] p-1 bg-transparent group hover:bg-white/40 transition-colors">
                                        {dayMeetings.map(meeting => (
                                            <div
                                                key={meeting.id}
                                                onClick={() => onSelectMeeting(meeting)}
                                                className={`
                                                    rounded-xl p-2 text-[0.72rem] font-bold glass shadow-sm border border-white/60 cursor-pointer overflow-hidden truncate
                                                    ${meeting.role === 'dir' ? 'bg-gold/15 text-gold-dark' : meeting.role === 'teach' ? 'bg-accent-blue/15 text-accent-blue' : meeting.role === 'sup' ? 'bg-accent-orange/15 text-accent-orange' : 'bg-accent-purple/15 text-accent-purple'}
                                                    hover:shadow-premium-hover transition-all
                                                `}
                                            >
                                                {meeting.title}
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
