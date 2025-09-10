
'use client';
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/sidebar';
import DonorSidebar from '../components/DonorSidebar';
// import { Bar, Pie } from 'react-chartjs-2';

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

const concerts = [
    { id: 1, name: 'Spring Gala', attendees: 1257, donations: 2341 },
    { id: 2, name: 'Summer Jam', attendees: 579, donations: 295 },
    { id: 3, name: 'Winter Fest', attendees: 2874, donations: 1983 },
];

const donorLists = {
    1: ['Alice Smith', 'Bob Johnson', 'Carol Lee'],
    2: ['David Kim', 'Eva Brown'],
    3: ['Frank White', 'Grace Green', 'Helen Black'],
};

export default function ViewEventsPage() {
    const [selectedConcert, setSelectedConcert] = useState(concerts[0]);
    const [showDonorSidebar, setShowDonorSidebar] = useState(false);

    const barData = {
        labels: ['Attendees', 'Donations'],
        datasets: [
            {
                label: selectedConcert.name,
                data: [selectedConcert.attendees, selectedConcert.donations],
                backgroundColor: ['#36a2eb', '#ff6384'],
            },
        ],
    };

    const pieData = {
        labels: ['Attendees', 'Donations'],
        datasets: [
            {
                data: [selectedConcert.attendees, selectedConcert.donations],
                backgroundColor: ['#36a2eb', '#ff6384'],
            },
        ],
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                <Sidebar
                    items={concerts.map(c => ({ id: c.id, label: c.name }))}
                    onSelect={id => setSelectedConcert(concerts.find(c => c.id === id))}
                    selectedId={selectedConcert.id}
                />
                <main className="flex-1 p-8">
                    
                    <h1 className="text-2xl font-bold mb-4">{selectedConcert.name}</h1>
                    <div>
                        <h3 className="text-md font-semibold">Helpful Info</h3>
                        <ul className="list-disc ml-6">
                            <li>Total Attendees: {selectedConcert.attendees}</li>
                            <li>Total Donations: ${selectedConcert.donations}</li>
                            <li>Donor Count: {donorLists[selectedConcert.id].length}</li>
                        </ul>
                        {showDonorSidebar && (
                    <DonorSidebar
                        donors={donorLists[selectedConcert.id]}
                        onClose={() => setShowDonorSidebar(false)}
                    />
                )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Concert Stats</h2>
                            {/* <Bar data={barData} /> */}
                            <div className="h-64 bg-gray-200 flex items-center justify-center">
                                Chart placeholder
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Attendees vs Donations</h2>
                            {/* <Pie data={pieData} /> */}
                            <div className="h-64 bg-gray-200 flex items-center justify-center">
                                Chart placeholder
                            </div>
                        </div>
                    </div>
                    <div className="mb-4" style={{textAlign: 'center', display: 'flex', justifyContent: 'center'}}>
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                            onClick={() => setShowDonorSidebar(true)}
                        >
                            View Donor List
                        </button>
                    </div>
                    
                </main>
                
            </div>
        </div>
    );
}