
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/Button';
import type { StoredUser } from '../types';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

const Login: React.FC = () => {
    const { t } = useLanguage();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]') as StoredUser[];
        const foundUser = storedUsers.find(user => user.email === email && user.password === password);
        
        if (foundUser) {
            auth.login({ name: foundUser.name, email: foundUser.email });
            navigate('/profile');
        } else {
            setError(t('auth.error_invalid'));
        }
    };

    const handleSocialLogin = (provider: 'Google' | 'Facebook') => {
        const mockEmail = provider === 'Google' ? 'google.user@example.com' : 'facebook.user@example.com';
        const mockName = provider === 'Google' ? 'Google User' : 'Facebook User';
        
        let storedUsers = JSON.parse(localStorage.getItem('users') || '[]') as StoredUser[];
        let socialUser = storedUsers.find(user => user.email === mockEmail);

        if (!socialUser) {
            socialUser = { name: mockName, email: mockEmail, password: 'social_login_mock_password' };
            storedUsers.push(socialUser);
            localStorage.setItem('users', JSON.stringify(storedUsers));
        }
        
        auth.login({ name: socialUser.name, email: socialUser.email });
        navigate('/profile');
    };

    return (
        <div className="min-h-screen text-white flex items-center justify-center py-20 px-4">
            <div className="w-full max-w-md">
                <div className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-indigo-600"></div>
                    
                    <h1 className="text-4xl font-black text-center mb-10 uppercase tracking-tighter">{t('auth.login_title')}</h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 mb-2 ml-1">{t('auth.email')}</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-800 border border-white/5 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                required
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2 ml-1">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">{t('auth.password')}</label>
                                <Link to="/forgot-password" university-link className="text-[10px] font-black uppercase text-indigo-400 hover:text-white transition-colors">
                                    {t('auth.forgot_link')}
                                </Link>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-800 border border-white/5 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center">{error}</p>}
                        <Button type="submit" className="w-full py-4 rounded-2xl">{t('auth.login_btn')}</Button>
                    </form>

                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                        <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em]"><span className="px-4 bg-slate-900 text-gray-500">{t('auth.social_continue')}</span></div>
                    </div>
                    
                    <div className="space-y-3">
                        <button onClick={() => handleSocialLogin('Google')} className="w-full flex items-center justify-center py-4 px-4 text-[10px] font-black uppercase tracking-widest text-gray-900 bg-white rounded-2xl hover:bg-cyan-400 transition-all">
                            <FcGoogle className="w-5 h-5 mr-3" /> {t('auth.google')}
                        </button>
                         <button onClick={() => handleSocialLogin('Facebook')} className="w-full flex items-center justify-center py-4 px-4 text-[10px] font-black uppercase tracking-widest text-white bg-[#1877F2] rounded-2xl hover:bg-[#166fe5] transition-all">
                            <FaFacebook className="w-5 h-5 mr-3" /> {t('auth.facebook')}
                        </button>
                    </div>

                    <p className="text-center text-[10px] font-black uppercase tracking-widest text-gray-500 mt-10">
                        {t('auth.no_account')}{' '}
                        <Link to="/register" className="text-indigo-400 hover:text-white transition-colors">
                            {t('auth.register_btn')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
