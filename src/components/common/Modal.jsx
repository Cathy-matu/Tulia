import React from 'react';

export default function Modal({ isOpen, onClose, title, children, actions }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/45 flex items-center justify-center z-[500] backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white border-[1.5px] border-border rounded-[18px] p-6.5 w-[520px] max-w-full max-h-[90vh] overflow-y-auto shadow-lg animate-in slide-in-from-bottom-4 duration-300">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="font-playfair text-[1.25rem] font-bold text-gray-900">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">✕</button>
                </div>

                <div className="space-y-4">
                    {children}
                </div>

                <div className="flex gap-2.5 justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border-[1.5px] border-border bg-transparent text-gray-500 font-semibold text-[0.8rem] hover:border-gray-300 hover:text-gray-700 transition-all"
                    >
                        Cancel
                    </button>
                    {actions}
                </div>
            </div>
        </div>
    );
}
