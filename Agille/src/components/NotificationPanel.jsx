import React, { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useReservations } from '../context/ReservationContext';
import { X, Check, Info, AlertTriangle, CheckCircle } from 'lucide-react';

const NotificationPanel = ({ isOpen, onClose }) => {
    const { user } = useAuth();
    const { getUserNotifications, markNotificationAsRead, markAllAsRead, clearAllNotifications } = useReservations();
    const panelRef = useRef(null);

    const notifications = getUserNotifications(user?.id);
    const unreadCount = notifications.filter(n => !n.read).length;

    // Close panel when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
            case 'info':
                return <Info className="w-5 h-5 text-blue-500" />;
            default:
                return <Info className="w-5 h-5 text-gray-500" />;
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    return (
        <div
            ref={panelRef}
            className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 animate-fade-in"
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                    {unreadCount > 0 && (
                        <p className="text-sm text-gray-600">{unreadCount} unread</p>
                    )}
                </div>
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${!notification.read ? 'bg-blue-50' : ''
                                    }`}
                                onClick={() => markNotificationAsRead(notification.id)}
                            >
                                <div className="flex items-start gap-3">
                                    {getNotificationIcon(notification.type)}
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm ${!notification.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                                            {notification.message}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {formatTime(notification.createdAt)}
                                        </p>
                                    </div>
                                    {!notification.read && (
                                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center">
                        <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                            <Info className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-600 font-medium">No notifications</p>
                        <p className="text-sm text-gray-500 mt-1">You're all caught up!</p>
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            {notifications.length > 0 && (
                <div className="p-3 border-t border-gray-200 flex gap-2">
                    {unreadCount > 0 && (
                        <button
                            onClick={() => markAllAsRead(user?.id)}
                            className="flex-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                        >
                            <Check className="w-4 h-4 inline mr-1" />
                            Mark all read
                        </button>
                    )}
                    <button
                        onClick={() => {
                            clearAllNotifications(user?.id);
                            onClose();
                        }}
                        className="flex-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                    >
                        <X className="w-4 h-4 inline mr-1" />
                        Clear all
                    </button>
                </div>
            )}
        </div>
    );
};

export default NotificationPanel;
