
import type { Event, Session, UserTicket, ReceivedUserTicket } from '../types';

export const MOCK_EVENTS: Event[] = [
  {
    id: 1,
    title: 'Fiesta de disfraces',
    location: 'Cdmx',
    date: '1 Nov 2026',
    lineup: ['DJ Nova X', 'Uon', 'Luma Beats', 'Kairo', 'Uon', 'Vortex', 'Uon', 'Synthwave Soul', 'Uon'],
    imageUrl: 'https://picsum.photos/seed/event1/600/800',
    description: 'Vive la fiesta de Disfraces DELUXE y déjate llevar por los mejores ritmos. Una noche donde la magia, tu disfraz y la potencia del Tech House, Techno y Minimal se unen en una sola experiencia.',
    tickets: [
      { type: 'Ticket General', price: 100 },
      { type: 'Ticket Vip', price: 200 },
    ]
  },
  {
    id: 2,
    title: 'Welcome to Deluxe X Desorden',
    location: 'Cdmx',
    date: '15 Nov 2026',
    lineup: ['Artist A', 'Artist B', 'Artist C'],
    imageUrl: 'https://picsum.photos/seed/event2/600/800',
    description: 'Una colaboración épica que no te puedes perder. Deluxe y Desorden se unen para una noche inolvidable.',
    tickets: [
        { type: 'Boleto general', price: 120 },
    ]
  },
  {
    id: 3,
    title: 'Neon Nights',
    location: 'Guadalajara',
    date: '5 Dic 2026',
    lineup: ['Glowstick Masters', 'Laser Luke', 'Bass Queen'],
    imageUrl: 'https://picsum.photos/seed/event3/600/800',
    description: 'Sumérgete en un mundo de luces de neón y beats electrónicos. La experiencia audiovisual del año.',
    tickets: [
        { type: 'Acceso General', price: 90 },
    ]
  },
  {
    id: 4,
    title: 'Rave en la Playa',
    location: 'Cancún',
    date: '20 Ene 2026',
    lineup: ['DJ Sandy', 'Tidal Wave', 'Sunset Beats'],
    imageUrl: 'https://picsum.photos/seed/event4/600/800',
    description: 'Baila hasta el amanecer con la arena bajo tus pies y el mar de fondo. Un rave paradisíaco.',
    tickets: [
        { type: 'Boleto Playa', price: 150 },
        { type: 'Boleto VIP Palapa', price: 300 },
    ]
  }
];

export const MOCK_SESSIONS: Session[] = [
    {
        id: 1,
        title: 'Session 1: Xolootl',
        date: '1 oct',
        imageUrl: 'https://picsum.photos/seed/session1/600/600'
    },
    {
        id: 2,
        title: 'Session 2: Pioneer Mix',
        date: '15 oct',
        imageUrl: 'https://picsum.photos/seed/session2/600/600'
    },
    {
        id: 3,
        title: 'Session 3: Live Set',
        date: '28 oct',
        imageUrl: 'https://picsum.photos/seed/session3/600/600'
    },
    {
        id: 4,
        title: 'Session 4: Underground Vibes',
        date: '5 nov',
        imageUrl: 'https://picsum.photos/seed/session4/600/600'
    }
];

export const MOCK_USER_TICKETS: UserTicket[] = [
    { id: 't1', event: MOCK_EVENTS[0], ticketType: 'Ticket General' },
    { id: 't2', event: MOCK_EVENTS[0], ticketType: 'Ticket General' },
    { id: 't3', event: MOCK_EVENTS[0], ticketType: 'Ticket Vip' },
    { id: 't4', event: MOCK_EVENTS[1], ticketType: 'Boleto general' },
];

export const MOCK_PAST_USER_TICKETS: UserTicket[] = [
     { id: 't5', event: MOCK_EVENTS[2], ticketType: 'Acceso General' },
     { id: 't6', event: MOCK_EVENTS[3], ticketType: 'Boleto Playa' },
];

export const MOCK_RECEIVED_TICKETS: ReceivedUserTicket[] = [
    { id: 't7', event: MOCK_EVENTS[1], ticketType: 'Boleto general', senderEmail: 'amigo@ejemplo.com' },
    { id: 't8', event: MOCK_EVENTS[0], ticketType: 'Ticket Vip', senderEmail: 'conocido@email.com' },
];
