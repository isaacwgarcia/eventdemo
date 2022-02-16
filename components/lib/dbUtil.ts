import { Event, Owner, Attendee } from "../lib/types";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "./db";

export async function createEvent(event: Event): Promise<void> {
  const eventRef = collection(db, "Event");
  await setDoc(doc(eventRef, event.id), {
    attendee_ids: event.attendee_ids,
    date: event.date,
    description: event.description,
    location: event.location,
    name: event.name,
  });
}

export async function readEvent(id: string): Promise<Event> {
  const event = await getDoc(doc(db, "Event", id));

  if (event.exists()) {
    return event.data() as Event;
  } else {
    const json = '{"status":"not found"}';
    return JSON.parse(json);
  }
}

export async function createOwner(owner: Owner): Promise<void> {
  const ownerRef = collection(db, "Owner");
  await setDoc(doc(ownerRef, owner.id), {
    name: owner.name,
    email: owner.email,
    phone: owner.phone,
    username: owner.username,
    about: owner.about,
    event_ids: owner.event_ids,
    id: owner.id,
  });
}

export async function createAttendee(attendee: Attendee): Promise<void> {
  const attendeeRef = collection(db, "Attendee");
  await setDoc(doc(attendeeRef, attendee.id), {
    name: attendee.name,
    email: attendee.email,
    phone: attendee.phone,
    address: attendee.address,
    event_ids: attendee.event_ids,
    id: attendee.id,
  });
}

export async function readAttendee(id: string): Promise<Attendee> {
  const attendee = await getDoc(doc(db, "Attendee", id));

  if (attendee.exists()) {
    return attendee.data() as Attendee;
  } else {
    const json = '{"status":"not found"}';
    return JSON.parse(json);
  }
}

export async function searchOwnerByEmail(email: string): Promise<Owner> {
  const q = query(collection(db, "Owner"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const owner: Owner[] = querySnapshot.docs.map(
    (value) => value.data() as Owner
  );
  return owner[0];
}

export async function readOwner(id: string): Promise<Owner> {
  const owner = await getDoc(doc(db, "Owner", id));

  if (owner.exists()) {
    return owner.data() as Owner;
  } else {
    const json = '{"status":"not found"}';
    return JSON.parse(json);
  }
}

export async function searchOwners(): Promise<Owner[]> {
  const q = query(collection(db, "Owner"));
  const querySnapshot = await getDocs(q);
  const owners: Owner[] = querySnapshot.docs.map(
    (value) => value.data() as Owner
  );
  return owners;
}

export async function searchAttendeeByIds(id: string[]): Promise<Attendee[]> {
  // Firebase Query "IN" Limit to 10//
  let queries = [];
  for (let i = 0; i < id.length; i += 10) {
    queries.push(
      query(collection(db, "Attendee"), where("id", "in", id.slice(i, i + 10)))
    );
  }
  let usersDocsSnaps: QuerySnapshot[] = [];
  let attendees: Attendee[] = [];
  for (let i = 0; i < queries.length; i++) {
    usersDocsSnaps.push(await getDocs(queries[i]));
  }
  usersDocsSnaps = await Promise.all(usersDocsSnaps);
  usersDocsSnaps.forEach((doc) => {
    doc.docs.map((o) => {
      attendees.push(o.data() as Attendee);
    });
  });
  return attendees;
}

export async function searchByIds(id: string[]): Promise<Event[]> {
  // Firebase Query "IN" Limit to 10//
  let queries = [];
  for (let i = 0; i < id.length; i += 10) {
    queries.push(
      query(collection(db, "Event"), where("id", "in", id.slice(i, i + 10)))
    );
  }
  let eventsDocsSnaps: QuerySnapshot[] = [];
  let events: Event[] = [];
  for (let i = 0; i < queries.length; i++) {
    eventsDocsSnaps.push(await getDocs(queries[i]));
  }
  eventsDocsSnaps = await Promise.all(eventsDocsSnaps);
  eventsDocsSnaps.forEach((doc) => {
    doc.docs.map((o) => {
      events.push(o.data() as Event);
    });
  });
  return events;
}
