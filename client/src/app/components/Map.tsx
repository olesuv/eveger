'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Container, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { geocode } from 'opencage-api-client';

import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

export default function Map() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    37.44186360621624, -122.14479195349563,
  ]);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await fetchEvents();

        const eventsWithCoordinates = await Promise.all(
          data.map(async (event) => {
            const coordinates = await getCoordinates(event.location);
            return { ...event, location: coordinates };
          }),
        );

        setEvents(eventsWithCoordinates);
      } catch (err) {
        console.error(err);
        setError('failed to fetch events');
      }
    }

    loadEvents();
  }, []);

  if (error) {
    return <div>Some API error occurred: {error}</div>;
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} style={{ height: '500px', width: '100%' }}>
          <Typography variant="h6" style={{ padding: '16px' }}>
            Map of events
          </Typography>

          <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {events.map((event, index) => (
              <Marker
                key={index}
                position={event.location as [number, number]} // Ensure this is of the correct type
              >
                <Popup>{event.title}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </Paper>
      </Box>
    </Container>
  );
}

async function fetchEvents() {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_API_LINK}/events`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

async function getCoordinates(
  locationAddress: string,
): Promise<[number, number] | void> {
  try {
    const response = await geocode({
      q: locationAddress,
      key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY,
    });
    if (response?.status?.code === 200 && response?.results?.length > 0) {
      const geocoded = response.results[0] as {
        geometry: { lat: number; lng: number };
        formatted: string;
      };
      return [geocoded.geometry.lat, geocoded.geometry.lng];
    }
  } catch (error) {
    throw error;
  }
}
