import React, { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Pokedex from './components/Pokedex';
import SearchBar from './components/SearchBar';
import { FavoriteProvider } from './contexts/FavContext/FavContext';
import { getPokemon, getPokemonData, searchPokemon } from './services/api';

const favoriteskeys = "favorites"

function App() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [favorites, SetFavorites] = useState([]);

  const itensPerPage = 27
  const fetchPokemons = async () => {
    try {
      setLoading(true)
      const data = await getPokemon(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url)
      });
      const result = await Promise.all(promises)
      setPokemons(result)
      setLoading(false)
      setTotalPages(Math.ceil(data.count / itensPerPage))
    } catch (error) {
      console.log("fetchpokemons error: ", error)
    }
  }

const loadFavoritePokemons = () =>{
  const pokemons = JSON.parse(window.localStorage.getItem(favoriteskeys))
  SetFavorites(pokemons)
}

  useEffect(() => {
    loadFavoritePokemons();
  }, [page])

  useEffect(() => {
    fetchPokemons();
  }, [page])

  const updateFavoritePokemons = (name) => {
    const updateFavorite = [...favorites]
    const favoriteIndex = favorites.indexOf(name)
    if(favoriteIndex >= 0){
      updateFavorite.slice(favoriteIndex, 1);
    }else {
      updateFavorite.push(name);
    }
    window.localStorage.setItem(favoriteskeys, JSON.stringify(updateFavorite))
    SetFavorites(updateFavorite);
  }

  const HandleOnSearch = async (pokemon) => {
    if(!pokemon) {
      return fetchPokemons();
    }
    setLoading(true)
    setNotFound(false)
    const result = await searchPokemon(pokemon)
    if(!result){
      setNotFound(true)
    } else {
      setPokemons([result])
      setPage(0)
      setTotalPages(1)
    }
    setLoading(false)
  }

  return (
    <FavoriteProvider 
    value={{
      favoritePokemons: favorites, 
      updateFavoritePokemons:updateFavoritePokemons}}>
    <div>
      <NavBar />
      <SearchBar HandleOnSearch={HandleOnSearch}/>
      {notFound ? (
        <div className='not-found'>Nenhum pokemon encontrado!!!</div>
      ) : (
      <Pokedex 
        pokemons={pokemons} 
        loading={loading}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />)}
    </div>
    </FavoriteProvider>
  );
}

export default App;
