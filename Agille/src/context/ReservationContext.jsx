import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockReservations as initialReservations, mockBooks as initialBooks } from '../data/mockData';

const ReservationContext = createContext(null);

export const useReservations = () => {
    const context = useContext(ReservationContext);
    if (!context) {
        throw new Error('useReservations must be used within a ReservationProvider');
    }
    return context;
};

export const ReservationProvider = ({ children }) => {
    const [reservations, setReservations] = useState([]);
    const [books, setBooks] = useState([]);
    const [notifications, setNotifications] = useState([]);

    // Load data from localStorage on mount
    useEffect(() => {
        const storedReservations = localStorage.getItem('library_reservations');
        const storedBooks = localStorage.getItem('library_books');
        const storedNotifications = localStorage.getItem('library_notifications');

        if (storedReservations) {
            setReservations(JSON.parse(storedReservations));
        } else {
            setReservations(initialReservations);
            localStorage.setItem('library_reservations', JSON.stringify(initialReservations));
        }

        if (storedBooks) {
            setBooks(JSON.parse(storedBooks));
        } else {
            setBooks(initialBooks);
            localStorage.setItem('library_books', JSON.stringify(initialBooks));
        }

        if (storedNotifications) {
            setNotifications(JSON.parse(storedNotifications));
        } else {
            setNotifications([]);
        }
    }, []);

    // Reserve a book
    const reserveBook = (userId, bookId, bookTitle) => {
        // Create new reservation
        const newReservation = {
            id: reservations.length + 1,
            userId,
            bookId,
            bookTitle,
            reservationDate: new Date().toISOString().split('T')[0],
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
            status: 'active',
            returnDate: null
        };

        const updatedReservations = [...reservations, newReservation];
        setReservations(updatedReservations);
        localStorage.setItem('library_reservations', JSON.stringify(updatedReservations));

        // Update book availability
        const updatedBooks = books.map(book => {
            if (book.id === bookId) {
                const newAvailableCopies = book.availableCopies - 1;
                return {
                    ...book,
                    availableCopies: newAvailableCopies,
                    available: newAvailableCopies > 0
                };
            }
            return book;
        });

        setBooks(updatedBooks);
        localStorage.setItem('library_books', JSON.stringify(updatedBooks));

        // Add notification
        addNotification(userId, `You have successfully reserved "${bookTitle}"`, 'success');

        return { success: true, reservation: newReservation };
    };

    // Cancel a reservation
    const cancelReservation = (reservationId) => {
        const reservation = reservations.find(r => r.id === reservationId);
        if (!reservation) return { success: false, error: 'Reservation not found' };

        // Remove reservation
        const updatedReservations = reservations.filter(r => r.id !== reservationId);
        setReservations(updatedReservations);
        localStorage.setItem('library_reservations', JSON.stringify(updatedReservations));

        // Update book availability
        const updatedBooks = books.map(book => {
            if (book.id === reservation.bookId) {
                const newAvailableCopies = book.availableCopies + 1;
                return {
                    ...book,
                    availableCopies: newAvailableCopies,
                    available: true
                };
            }
            return book;
        });

        setBooks(updatedBooks);
        localStorage.setItem('library_books', JSON.stringify(updatedBooks));

        // Add notification
        addNotification(reservation.userId, `Reservation for "${reservation.bookTitle}" has been cancelled`, 'info');

        return { success: true };
    };

    // Get reservations for a user
    const getUserReservations = (userId) => {
        return reservations.filter(r => r.userId === userId);
    };

    // Get book by ID
    const getBookById = (bookId) => {
        return books.find(b => b.id === parseInt(bookId));
    };

    // Add notification
    const addNotification = (userId, message, type = 'info') => {
        const newNotification = {
            id: notifications.length + 1,
            userId,
            message,
            type,
            read: false,
            createdAt: new Date().toISOString()
        };

        const updatedNotifications = [...notifications, newNotification];
        setNotifications(updatedNotifications);
        localStorage.setItem('library_notifications', JSON.stringify(updatedNotifications));
    };

    // Get user notifications
    const getUserNotifications = (userId) => {
        return notifications.filter(n => n.userId === userId).sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );
    };

    // Mark notification as read
    const markNotificationAsRead = (notificationId) => {
        const updatedNotifications = notifications.map(n =>
            n.id === notificationId ? { ...n, read: true } : n
        );
        setNotifications(updatedNotifications);
        localStorage.setItem('library_notifications', JSON.stringify(updatedNotifications));
    };

    // Mark all notifications as read
    const markAllAsRead = (userId) => {
        const updatedNotifications = notifications.map(n =>
            n.userId === userId ? { ...n, read: true } : n
        );
        setNotifications(updatedNotifications);
        localStorage.setItem('library_notifications', JSON.stringify(updatedNotifications));
    };

    // Clear all notifications
    const clearAllNotifications = (userId) => {
        const updatedNotifications = notifications.filter(n => n.userId !== userId);
        setNotifications(updatedNotifications);
        localStorage.setItem('library_notifications', JSON.stringify(updatedNotifications));
    };

    const value = {
        reservations,
        books,
        notifications,
        reserveBook,
        cancelReservation,
        getUserReservations,
        getBookById,
        getUserNotifications,
        markNotificationAsRead,
        markAllAsRead,
        clearAllNotifications
    };

    return (
        <ReservationContext.Provider value={value}>
            {children}
        </ReservationContext.Provider>
    );
};
