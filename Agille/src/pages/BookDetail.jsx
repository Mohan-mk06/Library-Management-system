import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useReservations } from '../context/ReservationContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { ArrowLeft, BookOpen, Calendar, Hash } from 'lucide-react';

const BookDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { getBookById, reserveBook } = useReservations();
    const [showReserveModal, setShowReserveModal] = useState(false);
    const [reserving, setReserving] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const book = getBookById(id);

    if (!book) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Book not found</h2>
                        <Button onClick={() => navigate('/catalog')}>Back to Catalog</Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const handleReserve = () => {
        setReserving(true);
        setTimeout(() => {
            const result = reserveBook(user.id, book.id, book.title);
            if (result.success) {
                setReserving(false);
                setShowReserveModal(false);
                setShowSuccessMessage(true);
                setTimeout(() => setShowSuccessMessage(false), 3000);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/catalog')}
                        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 font-medium transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Catalog
                    </button>

                    {/* Success Message */}
                    {showSuccessMessage && (
                        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg animate-fade-in">
                            ✓ Book reserved successfully! Check your reservations page.
                        </div>
                    )}

                    {/* Book Details */}
                    <div className="glass-effect rounded-2xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                            {/* Book Cover */}
                            <div>
                                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                                    <img
                                        src={book.coverImage}
                                        alt={book.title}
                                        className="w-full h-auto object-cover"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <Badge variant={book.available ? 'available' : 'reserved'} className="text-lg px-4 py-2">
                                            {book.available ? 'Available' : 'Reserved'}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Book Information */}
                            <div className="flex flex-col">
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">{book.title}</h1>
                                <p className="text-2xl text-gray-600 mb-6">by {book.author}</p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <BookOpen className="w-5 h-5 text-primary-600" />
                                        <span className="font-semibold">Genre:</span>
                                        <Badge variant="default">{book.genre}</Badge>
                                    </div>

                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Calendar className="w-5 h-5 text-primary-600" />
                                        <span className="font-semibold">Published:</span>
                                        <span>{book.publishedYear}</span>
                                    </div>

                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Hash className="w-5 h-5 text-primary-600" />
                                        <span className="font-semibold">ISBN:</span>
                                        <span className="font-mono text-sm">{book.isbn}</span>
                                    </div>

                                    <div className="flex items-center gap-3 text-gray-700">
                                        <BookOpen className="w-5 h-5 text-primary-600" />
                                        <span className="font-semibold">Availability:</span>
                                        <span>{book.availableCopies} of {book.totalCopies} copies available</span>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
                                    <p className="text-gray-700 leading-relaxed">{book.description}</p>
                                </div>

                                {/* Reserve Button */}
                                <div className="mt-auto">
                                    {book.available ? (
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            className="w-full"
                                            onClick={() => setShowReserveModal(true)}
                                        >
                                            Reserve This Book
                                        </Button>
                                    ) : (
                                        <Button variant="outline" size="lg" className="w-full" disabled>
                                            Currently Unavailable
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Reserve Confirmation Modal */}
            <Modal
                isOpen={showReserveModal}
                onClose={() => setShowReserveModal(false)}
                title="Confirm Reservation"
            >
                <div className="space-y-4">
                    <p className="text-gray-700">
                        Are you sure you want to reserve <span className="font-semibold">"{book.title}"</span>?
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-900">
                            <strong>Note:</strong> The book will be reserved for 14 days. Please collect it from the library within 2 days.
                        </p>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setShowReserveModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            className="flex-1"
                            onClick={handleReserve}
                            loading={reserving}
                        >
                            Confirm Reservation
                        </Button>
                    </div>
                </div>
            </Modal>

            <Footer />
        </div>
    );
};

export default BookDetail;
