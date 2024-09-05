'use client';

import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatDate } from '../utils/utils';
import { IEvent } from '../types/event';
import { fetchRecsEvents } from '../utils/fetching-events';
import LoadingBar from '../utils/ui/Loading';

interface IRecsProps {
  eventUUID: string;
}

export default function Recs(props: IRecsProps) {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRecsEvents(props.eventUUID);
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError('failed to fetch events');
      }
    };

    fetchData();
  }, [props.eventUUID]);

  if (error) {
    return <div>Some API error occured: {error}</div>;
  }

  if (events.length === 0) {
    return <LoadingBar />;
  }

  return (
    <main>
      <Typography variant="h4" gutterBottom>
        Recommendations based on current event
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
    </main>
  );
}
