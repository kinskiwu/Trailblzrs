import './App.css';
import Header from './components/Header';
import Parks from './pages/Parks';
import Trips from './pages/Trips';

import { BrowserRouter as Router, Routes, Route } from 'react-router';

function App() {
  return (
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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
