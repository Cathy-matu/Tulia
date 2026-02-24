import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Toolbar from './components/layout/Toolbar';
import Sidebar from './components/layout/Sidebar';
import RightPanel from './components/layout/RightPanel';
import DayView from './components/views/DayView';
import WeekView from './components/views/WeekView';
import Modal from './components/common/Modal';
import { useMeetings } from './hooks/useMeetings';

function App() {
    const {
        meetings,
        filteredMeetings,
        activeRoles,
        toggleRole,
        viewDate,
        setViewDate,
        setStatus,
        addMeeting,
        alerts,
        hasConflict
    } = useMeetings();

    const urgentAlertsCount = alerts.filter(a => a.urgent).length;

    const [currentView, setCurrentView] = useState('day');
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
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

    const handleSaveMeeting = () => {
        addMeeting({
            ...formData,
            status: 'pending',
            outlook: false
        });
        setIsModalOpen(false);
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
        <div className="flex flex-col h-screen overflow-hidden text-navy font-sans bg-ivory">
            <Header
                onAddMeeting={() => setIsModalOpen(true)}
                onToggleNotif={() => setIsNotifOpen(!isNotifOpen)}
                alertsCount={urgentAlertsCount}
            />

            <Toolbar
                activeRoles={activeRoles}
                onToggleRole={toggleRole}
                currentView={currentView}
                onViewChange={setCurrentView}
            />

            <main className="flex-1 flex overflow-hidden relative z-0">
                <Sidebar
                    meetings={filteredMeetings}
                    selectedMeetingId={selectedMeeting?.id}
                    onSelectMeeting={setSelectedMeeting}
                    onAddMeeting={() => setIsModalOpen(true)}
                    hasConflict={(m) => hasConflict(m, filteredMeetings)}
                />

                {currentView === 'day' ? (
                    <DayView
                        meetings={filteredMeetings}
                        viewDate={viewDate}
                        onSelectMeeting={setSelectedMeeting}
                        hasConflict={(m) => hasConflict(m, filteredMeetings)}
                    />
                ) : (
                    <WeekView
                        meetings={filteredMeetings}
                        onSelectMeeting={setSelectedMeeting}
                    />
                )}

                <RightPanel
                    selectedMeeting={selectedMeeting}
                    onStatusChange={setStatus}
                    hasConflict={selectedMeeting ? hasConflict(selectedMeeting, filteredMeetings) : false}
                />
            </main>

            {/* Notifications Panel */}
            {isNotifOpen && (
                <div className="fixed top-[78px] right-8 bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl w-[320px] shadow-premium z-[400] transition-all overflow-hidden animate-in fade-in slide-in-from-top-4">
                    <div className="px-5 py-4 border-b border-navy/5 font-mono text-[0.68rem] text-navy/40 flex justify-between items-center font-bold uppercase tracking-wider">
                        <span>⚡ Alerts & Updates</span>
                        <span className="cursor-pointer hover:text-navy transition-colors text-lg" onClick={() => setIsNotifOpen(false)}>✕</span>
                    </div>
                    <div className="p-4 flex flex-col gap-3 max-h-[400px] overflow-y-auto">
                        {alerts.map(alert => (
                            <div
                                key={alert.id}
                                className={`${alert.urgent ? 'bg-accent-orange/15 border-accent-orange/20 text-accent-orange' : 'bg-navy/5 border-navy/5 text-navy/70'} border rounded-xl p-4 text-[0.78rem] font-medium leading-relaxed shadow-sm`}
                            >
                                {alert.msg}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Add Meeting Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Schedule Meeting"
                actions={
                    <button
                        onClick={handleSaveMeeting}
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
        </div>
    );
}

export default App;
