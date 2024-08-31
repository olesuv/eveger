'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { CircularProgress } from '@mui/material';
import { formatDate } from '../utils/utils';

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
        setError('failed to fetch events');
      });
  }, []);

  if (error) {
    return <div>Some API error occured: {error}</div>;
  }

  if (!events) {
    return (
      <Container maxWidth="sm">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: '100vh' }}
        >
          <CircularProgress />
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Upcoming events
        </Typography>

        <Grid container spacing={2}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.uuid}>
              <Paper elevation={3} style={{ padding: '16px' }}>
                <Box mb={2}>
                  <Typography variant="h6">
                    <Link href={`/events/${event.uuid}`} passHref>
                      {event.title}
                    </Link>
                  </Typography>
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
