
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Terms: React.FC = () => {
    const { t, language } = useLanguage();
    
    return (
        <div className="min-h-screen text-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <header className="text-center my-12">
                    <h1 className="text-4xl md:text-5xl font-bold">{t('legal.terms_title')}</h1>
                    <p className="text-gray-400 mt-2">{t('legal.last_update')}</p>
                </header>

                <main className="text-lg leading-relaxed space-y-8 text-gray-300">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">1. {language === 'es' ? 'Aceptación de los Términos' : 'Acceptance of Terms'}</h2>
                        <p>
                            {language === 'es' 
                                ? 'Bienvenido a Deluxe ("nosotros", "nuestro"). Al acceder o utilizar nuestro sitio web y servicios, usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguna parte de los términos, no podrá acceder al servicio.' 
                                : 'Welcome to Deluxe ("we", "our"). By accessing or using our website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of the terms, you may not access the service.'}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">2. {language === 'es' ? 'Uso de la Plataforma' : 'Use of the Platform'}</h2>
                        <p>
                            {language === 'es' 
                                ? 'Usted se compromete a utilizar la plataforma solo para fines legales y de acuerdo con estos términos. Se prohíbe cualquier uso que pueda dañar, deshabilitar, sobrecargar o perjudicar el sitio, o interferir con el uso y disfrute de la plataforma por parte de terceros.' 
                                : 'You agree to use the platform only for lawful purposes and in accordance with these terms. Any use that could damage, disable, overburden, or impair the site, or interfere with any other party\'s use and enjoyment of the platform, is prohibited.'}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">3. {language === 'es' ? 'Cuentas de Usuario' : 'User Accounts'}</h2>
                        <p>
                            {language === 'es' 
                                ? 'Para acceder a ciertas funciones, es posible que deba crear una cuenta. Usted es responsable de mantener la confidencialidad de su cuenta y contraseña, y acepta la responsabilidad de todas las actividades que ocurran bajo su cuenta. Debe notificarnos inmediatamente sobre cualquier uso no autorizado de su cuenta.' 
                                : 'To access certain features, you may be required to create an account. You are responsible for maintaining the confidentiality of your account and password and accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.'}
                        </p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">4. {language === 'es' ? 'Propiedad Intelectual' : 'Intellectual Property'}</h2>
                        <p>
                            {language === 'es' 
                                ? 'El servicio y su contenido original, características y funcionalidad son y seguirán siendo propiedad exclusiva de Deluxe Entertainment y sus licenciantes. El contenido está protegido por derechos de autor, marcas registradas y otras leyes tanto de México como de países extranjeros.' 
                                : 'The service and its original content, features, and functionality are and will remain the exclusive property of Deluxe Entertainment and its licensors. The content is protected by copyright, trademark, and other laws of both Mexico and foreign countries.'}
                        </p>
                    </section>
                    
                     <section>
                        <h2 className="text-2xl font-bold text-white mb-3">5. {language === 'es' ? 'Enlaces a Otros Sitios Web' : 'Links to Other Websites'}</h2>
                        <p>
                           {language === 'es' 
                                ? 'Nuestro servicio puede contener enlaces a sitios web o servicios de terceros que no son propiedad ni están controlados por Deluxe. No tenemos control ni asumimos responsabilidad por el contenido, las políticas de privacidad o las prácticas de los sitios o servicios de terceros.' 
                                : 'Our service may contain links to third-party websites or services that are not owned or controlled by Deluxe. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.'}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">6. {language === 'es' ? 'Limitación de Responsabilidad' : 'Limitation of Liability'}</h2>
                        <p>
                           {language === 'es' 
                                ? 'En ningún caso Deluxe, ni sus directores, empleados, socios, agentes, proveedores o afiliados, serán responsables de daños indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo, entre otros, la pérdida de beneficios, datos, uso, buena voluntad u otras pérdidas intangibles.' 
                                : 'In no event shall Deluxe, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.'}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">7. {language === 'es' ? 'Cambios en los Términos' : 'Changes to Terms'}</h2>
                        <p>
                            {language === 'es' 
                                ? 'Nos reservamos el derecho, a nuestra entera discreción, de modificar o reemplazar estos Términos en cualquier momento. Si una revisión es material, intentaremos proporcionar un aviso de al menos 30 días antes de que los nuevos términos entren en vigencia. Lo que constituye un cambio material se determinará a nuestra entera discreción.' 
                                : 'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days\' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.'}
                        </p>
                    </section>
                     <section>
                        <h2 className="text-2xl font-bold text-white mb-3">8. {language === 'es' ? 'Contacto' : 'Contact'}</h2>
                        <p>
                            {language === 'es' 
                                ? 'Si tiene alguna pregunta sobre estos Términos, por favor ' 
                                : 'If you have any questions about these Terms, please '}
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

export default Terms;
