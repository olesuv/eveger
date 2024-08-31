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
import axios from 'axios';

interface IRecsProps {
  eventCategory: string;
}

export default function Recs(props: IRecsProps) {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  console.log(props.eventCategory);

  useEffect(() => {
    fetchRecsEvents(props.eventCategory)
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
    <main>
      <Typography variant="h4" gutterBottom>
        Recomendations based on current event
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

async function fetchRecsEvents(eventCategory: string) {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_API_LINK}/events`, {
      params: { category: eventCategory, recent: 'true', amount: 6 },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw error;
    });
}
