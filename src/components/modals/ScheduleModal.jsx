import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';

export default function ScheduleModal({ isOpen, onClose, onSave, meeting }) {
    const [formData, setFormData] = useState({
        title: '',
        role: 'dir',
        date: new Date().toISOString().split('T')[0],
        start: '09:00',
        end: '10:00',
        location: '',
        participants: '',
        notes: '',
        recur: 'none',
        color: 'blue'
    });

    useEffect(() => {
        if (isOpen) {
            if (meeting) {
                setFormData(meeting);
            } else {
                setFormData({
                    title: '',
                    role: 'dir',
                    date: new Date().toISOString().split('T')[0],
                    start: '09:00',
                    end: '10:00',
                    location: '',
                    participants: '',
                    notes: '',
                    recur: 'none',
                    color: 'blue'
                });
            }
        }
    }, [isOpen, meeting]);

    const handleSave = () => {
        onSave({
            ...formData,
            status: meeting ? meeting.status : 'pending',
            outlook: meeting ? meeting.outlook : false
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={meeting ? "Edit Session" : "Schedule Meeting"}
            actions={
                <button
                    onClick={handleSave}
                    className="bg-navy text-white border-none rounded-xl px-6 py-2.5 text-[0.8rem] font-bold shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 transition-all"
                >
                    {meeting ? "Update Session" : "Save Session"}
                </button>
            }
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-[0.64rem] font-mono text-navy/30 uppercase tracking-[2px] mb-1.5 font-bold">Meeting Title</label>
                    <input
                        type="text"
                        className="w-full bg-navy/5 border border-navy/5 rounded-xl p-3 text-[0.85rem] focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/10 transition-all font-medium text-navy placeholder:text-navy/20"
                        placeholder="e.g., Research Grant Review"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-[0.64rem] font-mono text-navy/30 uppercase tracking-[2px] mb-1.5 font-bold">Role Category</label>
                    <select
                        className="w-full bg-navy/5 border border-navy/5 rounded-xl p-3 text-[0.85rem] focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/10 transition-all font-bold text-navy appearance-none"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                        <option value="dir">🏛 Directorate / Research & Innovation</option>
                        <option value="teach">📚 Teaching</option>
                        <option value="sup">🎓 Masters Supervision</option>
                        <option value="admin">📋 Administrative</option>
                    </select>
                </div>
                <div>
                    <label className="block text-[0.64rem] font-mono text-navy/30 uppercase tracking-[2px] mb-1.5 font-bold">Event Color</label>
                    <div className="flex gap-3">
                        {['blue', 'purple', 'yellow'].map(c => (
                            <button
                                key={c}
                                type="button"
                                onClick={() => setFormData({ ...formData, color: c })}
                                className={`w-8 h-8 rounded-full transition-all ${formData.color === c ? 'scale-110 ring-2 ring-offset-2 ring-navy shadow-md' : 'border-2 border-transparent hover:scale-105'
                                    } ${c === 'blue' ? 'bg-blue-400' : c === 'purple' ? 'bg-purple-400' : 'bg-yellow-400'}`}
                            />
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-[0.64rem] font-mono text-navy/30 uppercase tracking-[2px] mb-1.5 font-bold">Date</label>
                        <input
                            type="date"
                            className="w-full bg-navy/5 border border-navy/5 rounded-xl p-3 text-[0.85rem] focus:outline-none focus:border-gold transition-all font-bold text-navy"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-[0.64rem] font-mono text-navy/30 uppercase tracking-[2px] mb-1.5 font-bold">Start</label>
                        <input
                            type="time"
                            className="w-full bg-navy/5 border border-navy/5 rounded-xl p-3 text-[0.85rem] focus:outline-none focus:border-gold transition-all font-bold text-navy"
                            value={formData.start}
                            onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-[0.64rem] font-mono text-navy/30 uppercase tracking-[2px] mb-1.5 font-bold">End</label>
                        <input
                            type="time"
                            className="w-full bg-navy/5 border border-navy/5 rounded-xl p-3 text-[0.85rem] focus:outline-none focus:border-gold transition-all font-bold text-navy"
                            value={formData.end}
                            onChange={(e) => setFormData({ ...formData, end: e.target.value })}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-[0.64rem] font-mono text-navy/30 uppercase tracking-[2px] mb-1.5 font-bold">Notes / Agenda</label>
                    <textarea
                        rows="3"
                        className="w-full bg-navy/5 border border-navy/5 rounded-xl p-3 text-[0.85rem] focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/10 transition-all font-medium text-navy placeholder:text-navy/20 italic"
                        placeholder="Agenda or notes..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                </div>
            </div>
        </Modal>
    );
}
