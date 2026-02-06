import React from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { BookOpen } from 'lucide-react';

const BookCard = ({ book }) => {
    const navigate = useNavigate();

    return (
        <div className="glass-effect rounded-xl overflow-hidden card-hover">
            {/* Book Cover */}
            <div className="relative h-64 bg-gradient-to-br from-primary-100 to-secondary-100 overflow-hidden">
                <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                    <Badge variant={book.available ? 'available' : 'reserved'}>
                        {book.available ? 'Available' : 'Reserved'}
                    </Badge>
                </div>
            </div>

            {/* Book Info */}
            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {book.title}
                </h3>
                <p className="text-gray-600 mb-1">by {book.author}</p>
                <p className="text-sm text-gray-500 mb-3">{book.genre}</p>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>Published: {book.publishedYear}</span>
                    <span>{book.availableCopies}/{book.totalCopies} available</span>
                </div>

                <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => navigate(`/book/${book.id}`)}
                >
                    <BookOpen className="w-4 h-4 inline mr-2" />
                    View Details
                </Button>
            </div>
        </div>
    );
};

export default BookCard;
