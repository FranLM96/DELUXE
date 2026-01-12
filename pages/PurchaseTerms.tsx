
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const PurchaseTerms: React.FC = () => {
    const { t, language } = useLanguage();
    
    return (
        <div className="min-h-screen text-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <header className="text-center my-12">
                    <h1 className="text-4xl md:text-5xl font-bold">{t('legal.purchase_title')}</h1>
                    <p className="text-gray-400 mt-2">{t('legal.last_update')}</p>
                </header>

                <main className="text-lg leading-relaxed space-y-8 text-gray-300">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">1. {language === 'es' ? 'Generalidades' : 'Generalities'}</h2>
                        <p>
                            {language === 'es' 
                                ? 'Estos Términos de Compra se aplican a la compra de boletos para eventos a través de la plataforma Deluxe. Al realizar una compra, usted acepta estos términos en su totalidad.' 
                                : 'These Purchase Terms apply to the purchase of event tickets through the Deluxe platform. By making a purchase, you agree to these terms in their entirety.'}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">2. {language === 'es' ? 'Precios y Pagos' : 'Prices and Payments'}</h2>
                        <p>
                            {language === 'es' 
                                ? 'Todos los precios de los boletos se muestran en Pesos Mexicanos (MXN) e incluyen los impuestos aplicables, a menos que se indique lo contrario. Además del precio del boleto, se aplicará un cargo por servicio, que se detallará claramente antes de finalizar la compra. El pago debe completarse en el momento de la compra para que los boletos sean válidos.' 
                                : 'All ticket prices are displayed in Mexican Pesos (MXN) and include applicable taxes unless otherwise stated. In addition to the ticket price, a service charge will apply, which will be clearly detailed before finalizing the purchase. Payment must be completed at the time of purchase for tickets to be valid.'}
                        </p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">3. {language === 'es' ? 'Política de Reembolso y Cancelación' : 'Refund and Cancellation Policy'}</h2>
                        <p>
                            <strong>{language === 'es' ? 'Todas las ventas son finales.' : 'All sales are final.'}</strong> 
                            {language === 'es' 
                                ? ' No se realizarán reembolsos, cambios ni cancelaciones una vez completada la compra, excepto en los casos en que un evento sea cancelado o pospuesto por el organizador. En caso de cancelación del evento, se le reembolsará el valor nominal del boleto. Los cargos por servicio no son reembolsables.' 
                                : ' No refunds, exchanges or cancellations will be made once the purchase is completed, except in cases where an event is canceled or postponed by the organizer. In case of event cancellation, the face value of the ticket will be refunded. Service charges are non-refundable.'}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">4. {language === 'es' ? 'Entrega de Boletos' : 'Ticket Delivery'}</h2>
                        <p>
                            {language === 'es' 
                                ? 'Los boletos se entregan de forma digital a través de nuestra tecnología BluePass. Una vez confirmada la compra, sus boletos estarán disponibles en la sección "Mis Boletos" de su perfil de usuario. Es su responsabilidad asegurarse de que la información de su cuenta sea correcta para recibir los boletos.' 
                                : 'Tickets are delivered digitally through our BluePass technology. Once the purchase is confirmed, your tickets will be available in the "My Tickets" section of your user profile. It is your responsibility to ensure your account information is correct to receive tickets.'}
                        </p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">5. {language === 'es' ? 'Uso de Boletos' : 'Use of Tickets'}</h2>
                        <p>
                            {language === 'es' 
                                ? 'Cada boleto es una licencia revocable para asistir al evento. La reventa de boletos por encima de su valor nominal está estrictamente prohibida. Nos reservamos el derecho de cancelar cualquier boleto que se haya revendido y de denegar la entrada al portador.' 
                                : 'Each ticket is a revocable license to attend the event. Reselling tickets above their face value is strictly prohibited. We reserve the right to cancel any ticket that has been resold and to deny entry to the bearer.'}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">6. {language === 'es' ? 'Admisión al Evento' : 'Event Admission'}</h2>
                        <p>
                            {language === 'es' 
                                ? 'La admisión a un evento está sujeta a los términos, condiciones y reglas del organizador del evento y del lugar. Es posible que se requiera una identificación válida para la admisión. La falta de cumplimiento de estas reglas puede resultar en la denegación de la entrada sin reembolso.' 
                                : 'Admission to an event is subject to the terms, conditions and rules of the event organizer and the venue. Valid identification may be required for admission. Failure to comply with these rules may result in denial of entry without refund.'}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-3">7. {language === 'es' ? 'Contacto' : 'Contact'}</h2>
                        <p>
                            {language === 'es' 
                                ? 'Si tiene alguna pregunta sobre estos Términos de Compra, por favor ' 
                                : 'If you have any questions about these Purchase Terms, please '}
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

export default PurchaseTerms;
