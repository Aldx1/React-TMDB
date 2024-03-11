import MoviesContainer from "./components/MoviesContainer";
import MovieNavbar from "./components/MovieNavbar";
import "./styles/App.css";
import { MovieContextProvider } from "./context/MovieContextProvider";

function App() {
  return (
    <>
      <MovieContextProvider>
        <MovieNavbar />
        <MoviesContainer />
      </MovieContextProvider>
    </>
  );
}

export default App;
