import { createTheme, ThemeProvider } from '@mui/material/styles'
import MainPage from 'MainPage';

const theme = createTheme({
  palette: {
    mode: 'dark',
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
