import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Streaming from './pages/Streaming';
import { ColorModeContext, useMode } from './theme';
import { CssBaseLine, ThemeProvider } from '@mui/material';
import Topbar from './scenes/global/Topbar';

function App() {
  const [theme, colorMode] = useMode();


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseLine />
        <div className="app">
          <main className='content'>
              <Topbar/>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
export default App