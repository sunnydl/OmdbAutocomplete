import Autocomplete from './components/Autocomplete';
import { fetchMovies } from './api'

function App() {
  return (
    <div>
      <Autocomplete
        disabled={false}
        limit={5}
        name="autocomplete-movies"
        placeholder="Please enter movie title"
        searchAPI={fetchMovies}
      />
    </div>
  );
}

export default App;
