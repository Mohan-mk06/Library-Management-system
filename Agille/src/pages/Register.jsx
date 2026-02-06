import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateRegisterForm } from '../utils/validation';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { BookOpen, User, Mail, Lock, UserCircle } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        setErrors({ ...errors, [field]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRegisterError('');

        // Validate form
        const validationErrors = validateRegisterForm(
            formData.name,
            formData.email,
            formData.password,
            formData.confirmPassword,
            formData.role
        );

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        // Simulate API call delay
        setTimeout(() => {
            const result = register(formData.name, formData.email, formData.password, formData.role);

            if (result.success) {
                navigate('/catalog');
            } else {
                setRegisterError(result.error);
            }
            setLoading(false);
        }, 500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-gradient-to-r from-secondary-600 to-primary-600 p-4 rounded-2xl shadow-lg">
                            <BookOpen className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold gradient-text mb-2">Create Account</h2>
                    <p className="text-gray-600">Join our library community today</p>
                </div>

                {/* Register Form */}
                <div className="glass-effect rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {registerError && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-fade-in">
                                {registerError}
                            </div>
                        )}

                        <Input
                            label="Full Name"
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            error={errors.name}
                            required
                        />

                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            error={errors.email}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Minimum 6 characters"
                            value={formData.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                            error={errors.password}
                            required
                        />

                        <Input
                            label="Confirm Password"
                            type="password"
                            placeholder="Re-enter your password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleChange('confirmPassword', e.target.value)}
                            error={errors.confirmPassword}
                            required
                        />

                        {/* Role Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Select Role <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {['student', 'faculty', 'librarian'].map((role) => (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => handleChange('role', role)}
                                        className={`p-4 rounded-lg border-2 transition-all ${formData.role === role
                                                ? 'border-primary-600 bg-primary-50 shadow-md'
                                                : 'border-gray-300 hover:border-primary-300'
                                            }`}
                                    >
                                        <UserCircle className={`w-8 h-8 mx-auto mb-2 ${formData.role === role ? 'text-primary-600' : 'text-gray-400'
                                            }`} />
                                        <p className={`text-sm font-medium capitalize ${formData.role === role ? 'text-primary-700' : 'text-gray-600'
                                            }`}>
                                            {role}
                                        </p>
                                    </button>
                                ))}
                            </div>
                            {errors.role && (
                                <p className="mt-1 text-sm text-red-600 animate-fade-in">{errors.role}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            loading={loading}
                        >
                            Create Account
                        </Button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
