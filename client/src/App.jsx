import './App.css';
import Header from './components/Header';
import ParksList from './components/ParksList';

function App() {

  return (
    <div className='app'>
      <Header />
      <main className='main-content'>
        <h2 className='page-title'>
          <span className='icon'>🥾</span> Explore Parks
        </h2>
        <ParksList />
      </main>
    </div>
  );
}

export default App;
