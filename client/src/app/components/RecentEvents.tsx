'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function RecentEvents() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecentEvents()
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch events');
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          The most recent events
        </Typography>

        <Grid container spacing={2}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.uuid}>
              <Paper elevation={3} style={{ padding: '16px' }}>
                <Box mb={2}>
                  <Typography variant="h6">{event.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {event.category}
                  </Typography>
                </Box>
                <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                  {formatDate(event.date)}
                </Typography>
                <Typography variant="body2" mt={2}>
                  {event.description}
                </Typography>
                <Box mt={2}>
                  <Typography variant="body2">
                    Max amount of visitors: {event.membersAmount}
                  </Typography>
                  <Typography variant="body2">
                    Location: {event.location}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

async function fetchRecentEvents() {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_API_LINK}/events`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    });
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleString('eng', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
