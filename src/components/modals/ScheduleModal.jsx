import React, { useState } from 'react';
import Modal from '../common/Modal';

export default function ScheduleModal({ isOpen, onClose, onSave }) {
    const [formData, setFormData] = useState({
        title: '',
        role: 'dir',
        date: new Date().toISOString().split('T')[0],
        start: '09:00',
        end: '10:00',
        location: '',
        participants: '',
        notes: '',
        recur: 'none'
    });

    const handleSave = () => {
        onSave({
            ...formData,
            status: 'pending',
            outlook: false
        });

        // Reset form
        setFormData({
            title: '',
            role: 'dir',
            date: new Date().toISOString().split('T')[0],
            start: '09:00',
            end: '10:00',
            location: '',
            participants: '',
            notes: '',
            recur: 'none'
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Schedule Meeting"
            actions={
                <button
                    onClick={handleSave}
                    className="bg-navy text-white border-none rounded-xl px-6 py-2.5 text-[0.8rem] font-bold shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 transition-all"
                >
                    Save Session
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
                <div className="grid grid-cols-2 gap-4">
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
                        <label className="block text-[0.64rem] font-mono text-navy/30 uppercase tracking-[2px] mb-1.5 font-bold">Start Time</label>
                        <input
                            type="time"
                            className="w-full bg-navy/5 border border-navy/5 rounded-xl p-3 text-[0.85rem] focus:outline-none focus:border-gold transition-all font-bold text-navy"
                            value={formData.start}
                            onChange={(e) => setFormData({ ...formData, start: e.target.value })}
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
