import React, { useState } from 'react';
import LeftSidebar from '../components/layout/LeftSidebar';
import RightPanel from '../components/layout/RightPanel';
import DayView from '../components/views/DayView';
import WeekView from '../components/views/WeekView';
import ScheduleModal from '../components/modals/ScheduleModal';
import { useMeetings } from '../hooks/useMeetings';

export default function Dashboard() {
    const {
        meetings,
        filteredMeetings,
        activeRole,
        toggleRole,
        viewDate,
        setViewDate,
        setStatus,
        addMeeting,
        updateMeeting,
        alerts,
        hasConflict
    } = useMeetings();

    const [currentView, setCurrentView] = useState('day');
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMeeting, setEditingMeeting] = useState(null);
    const [showMobilePanel, setShowMobilePanel] = useState(false);

    const urgentAlertsCount = alerts.filter(a => a.urgent).length;

    const handleSelectMeeting = (m) => {
        setSelectedMeeting(m);
        setShowMobilePanel(true);
    };

    const handleClosePanel = () => {
        setShowMobilePanel(false);
        // Delay clearing selection so animation plays nicely
        setTimeout(() => setSelectedMeeting(null), 300);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-ivory text-navy font-sans relative">
            {/* Left Column: Navigation & Filters */}
            <LeftSidebar
                activeRole={activeRole}
                onToggleRole={toggleRole}
                viewDate={viewDate}
            />

            {/* Center Column: Main Workspace */}
            <main className="flex-1 flex flex-col min-w-0 relative z-10 transition-all duration-300 pb-[72px] md:pb-0">
                {/* Simplified Header */}
                <header className="glass px-4 md:px-8 h-[72px] flex items-center justify-between border-b border-navy/5 shrink-0 z-20">
                    <div className="flex bg-navy/5 p-1 rounded-xl border border-navy/5">
                        <button
                            onClick={() => setCurrentView('day')}
                            className={`px-5 py-2 rounded-lg text-[0.74rem] cursor-pointer font-bold transition-all shadow-sm ${currentView === 'day' ? 'bg-white text-navy shadow-premium' : 'text-navy/40 hover:text-navy/60 bg-transparent border-none shadow-none'}`}
                        >
                            Day
                        </button>
                        <button
                            onClick={() => setCurrentView('week')}
                            className={`px-5 py-2 rounded-lg text-[0.74rem] cursor-pointer font-bold transition-all shadow-sm ${currentView === 'week' ? 'bg-white text-navy shadow-premium' : 'text-navy/40 hover:text-navy/60 bg-transparent border-none shadow-none'}`}
                        >
                            Week
                        </button>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <button
                            onClick={() => {
                                setSelectedMeeting(null);
                                setShowMobilePanel(true);
                            }}
                            className="md:hidden bg-white border border-navy/5 w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer shadow-sm hover:border-gold hover:text-gold transition-all relative"
                        >
                            <span className="text-xl">📋</span>
                        </button>
                        <button
                            onClick={() => setIsNotifOpen(!isNotifOpen)}
                            className="bg-white border border-navy/5 w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer shadow-sm hover:border-gold hover:text-gold transition-all relative group"
                        >
                            <span className="text-xl grayscale group-hover:grayscale-0 transition-all duration-300">🔔</span>
                            {urgentAlertsCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-accent-orange text-white text-[0.6rem] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-pulse-subtle">
                                    {urgentAlertsCount}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => {
                                setEditingMeeting(null);
                                setIsModalOpen(true);
                            }}
                            className="bg-gold text-navy-light border-none rounded-xl px-5 py-2.5 text-[0.75rem] font-bold shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 transition-all"
                        >
                            + Schedule
                        </button>
                    </div>
                </header>

                {/* Calendar View */}
                <div className="flex-1 overflow-hidden flex flex-col relative z-0">
                    {currentView === 'day' ? (
                        <DayView
                            meetings={filteredMeetings}
                            viewDate={viewDate}
                            onSelectMeeting={handleSelectMeeting}
                        />
                    ) : (
                        <WeekView
                            meetings={filteredMeetings}
                            onSelectMeeting={handleSelectMeeting}
                        />
                    )}
                </div>

                {/* Overlay Notifications Panel */}
                {isNotifOpen && (
                    <div className="absolute top-[80px] right-8 bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl w-[360px] max-h-[calc(100vh-100px)] shadow-premium z-50 transition-all overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-4">
                        <div className="px-5 py-4 border-b border-navy/5 flex justify-between items-center bg-navy/5 shrink-0">
                            <h3 className="font-mono text-[0.68rem] text-navy font-bold uppercase tracking-[2px]">Notifications</h3>
                            <button onClick={() => setIsNotifOpen(false)} className="text-navy/40 hover:text-navy transition-colors bg-transparent border-none cursor-pointer">✕</button>
                        </div>
                        <div className="p-4 overflow-y-auto flex flex-col gap-3">
                            {alerts.length === 0 ? (
                                <div className="text-center py-6 text-navy/30 text-[0.8rem] font-medium italic">No new alerts.</div>
                            ) : (
                                alerts.map(alert => (
                                    <div
                                        key={alert.id}
                                        className={`${alert.urgent ? 'bg-accent-orange/15 border-accent-orange/20 text-accent-orange' : 'bg-white border-navy/5 text-navy/70'} border rounded-xl p-4 text-[0.8rem] font-medium leading-relaxed shadow-sm`}
                                    >
                                        <div className="flex gap-3">
                                            <span className="shrink-0">{alert.urgent ? '⚠️' : 'ℹ️'}</span>
                                            <span>{alert.msg}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </main>

            {/* Right Column: Context Panel */}
            <RightPanel
                selectedMeeting={selectedMeeting}
                onStatusChange={setStatus}
                hasConflict={selectedMeeting ? hasConflict(selectedMeeting, filteredMeetings) : false}
                upcomingMeetings={filteredMeetings.filter(m => m.status === 'pending')}
                onSelectMeeting={handleSelectMeeting}
                onEditMeeting={() => {
                    setEditingMeeting(selectedMeeting);
                    setIsModalOpen(true);
                }}
                showMobilePanel={showMobilePanel}
                onCloseMobilePanel={handleClosePanel}
            />

            {/* Modals */}
            <ScheduleModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingMeeting(null);
                }}
                onSave={(m) => {
                    if (editingMeeting) {
                        updateMeeting(editingMeeting.id, m);
                    } else {
                        addMeeting(m);
                    }
                    setIsModalOpen(false);
                    setEditingMeeting(null);
                }}
                meeting={editingMeeting}
            />
        </div>
    );
}
