
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Privacy: React.FC = () => {
    const { t, language } = useLanguage();
    
    return (
        <div className="min-h-screen text-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <header className="text-center my-12">
                    <h1 className="text-4xl md:text-5xl font-bold">{t('legal.privacy_title')}</h1>
                    <p className="text-gray-400 mt-2">{t('legal.last_update')}</p>
                </header>

                <main className="text-lg leading-relaxed space-y-8 text-gray-300">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">1. {language === 'es' ? 'Introducción' : 'Introduction'}</h2>
                        <p>
                            {language === 'es' 
                                ? 'En Deluxe, respetamos su privacidad y nos comprometemos a proteger sus datos personales. Este aviso de privacidad le informará sobre cómo cuidamos sus datos personales cuando visita nuestro sitio web (independientemente de desde dónde lo visite) y le informará sobre sus derechos de privacidad y cómo la ley lo protege.' 
                                : 'At Deluxe, we respect your privacy and are committed to protecting your personal data. This privacy notice will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.'}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">2. {language === 'es' ? 'Datos que Recopilamos sobre Usted' : 'Data We Collect About You'}</h2>
                        <p>
                            {language === 'es' 
                                ? 'Podemos recopilar, usar, almacenar y transferir diferentes tipos de datos personales sobre usted, que hemos agrupado de la siguiente manera:' 
                                : 'We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:'}
                        </p>
                        <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
                            <li><strong>{language === 'es' ? 'Datos de Identidad:' : 'Identity Data:'}</strong> {language === 'es' ? 'incluyen nombre, apellido, nombre de usuario o identificador similar.' : 'includes first name, last name, username or similar identifier.'}</li>
                            <li><strong>{language === 'es' ? 'Datos de Contacto:' : 'Contact Data:'}</strong> {language === 'es' ? 'incluyen dirección de correo electrónico y números de teléfono.' : 'includes email address and telephone numbers.'}</li>
                            <li><strong>{language === 'es' ? 'Datos Técnicos:' : 'Technical Data:'}</strong> {language === 'es' ? 'incluyen la dirección del protocolo de Internet (IP), sus datos de inicio de sesión, el tipo y la versión del navegador, etc.' : 'includes internet protocol (IP) address, your login data, browser type and version, etc.'}</li>
                            <li><strong>{language === 'es' ? 'Datos de Transacciones:' : 'Transaction Data:'}</strong> {language === 'es' ? 'incluyen detalles sobre los pagos hacia y desde usted y otros detalles de los productos y servicios que nos ha comprado.' : 'includes details about payments to and from you and other details of products and services you have purchased from us.'}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">3. {language === 'es' ? 'Cómo Usamos sus Datos Personales' : 'How We Use Your Personal Data'}</h2>
                        <p>
                            {language === 'es' 
                                ? 'Usaremos sus datos personales solo cuando la ley nos lo permita. Generalmente, usaremos sus datos personales en las siguientes circunstancias:' 
                                : 'We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:'}
                        </p>
                         <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
                            <li>{language === 'es' ? 'Para registrarlo como nuevo cliente.' : 'To register you as a new customer.'}</li>
                            <li>{language === 'es' ? 'Para procesar y entregar su pedido, incluida la gestión de pagos y la recopilación de dinero adeudado.' : 'To process and deliver your order including managing payments and collecting money owed to us.'}</li>
                            <li>{language === 'es' ? 'Para gestionar nuestra relación con usted, lo que incluirá notificarle sobre cambios en nuestros términos o política de privacidad.' : 'To manage our relationship with you which will include notifying you about changes to our terms or privacy policy.'}</li>
                        </ul>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">4. {language === 'es' ? 'Seguridad de los Datos' : 'Data Security'}</h2>
                        <p>
                            {language === 'es' 
                                ? 'Hemos implementado medidas de seguridad adecuadas para evitar que sus datos personales se pierdan accidentalmente, se usen o se accedan de forma no autorizada, se alteren o se divulguen.' 
                                : 'We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.'}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">5. {language === 'es' ? 'Sus Derechos Legales' : 'Your Legal Rights'}</h2>
                        <p>
                            {language === 'es' 
                                ? 'Bajo ciertas circunstancias, usted tiene derechos bajo las leyes de protección de datos en relación con sus datos personales. Estos incluyen el derecho a solicitar acceso, corrección, eliminación, u objeción al procesamiento de sus datos personales.' 
                                : 'Under certain circumstances, you have rights under data protection laws in relation to your personal data. These include the right to request access, correction, erasure, or objection to the processing of your personal data.'}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">6. {language === 'es' ? 'Contacto' : 'Contact'}</h2>
                        <p>
                            {language === 'es' 
                                ? 'Si tiene alguna pregunta sobre este aviso de privacidad, incluidas las solicitudes para ejercer sus derechos legales, por favor ' 
                                : 'If you have any questions about this privacy notice, including any requests to exercise your legal rights, please '}
                            <Link to="/contact" className="text-indigo-400 hover:underline">
                                {language === 'es' ? 'contáctenos' : 'contact us'}
                            </Link>.
                        </p>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Privacy;
