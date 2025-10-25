import React from 'react';

export default function DonorSidebar({ donors, onClose }) {
    return (
        <aside 
            className="bg-white shadow-lg p-6 fixed right-0 top-0 h-full z-50 flex flex-col"
            style={{
                width: "min(256px, 100vw)",
                maxWidth: "100vw",
                boxSizing: "border-box"
            }}
        >
            <button
                className="self-end mb-4 text-gray-500 hover:text-gray-800"
                onClick={onClose}
                aria-label="Close Donor List"
            >
                &times;
            </button>
            <h2 className="text-xl font-bold mb-4" style={{color:"black"}}>Donor List</h2>
            <ul className="list-disc ml-4">
                {donors.map((donor, idx) => (
                    <li key={idx} className="mb-2 text-gray-700">{donor}</li>
                ))}
            </ul>
        </aside>
    );
}
