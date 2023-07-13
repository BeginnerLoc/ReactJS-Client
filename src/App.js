import { Routes, Route } from 'react-router-dom';

import { ColorModeContext, useMode } from './theme';
import ProjectProvider from './context/ProjectProvider';
import BotProvider from './context/BotProvider';

import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import ProjectModal from './scenes/modal';
import Dashboard from './scenes/dashboard/index';
import Team from './scenes/team';
import Download from './scenes/download';
import ChatBot from './components/chatbot';
function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <ProjectProvider>
          <CssBaseline />
          <div className="app">
            <Sidebar />
            <BotProvider>
              <main className='content'>
                <Topbar />
                <Routes>
                  <Route path="/" element={<ProjectModal />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/download" element={<Download />} />
                </Routes>
              </main>
              <ChatBot />
            </BotProvider>
          </div>
        </ProjectProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
export default App