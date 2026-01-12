import React, { useState, useEffect } from 'react';
import type { UserTicket } from '../../types';
import { Button } from '../ui/Button';
import { FiX } from 'react-icons/fi';

interface SendTicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSend: (email: string) => void;
    ticket: UserTicket | null;
}

export const SendTicketModal: React.FC<SendTicketModalProps> = ({ isOpen, onClose, onSend, ticket }) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        if (isOpen) {
            setEmail('');
            setEmailError('');
        }
    }, [isOpen]);

    const validateEmail = (value: string) => {
        if (!value.trim()) {
            setEmailError('');
            return false;
        }
        if (!emailRegex.test(value)) {
            setEmailError('Por favor, ingresa un correo electrónico válido.');
            return false;
        }
        setEmailError('');
        return true;
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        validateEmail(newEmail);
    };

    const handleSend = () => {
        if (validateEmail(email) && ticket) {
            onSend(email);
        }
    };

    if (!isOpen || !ticket) {
        return null;
    }

    const isInvalid = !email.trim() || !!emailError;

    return (
        <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="relative bg-slate-900 rounded-2xl w-full max-w-md p-8 shadow-2xl shadow-indigo-900/20"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    aria-label="Cerrar modal"
                >
                    <FiX className="w-6 h-6" />
                </button>

                <h2 className="text-2xl font-bold mb-2 text-center">Enviar Boleto</h2>
                <p className="text-center text-gray-400 mb-6">Estás a punto de enviar tu boleto para:</p>

                <div className="bg-slate-800 p-4 rounded-lg mb-6 text-center">
                    <p className="font-bold text-lg text-indigo-300">{ticket.event.title}</p>
                    <p className="text-gray-300">{ticket.ticketType}</p>
                </div>

                <div>
                    <label htmlFor="recipient-email" className="block text-sm font-medium text-gray-300 mb-2">
                        Correo electrónico del destinatario
                    </label>
                    <input
                        type="email"
                        id="recipient-email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="amigo@ejemplo.com"
                        className={`w-full bg-slate-800 border rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${emailError ? 'border-red-500 ring-red-500' : 'border-slate-700 focus:ring-indigo-500'}`}
                        aria-invalid={!!emailError}
                        aria-describedby="email-error"
                    />
                    {emailError && <p id="email-error" className="text-red-500 text-sm mt-2">{emailError}</p>}
                </div>

                <p className="text-xs text-gray-500 mt-4">
                    La persona recibirá una invitación para aceptar el boleto. Esta acción es irreversible una vez que el boleto sea aceptado.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <Button variant="secondary" onClick={onClose} className="w-full">Cancelar</Button>
                    <Button onClick={handleSend} disabled={isInvalid} className="w-full">
                        Confirmar y Enviar
                    </Button>
                </div>
            </div>
        </div>
    );
};