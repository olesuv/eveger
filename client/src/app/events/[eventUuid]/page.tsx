'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Container,
  TextField,
  Box,
  Button,
} from '@mui/material';
import Navbar from '@/app/components/Navbvar';

export default function Event({ params }: { params: { eventUuid: string } }) {
  const [event, setEvent] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_LINK}/events/${params.eventUuid}`,
        );
        setEvent(response.data);
      } catch (err) {
        setError('Failed to fetch event');
      }
    }

    fetchEvent();
  }, [params.eventUuid]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_LINK}/events/${params.eventUuid}`,
        event,
      );
      setIsEditing(false);
      // refetch mb
    } catch (err) {
      setError('Failed to update event');
    }
  };

  if (error) {
    return (
      <Container maxWidth="sm">
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!event) {
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
      <Navbar />

      {/* TODO: make it more correct */}
      <Container maxWidth="xl">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Card>
            <CardContent>
              {isEditing ? (
                <>
                  <TextField
                    label="Title"
                    name="title"
                    value={event.title}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Description"
                    name="description"
                    value={event.description}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                  />
                  <TextField
                    label="Category"
                    name="category"
                    value={event.category}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Members Amount"
                    name="membersAmount"
                    type="number"
                    value={event.membersAmount}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Location"
                    name="location"
                    value={event.location}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Date"
                    name="date"
                    type="date"
                    value={new Date(event.date).toISOString().split('T')[0]}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                  <Box mt={2} display="flex" justifyContent="space-between">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <Typography variant="h4" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {event.description}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Category: {event.category}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Members Amount: {event.membersAmount}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Location: {event.location}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Date: {new Date(event.date).toLocaleDateString()}
                  </Typography>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </Button>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </main>
  );
}
