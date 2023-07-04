import { Routes, Route } from 'react-router-dom';

import { ColorModeContext, useMode } from './theme';
import ProjectProvider from './context/ProjectProvider'

import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import ProjectModal from './scenes/modal';
import Dashboard from './scenes/dashboard/index';
import Team from './scenes/team';
import Download from './scenes/download';

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <ProjectProvider>
          <CssBaseline />
          <div className="app">
            <Sidebar />
            <main className='content'>
              <Topbar />
              <Routes>
              <Route path="/" element={<ProjectModal />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/download" element={<Download />} />
              </Routes>
            </main>
          </div>
        </ProjectProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
export default App