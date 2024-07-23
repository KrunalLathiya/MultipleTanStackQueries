// src/App.jsx

import { CssBaseline, Container, Typography } from '@mui/material';
import { Outlet } from '@tanstack/react-router';

const App = () => (
  <>
    <CssBaseline />
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        My Blog
      </Typography>
      <Outlet />
    </Container>
  </>
);

export default App;