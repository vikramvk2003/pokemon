import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        setPokemon(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchPokemonDetail();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Something went wrong...</h2>;

  return (
    <div className="pokemon-detail">
      <h1>{pokemon.name.toUpperCase()}</h1>
      <img
        src={pokemon.sprites.other.dream_world.front_default}
        alt={pokemon.name}
        className="pokemon-image"
      />

      <h3>Types: {pokemon.types.map((t) => t.type.name).join(", ")}</h3>

      <h3>Abilities:</h3>
      <ul>
        {pokemon.abilities.map((a) => (
          <li key={a.ability.name}>{a.ability.name}</li>
        ))}
      </ul>

      <h3>Stats:</h3>
      <ul>
        {pokemon.stats.map((s) => (
          <li key={s.stat.name}>
            {s.stat.name}: {s.base_stat}
          </li>
        ))}
      </ul>

      <h3>Moves (first 10):</h3>
      <ul>
        {pokemon.moves.slice(0, 10).map((m) => (
          <li key={m.move.name}>{m.move.name}</li>
        ))}
      </ul>
    </div>
  );
};
