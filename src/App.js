import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Streaming from './pages/Streaming';
import { ColorModeContext, useMode } from './theme';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard/index';
import Team from './scenes/team';
// import Invoices from './pages/invoices';
// import Contacts from './pages/contacts';
// import Bar from './pages/bar';
// import Form from './pages/form';
// import Line from './pages/line';
// import Pie from './pages/pie';
// import FAQ from './pages/faq';
// import Geography from './pages/geography';


function App() {
  const [theme, colorMode] = useMode();


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar/>
          <main className='content'>
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              {/* <Route path="/contacts" element={<Contacts />} /> */}
              {/* <Route path="/invoices" element={<Invoices />} /> */}
              {/* <Route path="/form" element={<Form />} /> */}
              {/* <Route path="/bar" element={<Bar />} /> */}
              {/* <Route path="/pie" element={<Pie />} /> */}
              {/* <Route path="/line" element={<Line />} /> */}
              {/* <Route path="/faq" element={<FAQ />} /> */}
              {/* <Route path="/geography" element={<Geography />} /> */}

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
export default App