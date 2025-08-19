import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCard } from "./PokemonCard";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [sortOption, setSortOption] = useState("id-asc");

  // Pagination state
  const [page, setPage] = useState(1);
  const limit = 20; // 20 Pokémon per page
  const offset = (page - 1) * limit;

  const API = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

  const fetchPokemon = async (url = API) => {
    try {
      setLoading(true);

      const res = await fetch(url);
      const data = await res.json();

      const detailRes = await Promise.all(
        data.results.map(async (curPokemon) => {
          const res = await fetch(curPokemon.url);
          return res.json();
        })
      );

      setPokemon(detailRes);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setLoading(false);
    }
  };

  const fetchByType = async (type) => {
    try {
      setLoading(true);

      if (type === "all") {
        await fetchPokemon(API);
        return;
      }

      const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await res.json();

      const detailRes = await Promise.all(
        data.pokemon.slice(0, limit).map(async (p) => {
          const res = await fetch(p.pokemon.url);
          return res.json();
        })
      );

      setPokemon(detailRes);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setLoading(false);
    }
  };

  // Fetch whenever page changes (and only for "all" type)
  useEffect(() => {
    if (selectedType === "all") {
      fetchPokemon(API);
    }
  }, [page]);

  // 🔎 Apply search
  let filteredPokemon = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔄 Apply sort
  filteredPokemon = [...filteredPokemon].sort((a, b) => {
    switch (sortOption) {
      case "id-asc":
        return a.id - b.id;
      case "id-desc":
        return b.id - a.id;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  if (loading) {
    return <h1>Loading Pokémon...</h1>;
  }

  if (error) {
    return <h1>Something went wrong. Please try again.</h1>;
  }

  return (
    <section className="container">
      <header>
        <h1>Pokémon Explorer</h1>
      </header>

      {/* Search */}
      <div className="pokemon-search">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Type Filter */}
      <div className="pokemon-filter">
        <label htmlFor="type">Filter by Type: </label>
        <select
          id="type"
          value={selectedType}
          onChange={(e) => {
            const type = e.target.value;
            setSelectedType(type);
            setPage(1); // reset to page 1 on type change
            fetchByType(type);
          }}
        >
          <option value="all">All</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="bug">Bug</option>
          <option value="normal">Normal</option>
          <option value="ground">Ground</option>
          <option value="poison">Poison</option>
          <option value="psychic">Psychic</option>
          <option value="rock">Rock</option>
          <option value="flying">Flying</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="fairy">Fairy</option>
          <option value="steel">Steel</option>
        </select>
      </div>

      {/* Sort */}
      <div className="pokemon-sort">
        <label htmlFor="sort">Sort By: </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="id-asc">ID ↑</option>
          <option value="id-desc">ID ↓</option>
          <option value="name-asc">Name A–Z</option>
          <option value="name-desc">Name Z–A</option>
        </select>
      </div>

      {/* Cards */}
      <ul className="cards">
        {filteredPokemon.map((curPokemon) => (
          <PokemonCard key={curPokemon.id} pokemonData={curPokemon} />
        ))}
      </ul>

      {/* Pagination controls */}
      {selectedType === "all" && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            ◀ Prev
          </button>
          <span>Page {page}</span>
          <button onClick={() => setPage((prev) => prev + 1)}>Next ▶</button>
        </div>
      )}
    </section>
  );
};
