import './App.css';
import Header from './components/Header';
import Parks from './pages/Parks';
import Trips from './pages/Trips';
import NotFound from './pages/NotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import ParksProvider from './contexts/ParksContext';

function App() {
  return (
    <ParksProvider>
      <Router>
        <div className='app'>
          <Header />
          <main className='main-content'>
            <Routes>
              <Route
                path='/'
                element={<Parks />}
              />
              <Route
                path='/parks'
                element={<Parks />}
              />
              <Route
                path='/trips'
                element={<Trips />}
              />
              <Route
                path='*'
                element={<NotFound />}
              />
            </Routes>
          </main>
        </div>
      </Router>
    </ParksProvider>
  );
}

export default App;
