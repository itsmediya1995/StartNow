
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import IdeaInput from './pages/IdeaInput';
import GenerateProposal from './pages/GenerateProposal';
import Explore from './pages/Explore';
import StartupDetail from './pages/StartupDetail';
import { AuthProvider } from './contexts/AuthContext';
import { StartupProvider } from './contexts/StartupContext';

function App() {
  return (
    <AuthProvider>
      <StartupProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/startup/:id" element={<StartupDetail />} />
              <Route path="/idea-input" element={<IdeaInput />} />
              <Route path="/generate-proposal" element={<GenerateProposal />} />
            </Routes>
          </Layout>
        </Router>
      </StartupProvider>
    </AuthProvider>

  );
}

export default App;
