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
