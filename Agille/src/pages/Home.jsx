import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/ui/Button';
import { BookOpen, Search, Clock, Shield } from 'lucide-react';

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 text-white py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
                            Welcome to LibraryHub
                        </h1>
                        <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
                            Your digital gateway to knowledge. Browse, reserve, and manage your favorite books all in one place.
                        </p>
                        {!isAuthenticated() ? (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/register">
                                    <Button variant="secondary" size="lg">
                                        Get Started
                                    </Button>
                                </Link>
                                <Link to="/login">
                                    <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white/20">
                                        Sign In
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Link to="/catalog">
                                <Button variant="secondary" size="lg">
                                    Browse Catalog
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Features Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose LibraryHub?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="glass-effect rounded-xl p-8 text-center card-hover">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Discovery</h3>
                            <p className="text-gray-600">
                                Search and filter through our extensive catalog to find exactly what you're looking for.
                            </p>
                        </div>

                        <div className="glass-effect rounded-xl p-8 text-center card-hover">
                            <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Quick Reservations</h3>
                            <p className="text-gray-600">
                                Reserve books instantly and manage your reservations from anywhere, anytime.
                            </p>
                        </div>

                        <div className="glass-effect rounded-xl p-8 text-center card-hover">
                            <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Reliable</h3>
                            <p className="text-gray-600">
                                Your data is safe with us. Enjoy a seamless and secure library experience.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                {!isAuthenticated() && (
                    <div className="bg-gradient-to-r from-secondary-600 to-primary-600 text-white py-16">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h2 className="text-3xl font-bold mb-4">Ready to Start Reading?</h2>
                            <p className="text-xl text-secondary-100 mb-8">
                                Join thousands of readers who trust LibraryHub for their reading needs.
                            </p>
                            <Link to="/register">
                                <Button variant="primary" size="lg" className="bg-white text-primary-700 hover:bg-gray-100">
                                    Create Free Account
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Home;
