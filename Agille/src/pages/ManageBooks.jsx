import React, { useState } from 'react';
import { mockBooks } from '../data/mockData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

const ManageBooks = () => {
    const [books, setBooks] = useState(mockBooks);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (book) => {
        setSelectedBook(book);
        setShowEditModal(true);
    };

    const handleDelete = (bookId) => {
        if (confirm('Are you sure you want to delete this book?')) {
            setBooks(books.filter((b) => b.id !== bookId));
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-1">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-bold mb-4">Manage Books</h1>
                        <p className="text-xl text-primary-100">Add, edit, or remove books from the catalog</p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Actions Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search books..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <Button variant="primary" onClick={() => setShowAddModal(true)}>
                            <Plus className="w-5 h-5 inline mr-2" />
                            Add New Book
                        </Button>
                    </div>

                    {/* Books Table */}
                    <div className="glass-effect rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Title</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Author</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Genre</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ISBN</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Copies</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredBooks.map((book) => (
                                        <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{book.title}</td>
                                            <td className="px-6 py-4 text-gray-700">{book.author}</td>
                                            <td className="px-6 py-4 text-gray-700">{book.genre}</td>
                                            <td className="px-6 py-4 text-gray-700 font-mono text-sm">{book.isbn}</td>
                                            <td className="px-6 py-4 text-gray-700">{book.availableCopies}/{book.totalCopies}</td>
                                            <td className="px-6 py-4">
                                                <Badge variant={book.available ? 'available' : 'reserved'}>
                                                    {book.available ? 'Available' : 'Reserved'}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(book)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(book.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            {/* Add Book Modal */}
            <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Book">
                <div className="space-y-4">
                    <Input label="Title" placeholder="Book title" />
                    <Input label="Author" placeholder="Author name" />
                    <Input label="Genre" placeholder="Genre" />
                    <Input label="ISBN" placeholder="ISBN number" />
                    <Input label="Total Copies" type="number" placeholder="Number of copies" />
                    <div className="flex gap-3 mt-6">
                        <Button variant="outline" className="flex-1" onClick={() => setShowAddModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" className="flex-1">
                            Add Book
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Edit Book Modal */}
            <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Book">
                <div className="space-y-4">
                    <Input label="Title" placeholder="Book title" value={selectedBook?.title} />
                    <Input label="Author" placeholder="Author name" value={selectedBook?.author} />
                    <Input label="Genre" placeholder="Genre" value={selectedBook?.genre} />
                    <Input label="ISBN" placeholder="ISBN number" value={selectedBook?.isbn} />
                    <Input label="Total Copies" type="number" value={selectedBook?.totalCopies} />
                    <div className="flex gap-3 mt-6">
                        <Button variant="outline" className="flex-1" onClick={() => setShowEditModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" className="flex-1">
                            Save Changes
                        </Button>
                    </div>
                </div>
            </Modal>

            <Footer />
        </div>
    );
};

export default ManageBooks;
