'use client';

import axios from 'axios';
import { useState } from 'react';
import Navbar from '../../components/Navbvar';
import { useRouter } from 'next/navigation';
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';

interface NewEvent {
  title: string;
  description: string | null;
  category: string;
  membersAmount: number;
  location: string;
  date: string;
}

export default function NewEvent() {
  const [error, setError] = useState<undefined | string>(undefined);
  const [event, setEvent] = useState<NewEvent>({
    title: '',
    description: '',
    category: '',
    membersAmount: 0,
    location: '',
    date: '',
  });
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>,
  ) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name as string]: value as string,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name as string]: value as string,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createNewEvent(event);
      router.push(`${process.env.NEXT_PUBLIC_API_LINK}/events`);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'An unexpected error occurred';
      setError(errorMessage);
    }
  };

  return (
    <main>
      <Navbar />

      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 8,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Create New Event
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              required
              id="title"
              label="Event Title"
              name="title"
              value={event.title}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              id="description"
              label="Description"
              name="description"
              value={event.description || ''}
              onChange={handleChange}
              margin="normal"
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={event.category}
                label="Category"
                onChange={handleSelectChange}
              >
                <MenuItem value="movie">Movie</MenuItem>
                <MenuItem value="gaming">Gaming</MenuItem>
                <MenuItem value="books">Books</MenuItem>
                <MenuItem value="english club">English Club</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              required
              type="number"
              id="membersAmount"
              label="Members Amount"
              name="membersAmount"
              value={event.membersAmount}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              required
              id="location"
              label="Location"
              name="location"
              value={event.location}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              required
              type="datetime-local"
              id="date"
              label="Event Date & Time"
              name="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={event.date}
              onChange={handleChange}
              margin="normal"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Event
            </Button>
            {error && (
              <Typography variant="body1" color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </main>
  );
}

async function createNewEvent(event: NewEvent) {
  return await axios
    .post(`${process.env.NEXT_PUBLIC_API_LINK}/events/event`, event)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw error;
    });
}
