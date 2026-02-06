import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useReservations } from '../context/ReservationContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { User, Mail, UserCircle, BookOpen, Calendar } from 'lucide-react';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const { getUserReservations } = useReservations();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || ''
    });
    const [saving, setSaving] = useState(false);

    const userReservations = getUserReservations(user?.id);
    const activeReservations = userReservations.filter((r) => r.status === 'active');

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            updateProfile(formData);
            setIsEditing(false);
            setSaving(false);
        }, 500);
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            email: user?.email || ''
        });
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-1">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-bold mb-4">My Profile</h1>
                        <p className="text-xl text-primary-100">Manage your account information</p>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Profile Card */}
                        <div className="lg:col-span-1">
                            <div className="glass-effect rounded-xl p-6 text-center">
                                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <User className="w-12 h-12 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">{user?.name}</h2>
                                <Badge variant="default" className="mb-4">
                                    {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                                </Badge>
                                <p className="text-gray-600 text-sm">{user?.email}</p>
                            </div>

                            {/* Stats Card */}
                            <div className="glass-effect rounded-xl p-6 mt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Active Reservations</span>
                                        <span className="font-bold text-primary-600">{activeReservations.length}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Total Reservations</span>
                                        <span className="font-bold text-primary-600">{userReservations.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Information */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Edit Profile */}
                            <div className="glass-effect rounded-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-gray-900">Profile Information</h3>
                                    {!isEditing && (
                                        <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                                            Edit Profile
                                        </Button>
                                    )}
                                </div>

                                {isEditing ? (
                                    <div className="space-y-4">
                                        <Input
                                            label="Full Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                        <Input
                                            label="Email Address"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                        <div className="flex gap-3 pt-4">
                                            <Button variant="outline" className="flex-1" onClick={handleCancel}>
                                                Cancel
                                            </Button>
                                            <Button variant="primary" className="flex-1" onClick={handleSave} loading={saving}>
                                                Save Changes
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600">Full Name</label>
                                            <p className="text-lg text-gray-900 mt-1">{user?.name}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600">Email Address</label>
                                            <p className="text-lg text-gray-900 mt-1">{user?.email}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600">Role</label>
                                            <p className="text-lg text-gray-900 mt-1 capitalize">{user?.role}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Reservation History */}
                            <div className="glass-effect rounded-xl p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Reservations</h3>
                                {userReservations.length > 0 ? (
                                    <div className="space-y-4">
                                        {userReservations.slice(0, 5).map((reservation) => (
                                            <div
                                                key={reservation.id}
                                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <BookOpen className="w-5 h-5 text-primary-600" />
                                                    <div>
                                                        <p className="font-medium text-gray-900">{reservation.bookTitle}</p>
                                                        <p className="text-sm text-gray-600">
                                                            Due: {new Date(reservation.dueDate).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Badge variant={reservation.status === 'active' ? 'active' : reservation.status === 'overdue' ? 'overdue' : 'returned'}>
                                                    {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-8">No reservation history</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Profile;
