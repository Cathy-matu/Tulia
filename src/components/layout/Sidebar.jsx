import React from 'react';
import { ROLES } from '../../constants/initialData';

export default function Sidebar({ meetings, onSelectMeeting, selectedMeetingId, onAddMeeting }) {
    const now = new Date().toISOString().split('T')[0];

    const sections = [
        { label: 'Today', items: meetings.filter(m => m.date === now).sort((a, b) => a.start.localeCompare(b.start)) },
        { label: 'Upcoming', items: meetings.filter(m => m.date > now).sort((a, b) => a.date.localeCompare(b.date) || a.start.localeCompare(b.start)) },
        { label: 'Past', items: meetings.filter(m => m.date < now).sort((a, b) => b.date.localeCompare(a.date)), dimmed: true }
    ];

    return (
        <aside className="w-[300px] border-r border-navy/5 flex flex-col glass overflow-hidden shrink-0">
            <div className="p-5 pb-4 border-b border-navy/5 flex justify-between items-center">
                <h3 className="text-[0.68rem] font-mono text-navy/40 uppercase tracking-[1.5px] font-bold">Agenda</h3>
                <button
                    onClick={onAddMeeting}
                    className="bg-navy text-white border-none rounded-lg px-3 py-1.5 text-[0.7rem] font-bold shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 transition-all"
                >
                    + New
                </button>
            </div>

            <div className="overflow-y-auto flex-1 p-3 space-y-4">
                {sections.some(s => s.items.length > 0) ? sections.map(section => (
                    section.items.length > 0 && (
                        <div key={section.label} className="space-y-2">
                            <div className={`text-[0.62rem] font-mono text-navy/30 uppercase tracking-[2px] px-2 font-bold ${section.dimmed ? 'opacity-40' : ''}`}>
                                {section.label}
                            </div>
                            {section.items.map(meeting => (
                                <MeetingCard
                                    key={meeting.id}
                                    meeting={meeting}
                                    isActive={selectedMeetingId === meeting.id}
                                    onClick={() => onSelectMeeting(meeting)}
                                />
                            ))}
                        </div>
                    )
                )) : (
                    <div className="p-8 text-center text-navy/30 text-[0.75rem] italic font-medium">No schedule for selected roles</div>
                )}
            </div>
        </aside>
    );
}

function MeetingCard({ meeting, isActive, onClick }) {
    const role = ROLES[meeting.role];
    const isDone = meeting.status === 'done';
    const isMissed = meeting.status === 'missed';

    return (
        <div
            onClick={onClick}
            className={`
        relative glass border-[1.5px] border-white/60 rounded-2xl p-4 mb-3 cursor-pointer transition-all overflow-hidden shadow-sm hover:shadow-premium-hover hover:-translate-y-0.5 group
        before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:rounded-l-2xl
        ${isActive ? 'border-gold bg-white shadow-premium z-10 scale-[1.02]' : 'hover:border-navy/10'}
        ${isDone ? 'opacity-50 grayscale-[0.3]' : ''}
        ${role.className === 'dir' ? 'before:bg-gold' : ''}
        ${role.className === 'teach' ? 'before:bg-accent-blue' : ''}
        ${role.className === 'sup' ? 'before:bg-accent-orange' : ''}
        ${role.className === 'admin' ? 'before:bg-accent-purple' : ''}
      `}
        >
            <div className="flex justify-between items-start gap-2">
                <div className="flex-1">
                    <div className={`text-[0.88rem] font-bold mb-1 leading-tight text-navy ${isDone ? 'line-through text-navy/40' : ''}`}>
                        {meeting.title}
                    </div>
                    <div className="text-[0.7rem] text-navy/40 font-mono font-medium flex items-center gap-2">
                        <span>🕒 {meeting.start}–{meeting.end}</span>
                        {meeting.location && <span>📍 {meeting.location}</span>}
                    </div>
                </div>
                <div className="flex gap-1 shrink-0">
                    <div className={`w-6 h-6 rounded-full border-[1.5px] border-border bg-surface-2 flex items-center justify-center text-[0.62rem] transition-all hover:scale-115 ${isDone ? 'bg-done-bg border-done text-done' : ''}`}>
                        ✓
                    </div>
                    <div className={`w-6 h-6 rounded-full border-[1.5px] border-border bg-surface-2 flex items-center justify-center text-[0.62rem] transition-all hover:scale-115 ${isMissed ? 'bg-conflict-bg border-conflict text-conflict' : ''}`}>
                        ✕
                    </div>
                </div>
            </div>

            <div className="flex gap-1.5 mt-3 flex-wrap items-center">
                <span className={`text-[0.58rem] px-2.5 py-0.5 rounded-lg font-bold uppercase tracking-[0.8px] border-none shadow-sm ${role.className === 'dir' ? 'bg-gold/15 text-gold-dark' : role.className === 'teach' ? 'bg-accent-blue/15 text-accent-blue' : role.className === 'sup' ? 'bg-accent-orange/15 text-accent-orange' : 'bg-accent-purple/15 text-accent-purple'}`}>
                    {role.label}
                </span>
                {meeting.recur !== 'none' && <span className="text-[0.58rem] px-2 py-0.5 rounded-lg font-bold uppercase tracking-[0.5px] bg-navy/5 text-navy/40 border-none shadow-sm shrink-0">↻ {meeting.recur}</span>}
                {isDone && <span className="text-[0.58rem] px-2 py-0.5 rounded-lg font-bold uppercase tracking-[0.5px] bg-accent-green/15 text-accent-green border-none shadow-sm shrink-0">✓ Done</span>}
            </div>
        </div>
    );
}
