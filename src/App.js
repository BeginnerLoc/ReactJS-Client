import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Streaming from './pages/Streaming';
import { ColorModeContext, useMode } from './theme';
import { CssBaseLine, ThemeProvider } from '@mui/material';

function App() {
  const [theme, colorMode] = useMode();


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseLine />
        <div className="app">
          <main className='content'></main>
          <nav>
            <ul>
              {/* if used <a> instead of <link>, the whole browser would reload each time the routing is triggered */}
              {/* CANNOT use <link> to redirect to external path */}
              <li>
                <Link to="/Home">Home</Link>
              </li>
              <li>
                <Link to="/Dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/Streaming">Streaming</Link>
              </li>
            </ul>
          </nav>

          {/* each time the <link> is clicked, react-router will used the address on the browser's address bar to check against matching path in route */}
          <Routes>
            <Route path='/Home' element={<Home />}></Route>
            <Route path='/Dashboard' element={<Dashboard />}></Route>
            <Route path='/Streaming' element={<Streaming />}></Route>
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
export default App