import { createTheme, ThemeProvider } from '@mui/material/styles'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const theme = createTheme({})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h1">MEMSrch</Typography>
      <Button variant="contained">Hi</Button>
      <div>
        Temp
      </div>
    </ThemeProvider>
  );
}

export default App;
