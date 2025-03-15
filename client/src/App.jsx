import './App.css';
import Header from './components/Header';
import Parks from './pages/Parks';
import Trips from './pages/Trips';
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
              />{' '}
              //Temp: will replace with Home when ready
              <Route
                path='/parks'
                element={<Parks />}
              />
              <Route
                path='/trips'
                element={<Trips />}
              />
            </Routes>
          </main>
        </div>
      </Router>
    </ParksProvider>
  );
}

export default App;
