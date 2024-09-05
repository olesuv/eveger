'use client';

import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { CircularProgress } from '@mui/material';
import { formatDate } from '../utils/utils';
import ApiError from '../utils/ui/ApiError';
import { IEvent } from '../types/event';
import { fetchRecentEvents } from '../utils/fetching-events';
import LoadingBar from '../utils/ui/Loading';

export default function RecentEvents() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecentEvents()
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => {
        setError(`failed to fetch events: ${err}`);
      });
  }, []);

  if (error) {
    return <ApiError error={error} />;
  }

  if (!events) {
    return <LoadingBar />;
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
