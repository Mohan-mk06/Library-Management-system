import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateLoginForm } from '../utils/validation';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { BookOpen, Mail, Lock } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');

        // Validate form
        const validationErrors = validateLoginForm(email, password);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        // Simulate API call delay
        setTimeout(() => {
            const result = login(email, password);

            if (result.success) {
                navigate('/catalog');
            } else {
                setLoginError(result.error);
            }
            setLoading(false);
        }, 500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-4 rounded-2xl shadow-lg">
                            <BookOpen className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold gradient-text mb-2">Welcome Back</h2>
                    <p className="text-gray-600">Sign in to access your library account</p>
                </div>

                {/* Login Form */}
                <div className="glass-effect rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {loginError && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-fade-in">
                                {loginError}
                            </div>
                        )}

                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="student@library.com"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors({ ...errors, email: '' });
                            }}
                            error={errors.email}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors({ ...errors, password: '' });
                            }}
                            error={errors.password}
                            required
                        />

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2 rounded" />
                                <span className="text-gray-700">Remember me</span>
                            </label>
                            <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                                Forgot password?
                            </a>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            loading={loading}
                        >
                            Sign In
                        </Button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm font-semibold text-blue-900 mb-2">Demo Credentials:</p>
                        <div className="text-xs text-blue-800 space-y-1">
                            <p>Student: student@library.com / password123</p>
                            <p>Faculty: faculty@library.com / password123</p>
                            <p>Librarian: admin@library.com / admin123</p>
                        </div>
                    </div>

                    {/* Register Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-primary-600 hover:text-primary-700 font-semibold">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
