import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/test');
        setData(response.data.message);
      } catch (err) {
        console.error(`Error fetching data: ${err.message}`);
      }
    };

    fetchData();
  }, []);

  return <h1>{data || 'Loading...'}</h1>;
}

export default App;
