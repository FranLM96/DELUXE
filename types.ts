
export interface Event {
  id: number;
  title: string;
  location: string;
  date: string;
  lineup: string[];
  imageUrl: string;
  description: string;
  tickets: Ticket[];
}

export interface Ticket {
  type: string;
  price: number;
}

export interface Session {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
}

export interface UserTicket {
    id: string;
    event: Event;
    ticketType: string;
}

export interface ReceivedUserTicket extends UserTicket {
    senderEmail: string;
}

export interface User {
    name: string;
    email: string;
}

// NOTE: Storing passwords, even hashed, in localStorage is not secure for production.
// This is for the basic authentication example as requested.
export interface StoredUser extends User {
    password?: string;
}
