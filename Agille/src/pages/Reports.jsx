import React, { useState } from 'react';
import { mockChartData } from '../data/mockData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/ui/Button';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Calendar } from 'lucide-react';

const Reports = () => {
    const [dateRange, setDateRange] = useState('last-6-months');

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-1">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-bold mb-4">Reports & Analytics</h1>
                        <p className="text-xl text-primary-100">Insights into library usage and trends</p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Controls */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-gray-600" />
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            >
                                <option value="last-month">Last Month</option>
                                <option value="last-3-months">Last 3 Months</option>
                                <option value="last-6-months">Last 6 Months</option>
                                <option value="last-year">Last Year</option>
                            </select>
                        </div>
                        <Button variant="primary">
                            <Download className="w-5 h-5 inline mr-2" />
                            Export Report
                        </Button>
                    </div>

                    {/* Monthly Reservations Chart */}
                    <div className="glass-effect rounded-xl p-6 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Monthly Reservations</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={mockChartData.monthlyReservations}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="reservations" stroke="#0ea5e9" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Genre Distribution Chart */}
                    <div className="glass-effect rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Books by Genre</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={mockChartData.genreDistribution}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="genre" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#a855f7" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Reports;
