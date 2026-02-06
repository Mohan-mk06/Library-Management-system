import React, { useState } from 'react';
import { mockBooks } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useReservations } from '../context/ReservationContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { Calendar, BookOpen, AlertCircle } from 'lucide-react';

const MyReservations = () => {
    const { user } = useAuth();
    const { getUserReservations, cancelReservation } = useReservations();
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [cancelling, setCancelling] = useState(false);

    // Filter reservations for current user
    const userReservations = getUserReservations(user?.id);

    const handleCancelClick = (reservation) => {
        setSelectedReservation(reservation);
        setShowCancelModal(true);
    };

    const handleCancelConfirm = () => {
        setCancelling(true);
        setTimeout(() => {
            cancelReservation(selectedReservation.id);
            setCancelling(false);
            setShowCancelModal(false);
            setSelectedReservation(null);
        }, 1000);
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'active':
                return 'active';
            case 'overdue':
                return 'overdue';
            case 'returned':
                return 'returned';
            default:
                return 'default';
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-1">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-bold mb-4">My Reservations</h1>
                        <p className="text-xl text-primary-100">Track and manage your book reservations</p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {userReservations.length > 0 ? (
                        <div className="glass-effect rounded-xl overflow-hidden">
                            {/* Desktop Table */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Book Title</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Reservation Date</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Due Date</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {userReservations.map((reservation) => (
                                            <tr key={reservation.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <BookOpen className="w-5 h-5 text-primary-600" />
                                                        <span className="font-medium text-gray-900">{reservation.bookTitle}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-700">
                                                    {new Date(reservation.reservationDate).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-gray-700">
                                                    {new Date(reservation.dueDate).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge variant={getStatusVariant(reservation.status)}>
                                                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {reservation.status === 'active' && (
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() => handleCancelClick(reservation)}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    )}
                                                    {reservation.status === 'overdue' && (
                                                        <span className="text-sm text-red-600 font-medium">Please return</span>
                                                    )}
                                                    {reservation.status === 'returned' && (
                                                        <span className="text-sm text-gray-500">Completed</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="md:hidden divide-y divide-gray-200">
                                {userReservations.map((reservation) => (
                                    <div key={reservation.id} className="p-6 space-y-3">
                                        <div className="flex items-start justify-between">
                                            <h3 className="font-semibold text-gray-900">{reservation.bookTitle}</h3>
                                            <Badge variant={getStatusVariant(reservation.status)}>
                                                {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                                            </Badge>
                                        </div>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>Reserved: {new Date(reservation.reservationDate).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>Due: {new Date(reservation.dueDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        {reservation.status === 'active' && (
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                className="w-full"
                                                onClick={() => handleCancelClick(reservation)}
                                            >
                                                Cancel Reservation
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-16 glass-effect rounded-xl">
                            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No reservations yet</h3>
                            <p className="text-gray-500 mb-6">Start exploring our catalog to reserve books</p>
                            <Button variant="primary" onClick={() => window.location.href = '/catalog'}>
                                Browse Catalog
                            </Button>
                        </div>
                    )}
                </div>
            </main>

            {/* Cancel Confirmation Modal */}
            <Modal
                isOpen={showCancelModal}
                onClose={() => setShowCancelModal(false)}
                title="Cancel Reservation"
            >
                <div className="space-y-4">
                    <div className="flex items-start gap-3 bg-yellow-50 p-4 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-yellow-900">
                            Are you sure you want to cancel your reservation for <span className="font-semibold">"{selectedReservation?.bookTitle}"</span>?
                        </p>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setShowCancelModal(false)}
                        >
                            Keep Reservation
                        </Button>
                        <Button
                            variant="danger"
                            className="flex-1"
                            onClick={handleCancelConfirm}
                            loading={cancelling}
                        >
                            Cancel Reservation
                        </Button>
                    </div>
                </div>
            </Modal>

            <Footer />
        </div>
    );
};

export default MyReservations;
