import './index.css'
import React from "react";
import Pokemon from '../Pokemon';
import Pagination from '../pagination';

const Pokedex = (props) => {
    const { pokemons, loading, setPage, page, totalPages} = props
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
                <h1>Pokedex</h1>
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
                            <Pokemon key={index} pokemon={pokemon}/>
                        )
                    })}
            </div>)
            }
        </div>
    )
}

export default Pokedex;