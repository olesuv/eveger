'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Container,
  TextField,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import Navbar from '../../components/Navbvar';
import Recs from '@/app/components/Recommendations';
import ApiError from '@/app/utils/ui/ApiError';
import LoadingBar from '@/app/utils/ui/Loading';
import { IEvent } from '@/app/types/event';
import { fetchEvent } from '@/app/utils/fetching-events';

export default function Event({ params }: { params: { eventUuid: string } }) {
  const [event, setEvent] = useState<IEvent>({
    uuid: '',
    title: '',
    description: '',
    category: '',
    membersAmount: 0,
    location: '',
    date: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    async function loadEvent() {
      try {
        const event = await fetchEvent(params.eventUuid);
        if (event) {
          setEvent(event);
        }
      } catch (err) {
        setError(`failed to fetch event: ${err}`);
      }
    }

    loadEvent();
  }, [params.eventUuid]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name as string]: value as string,
    });
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
    return <ApiError error={error} />;
  }

  if (!event.uuid) {
    return <LoadingBar />;
  }

  return (
    <main>
      <Navbar />

      {/* TODO: make it more correct */}
      <Container maxWidth="xl">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Current event
          </Typography>

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

          <Recs eventUUID={event.uuid} />
        </Box>
      </Container>
    </main>
  );
}
