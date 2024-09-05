import { IEvent } from '../types/event';

import axios from 'axios';

export async function fetchEvents(): Promise<IEvent[] | void> {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_API_LINK}/events`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export async function fetchRecentEvents() {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_API_LINK}/events`, {
      params: { recent: 'true', amount: 9 },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw error;
    });
}

export async function fetchRecsEvents(eventUUID: string) {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_API_LINK}/recs/${eventUUID}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw error;
    });
}

export async function fetchEvent(eventUUID: string): Promise<IEvent | void> {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_API_LINK}/events/${eventUUID}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw error;
    });
}
