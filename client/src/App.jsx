import './App.css';
import Header from './components/Header';
import Parks from './pages/Parks';
import Trips from './pages/Trips';
import NotFound from './pages/NotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import ParksProvider from './contexts/ParksContext';
import TripsProvider from './contexts/TripsContext';

function App() {
  return (
    <ParksProvider>
      <TripsProvider>
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
                  path='/trips/:tripId?'
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
      </TripsProvider>
    </ParksProvider>
  );
}

export default App;
