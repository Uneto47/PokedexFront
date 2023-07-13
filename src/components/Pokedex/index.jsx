import './index.css'
import React, { useContext } from "react";
import Pokemon from '../Pokemon';
import Pagination from '../pagination';
import FavContext from '../../contexts/FavContext/FavContext';


const Pokedex = (props) => {
    const { pokemons, loading, setPage, page, totalPages, setPokemonData} = props
    const { favoritePokemons } = useContext(FavContext);

    const HandleOnLeftClick = () =>{
        if(page>0){
            setPage(page-1)
        }
    }
    const HandleOnRigthClick = () =>{
        if(page+1 !== totalPages){
            setPage(page+1)
        }
    }
    return (
        <div>
            <div className="pokedex-header">
                <div>
                    {favoritePokemons.length} ❤️ FAVORITE
                </div>
                <Pagination
                page={page+1}
                totalPages={totalPages}
                onLeftClick={HandleOnLeftClick}
                onRigthClick={HandleOnRigthClick}
                />
            </div>
            {loading ? (
            <div>Carregando...</div>
            ) : (
            <div className='pokedex-grid'>
                    {pokemons && pokemons.map((pokemon, index) => {
                        return (
                            <Pokemon setPokemonData={setPokemonData} key={index} pokemon={pokemon}/>
                        )
                    })}
            </div>)
            }
        </div>
    )
}

export default Pokedex;