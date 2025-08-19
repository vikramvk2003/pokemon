import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Pokemon } from "./Pokemon";
import { PokemonDetail } from "./PokemonDetail";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pokemon />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
};
