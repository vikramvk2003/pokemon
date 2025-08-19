import { Link } from "react-router-dom";

export const PokemonCard =({pokemonData})=>{
    const {name, id, sprites} = pokemonData;
    return(
        <li className="pokemon-card">
            
           <Link to={`/pokemon/${name}`} className="pokemon-link">
            <figure>
                <img src={pokemonData.sprites.other.dream_world.front_default} alt={name} className="pokemon-image"/>
                {/* <h2>{name}</h2> */}
                {/* <p>#{id}</p> */}
            </figure>
            </Link>
            <p className="pokemon-id">#{id}</p>
            
            
             <h2 className="pokemon-name">{name}</h2>
            <div className="pokemon-info pokemon-highlight">
                <p>
                    {pokemonData.types.map((curType) => curType.type.name).join(", ")}
                 </p>
            </div>
            <div className="grid-three-cols">
                <p className="pokemon-info">
                    <span> Height:</span> {pokemonData.height}
                </p>
                <p className="pokemon-info">
                    <span> Weight:</span> {pokemonData.weight}
                </p>
                <p className="pokemon-info">
                    <span> speed:</span> {pokemonData.stats[5].base_stat}
                </p>
                <div className="pokemon-info">
                    <p>{pokemonData.base_experience}</p>
                    <span> Experience:</span>
                </div>
                <div className="pokemon-info">
                    <p>{pokemonData.stats[1].base_stat}</p>
                    <span>Attack:</span>
                </div>

                <div className="pokemon-info">
                    <p>
                        {pokemonData.abilities
                            .map((abilityInfo) => abilityInfo.ability.name)
                            .slice(0, 1)
                            .join(", ")}
                    </p>
          <span> Abilities: </span>
        </div>

            </div>

            
            
        </li>
    )
}