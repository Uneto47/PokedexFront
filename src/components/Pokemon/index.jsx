import React, { useContext } from "react"
import FavContext from "../../contexts/FavContext/FavContext"
import "./index.css"

const Pokemon = (props) => {
    const { favoritePokemons, updateFavoritePokemons } = useContext(FavContext)
    const { pokemon } = props
    const HandleHeartOnClick = () => {
        updateFavoritePokemons(pokemon.name) }
        
    const heart = favoritePokemons.includes(pokemon.name) ? "❤️" : "🤍"

    return (
        <div className="Card-pokemon">
            <div className="poke-img-container">
                <img
                    alt={pokemon.name}
                    src={pokemon['sprites']['versions']['generation-v']['black-white']['animated']['front_default']}
                    className="pokemon-img" />
            </div>
            <div className="card-body">
                <div className="card-top">
                    <h3> {pokemon.name} </h3>
                    <div>#{pokemon.id}</div>
                </div>
                <div className="card-botton">
                    <div className="pokemon-type">
                        {pokemon.types.map((type, index) => {
                            return (
                                <div key={index} className="pokemon-type-text">{type.type.name}</div>
                            )
                        })}
                    </div>
                    <button className="pokemon-fav-btn" onClick={HandleHeartOnClick}>
                        {heart}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Pokemon;


