import React from 'react';
import { Link } from 'react-router-dom';
import { mockStatistics } from '../data/mockData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BookOpen, Users, Clock, AlertTriangle, TrendingUp, Package } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, subtitle, color }) => {
    return (
        <div className="glass-effect rounded-xl p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
            <p className="text-gray-600 font-medium">{title}</p>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
    );
};

const AdminDashboard = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-1">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
                        <p className="text-xl text-primary-100">Manage your library system</p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Statistics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <StatCard
                            icon={BookOpen}
                            title="Total Books"
                            value={mockStatistics.totalBooks}
                            subtitle="In catalog"
                            color="bg-gradient-to-r from-blue-500 to-blue-600"
                        />
                        <StatCard
                            icon={Package}
                            title="Available Books"
                            value={mockStatistics.availableBooks}
                            subtitle="Ready to reserve"
                            color="bg-gradient-to-r from-green-500 to-green-600"
                        />
                        <StatCard
                            icon={Clock}
                            title="Active Reservations"
                            value={mockStatistics.activeReservations}
                            subtitle="Currently borrowed"
                            color="bg-gradient-to-r from-yellow-500 to-yellow-600"
                        />
                        <StatCard
                            icon={Users}
                            title="Total Users"
                            value={mockStatistics.totalUsers}
                            subtitle="Registered members"
                            color="bg-gradient-to-r from-purple-500 to-purple-600"
                        />
                        <StatCard
                            icon={AlertTriangle}
                            title="Overdue Books"
                            value={mockStatistics.overdueBooks}
                            subtitle="Need attention"
                            color="bg-gradient-to-r from-red-500 to-red-600"
                        />
                        <StatCard
                            icon={TrendingUp}
                            title="New This Month"
                            value={mockStatistics.newBooksThisMonth}
                            subtitle="Books added"
                            color="bg-gradient-to-r from-indigo-500 to-indigo-600"
                        />
                    </div>

                    {/* Quick Actions */}
                    <div className="glass-effect rounded-xl p-6 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link
                                to="/admin/books"
                                className="p-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:shadow-xl transition-all hover:scale-105"
                            >
                                <BookOpen className="w-8 h-8 mb-3" />
                                <h3 className="text-lg font-semibold mb-1">Manage Books</h3>
                                <p className="text-sm text-primary-100">Add, edit, or remove books</p>
                            </Link>
                            <Link
                                to="/admin/users"
                                className="p-6 bg-gradient-to-r from-secondary-600 to-secondary-700 text-white rounded-xl hover:shadow-xl transition-all hover:scale-105"
                            >
                                <Users className="w-8 h-8 mb-3" />
                                <h3 className="text-lg font-semibold mb-1">Manage Users</h3>
                                <p className="text-sm text-secondary-100">View and manage user accounts</p>
                            </Link>
                            <Link
                                to="/reports"
                                className="p-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:shadow-xl transition-all hover:scale-105"
                            >
                                <TrendingUp className="w-8 h-8 mb-3" />
                                <h3 className="text-lg font-semibold mb-1">View Reports</h3>
                                <p className="text-sm text-indigo-100">Analytics and insights</p>
                            </Link>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="glass-effect rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                        <div className="space-y-4">
                            {[
                                { action: 'New reservation', user: 'John Doe', book: '1984', time: '2 hours ago' },
                                { action: 'Book returned', user: 'Jane Smith', book: 'The Great Gatsby', time: '5 hours ago' },
                                { action: 'New user registered', user: 'Mike Johnson', book: null, time: '1 day ago' },
                                { action: 'Book added', user: 'Admin', book: 'The Midnight Library', time: '2 days ago' }
                            ].map((activity, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900">{activity.action}</p>
                                        <p className="text-sm text-gray-600">
                                            {activity.user} {activity.book && `- ${activity.book}`}
                                        </p>
                                    </div>
                                    <span className="text-sm text-gray-500">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AdminDashboard;
