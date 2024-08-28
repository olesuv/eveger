import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from './navbar/Logo';

const Navbar: React.FC = () => {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  return (
    <AppBar position="static">
      <Toolbar>
        <Logo />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MyApp
        </Typography>
        {isMobile ? (
          <IconButton edge="end" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        ) : (
          <>
            <Button color="inherit">Home</Button>
            <Button color="inherit">About</Button>
            <Button color="inherit">Contact</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
