import { useState, useMemo } from 'react';
import { INITIAL_MEETINGS } from '../constants/initialData';

export function useMeetings() {
    const [meetings, setMeetings] = useState(INITIAL_MEETINGS);
    const [activeRole, setActiveRole] = useState(null);
    const [viewDate, setViewDate] = useState(new Date().toISOString().split('T')[0]);

    const toggleRole = (role) => {
        setActiveRole(prev => prev === role ? null : role);
    };

    const filteredMeetings = useMemo(() => {
        return meetings.filter(m => !activeRole || activeRole === m.role);
    }, [meetings, activeRole]);

    const setStatus = (id, status) => {
        setMeetings(prev => prev.map(m =>
            m.id === id ? { ...m, status: m.status === status ? 'pending' : status } : m
        ));
    };

    const toMins = (t) => {
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
    };

    const hasConflict = (m, allMeetings) => {
        return (allMeetings || meetings).some(o => {
            if (o.id === m.id) return false;
            if (o.date !== m.date) return false;
            return toMins(m.start) < toMins(o.end) && toMins(m.end) > toMins(o.start);
        });
    };

    const getConflicts = (m, allMeetings) => {
        return (allMeetings || meetings).filter(o => {
            if (o.id === m.id) return false;
            if (o.date !== m.date) return false;
            return toMins(m.start) < toMins(o.end) && toMins(m.end) > toMins(o.start);
        });
    };

    const alerts = useMemo(() => {
        const notes = [];
        const seen = new Set();

        meetings.forEach(m => {
            if (hasConflict(m)) {
                getConflicts(m).forEach(o => {
                    const k = [Math.min(m.id, o.id), Math.max(m.id, o.id)].join('-');
                    if (!seen.has(k)) {
                        seen.add(k);
                        notes.push({
                            id: k,
                            type: 'conflict',
                            msg: `⚠️ CONFLICT: "${m.title}" overlaps with "${o.title}"`,
                            urgent: true
                        });
                    }
                });
            }
        });

        if (notes.length === 0) {
            notes.push({ id: 'ok', type: 'ok', msg: '✅ All clear — no conflicts or alerts.', urgent: false });
        }
        return notes;
    }, [meetings]);

    const addMeeting = (meeting) => {
        setMeetings(prev => [...prev, { ...meeting, id: Date.now() }]);
    };

    const updateMeeting = (id, updatedMeeting) => {
        setMeetings(prev => prev.map(m => m.id === id ? { ...m, ...updatedMeeting } : m));
    };

    return {
        meetings,
        filteredMeetings,
        activeRole,
        toggleRole,
        viewDate,
        setViewDate,
        setStatus,
        addMeeting,
        updateMeeting,
        hasConflict,
        alerts
    };
}
