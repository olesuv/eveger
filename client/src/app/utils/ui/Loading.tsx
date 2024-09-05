import { CircularProgress, Container, Grid } from '@mui/material';

export default function LoadingBar() {
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
