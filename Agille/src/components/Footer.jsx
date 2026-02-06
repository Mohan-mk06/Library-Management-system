import React from 'react';
import { BookOpen, Github, Mail, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <BookOpen className="w-6 h-6 text-primary-400" />
                            <span className="text-xl font-bold text-white">LibraryHub</span>
                        </div>
                        <p className="text-sm text-gray-400">
                            Your digital gateway to knowledge. Manage reservations, explore our catalog, and discover your next great read.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/catalog" className="hover:text-primary-400 transition-colors">Book Catalog</a></li>
                            <li><a href="/reservations" className="hover:text-primary-400 transition-colors">My Reservations</a></li>
                            <li><a href="/profile" className="hover:text-primary-400 transition-colors">Profile</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">FAQs</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <a href="mailto:support@libraryhub.com" className="hover:text-primary-400 transition-colors">
                                    support@libraryhub.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Github className="w-4 h-4" />
                                <a href="#" className="hover:text-primary-400 transition-colors">
                                    GitHub
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-400">
                        © 2024 LibraryHub. All rights reserved.
                    </p>
                    <p className="text-sm text-gray-400 flex items-center gap-1 mt-4 md:mt-0">
                        Made with <Heart className="w-4 h-4 text-red-500" /> for book lovers
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
