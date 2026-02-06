import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Bell, User, LogOut, BookOpen, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useReservations } from '../context/ReservationContext';
import NotificationPanel from './NotificationPanel';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
    const { user, logout, isAuthenticated, isLibrarian } = useAuth();
    const { getUserNotifications } = useReservations();
    const navigate = useNavigate();

    const notifications = user ? getUserNotifications(user.id) : [];
    const unreadCount = notifications.filter(n => !n.read).length;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gradient-to-r from-primary-700 via-primary-600 to-secondary-600 text-white shadow-xl sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                        <BookOpen className="w-8 h-8" />
                        <span className="text-xl font-bold">LibraryHub</span>
                    </Link>

                    {/* Desktop Navigation */}
                    {isAuthenticated() && (
                        <div className="hidden md:flex items-center space-x-6">
                            <Link to="/" className="hover:text-primary-100 transition-colors font-medium">
                                Home
                            </Link>
                            <Link to="/catalog" className="hover:text-primary-100 transition-colors font-medium">
                                Catalog
                            </Link>
                            <Link to="/reservations" className="hover:text-primary-100 transition-colors font-medium">
                                My Reservations
                            </Link>
                            {isLibrarian() && (
                                <>
                                    <Link to="/admin" className="hover:text-primary-100 transition-colors font-medium flex items-center gap-1">
                                        <LayoutDashboard className="w-4 h-4" />
                                        Dashboard
                                    </Link>
                                    <Link to="/reports" className="hover:text-primary-100 transition-colors font-medium">
                                        Reports
                                    </Link>
                                </>
                            )}

                            {/* Notification Bell */}
                            <div className="relative">
                                <button
                                    onClick={() => setNotificationPanelOpen(!notificationPanelOpen)}
                                    className="relative hover:text-primary-100 transition-colors"
                                >
                                    <Bell className="w-6 h-6" />
                                    {unreadCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {unreadCount > 9 ? '9+' : unreadCount}
                                        </span>
                                    )}
                                </button>
                                <NotificationPanel
                                    isOpen={notificationPanelOpen}
                                    onClose={() => setNotificationPanelOpen(false)}
                                />
                            </div>
                            {/* User Menu */}
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center space-x-2 hover:text-primary-100 transition-colors"
                                >
                                    <User className="w-6 h-6" />
                                    <span className="font-medium">{user?.name}</span>
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 animate-fade-in">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-gray-800 hover:bg-primary-50 transition-colors"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-gray-800 hover:bg-red-50 transition-colors flex items-center gap-2"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {!isAuthenticated() && (
                        <div className="hidden md:flex items-center space-x-4">
                            <Link to="/login" className="hover:text-primary-100 transition-colors font-medium">
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-white text-primary-700 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                            >
                                Register
                            </Link>
                        </div>
                    )}

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 hover:bg-primary-800 rounded-lg transition-colors"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-primary-800 px-4 py-4 space-y-2 animate-fade-in">
                    {isAuthenticated() ? (
                        <>
                            <Link
                                to="/"
                                className="block py-2 hover:text-primary-100 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                to="/catalog"
                                className="block py-2 hover:text-primary-100 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Catalog
                            </Link>
                            <Link
                                to="/reservations"
                                className="block py-2 hover:text-primary-100 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                My Reservations
                            </Link>
                            {isLibrarian() && (
                                <>
                                    <Link
                                        to="/admin"
                                        className="block py-2 hover:text-primary-100 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        to="/reports"
                                        className="block py-2 hover:text-primary-100 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Reports
                                    </Link>
                                </>
                            )}
                            <Link
                                to="/profile"
                                className="block py-2 hover:text-primary-100 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left py-2 hover:text-primary-100 transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="block py-2 hover:text-primary-100 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="block py-2 hover:text-primary-100 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
