import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { genres } from '../data/mockData';
import { useReservations } from '../context/ReservationContext';
import BookCard from '../components/BookCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BookCatalog = () => {
    const { books } = useReservations();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('All Genres');
    const [availabilityFilter, setAvailabilityFilter] = useState('all');

    // Filter books based on search and filters
    const filteredBooks = books.filter((book) => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre = selectedGenre === 'All Genres' || book.genre === selectedGenre;
        const matchesAvailability = availabilityFilter === 'all' ||
            (availabilityFilter === 'available' && book.available) ||
            (availabilityFilter === 'reserved' && !book.available);

        return matchesSearch && matchesGenre && matchesAvailability;
    });

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-1">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-bold mb-4">Book Catalog</h1>
                        <p className="text-xl text-primary-100">Discover your next great read from our collection</p>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="glass-effect rounded-xl p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Search Bar */}
                            <div className="md:col-span-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search by title or author..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                    />
                                </div>
                            </div>

                            {/* Genre Filter */}
                            <div>
                                <select
                                    value={selectedGenre}
                                    onChange={(e) => setSelectedGenre(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                >
                                    {genres.map((genre) => (
                                        <option key={genre} value={genre}>
                                            {genre}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Availability Filter */}
                            <div>
                                <select
                                    value={availabilityFilter}
                                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                >
                                    <option value="all">All Books</option>
                                    <option value="available">Available Only</option>
                                    <option value="reserved">Reserved Only</option>
                                </select>
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="mt-4 text-gray-600">
                            Showing <span className="font-semibold text-primary-700">{filteredBooks.length}</span> books
                        </div>
                    </div>

                    {/* Books Grid */}
                    {filteredBooks.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredBooks.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                                <Search className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No books found</h3>
                            <p className="text-gray-500">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BookCatalog;
