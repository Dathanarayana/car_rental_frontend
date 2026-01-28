import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface OAuthCallbackProps {
    setView: (view: 'home' | 'login' | 'register' | 'fleet' | 'booking' | 'my-bookings') => void;
}

const OAuthCallback: React.FC<OAuthCallbackProps> = ({ setView }) => {
    const { login, setMessage } = useAuth();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            handleOAuthSuccess(token);
        } else {
            handleOAuthFailure();
        }
    }, []);

    const handleOAuthSuccess = async (token: string) => {
        try {
            // First set the token so upcoming fetch uses it if needed
            // But we actually need user info. The backend usually has a /me endpoint
            // For now, let's fetch user info with this token
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    login(data.data, token);
                    setMessage('Authenticated successfully via Neural Link.', 'success');
                    setView('home');
                    // Clean up URL
                    window.history.replaceState({}, document.title, "/");
                    return;
                }
            }

            // Fallback if /me fails: try to use the token anyway with a generic user
            // or decode the JWT if we have a decoder. For simplicity, let's assume /me works.
            throw new Error('Failed to retrieve user profile');
        } catch (error) {
            console.error('OAuth profile fetch error:', error);
            setMessage('Neural symmetry failed. Please try manual entry.', 'error');
            setView('login');
        }
    };

    const handleOAuthFailure = () => {
        setMessage('Authorization signal lost.', 'error');
        setView('login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center carbon-pattern">
            <div className="flex flex-col items-center gap-6">
                <div className="w-16 h-16 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin" />
                <div className="text-center">
                    <h2 className="font-orbitron text-xl font-black tracking-widest text-chrome uppercase">Synchronizing...</h2>
                    <p className="font-rajdhani text-white/40 text-sm mt-2 uppercase tracking-tighter">Establishing Neural Handshake</p>
                </div>
            </div>
        </div>
    );
};

export default OAuthCallback;
