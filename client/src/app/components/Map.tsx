'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Container, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import 'leaflet/dist/leaflet.css';
import { IEvent } from '../types/event';
import { getCoordinates } from '../utils/location';
import { fetchEvents } from '../utils/fetching-events';

import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import ApiError from '../utils/ui/ApiError';

export default function Map() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [error, setError] = useState('');
  const [mapCenter, setMapCenter] = useState<[number, number]>([51.505, -0.09]);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await fetchEvents();

        if (data) {
          const eventsWithCoordinates = await Promise.all(
            data.map(async (event) => {
              if (typeof event.location === 'string') {
                const coordinates = await getCoordinates(event.location);

                return {
                  ...event,
                  location: coordinates || event.location,
                };
              }
              return event;
            }),
          );
          setEvents(eventsWithCoordinates);
        }
      } catch (err) {
        setError(`failed to fetch events: ${err}`);
      }
    }

    loadEvents();
  }, []);

  if (error) {
    return <ApiError error={error} />;
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} style={{ height: '500px', width: '100%' }}>
          <Typography variant="h6" style={{ padding: '16px' }}>
            Map of all events (even deprecated)
          </Typography>

          <MapContainer
            center={mapCenter}
            zoom={10}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {events.map((event, index) => (
              <Marker key={index} position={event.location as [number, number]}>
                <Popup>
                  event with title name{' '}
                  <a href={`/events/${event.uuid}`}>'{event.title}'</a>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Paper>
      </Box>
    </Container>
  );
}
