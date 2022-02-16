export interface Attendee {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  event_ids: String[];
}

export interface Event {
  id: string;
  name: string;
  date: number;
  location: string;
  description: string;
  attendee_ids: String[];
}

export interface Owner {
  id: string;
  name: string;
  event_ids: String[];
  email: string;
  phone: string;
  username: string;
  about: string;
}
