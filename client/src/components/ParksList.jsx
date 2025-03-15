import ParkCard from './ParkCard';
import Pagination from './Pagination';
import { useParks } from '../contexts/ParksContext';

const ParksList = () => {
  const { parks, parksLoading, parksError } = useParks();

  if (parksError) return <div className='error'>{parksError}</div>;

  return parksLoading ? (
    <div className='loader'>Loading...</div>
  ) : (
    <>
      <div className='park-list'>
        {parks.map((park) => (
          <ParkCard
            key={park.parkId}
            park={park}
          />
        ))}
      </div>
      <Pagination />
    </>
  );
};

export default ParksList;
