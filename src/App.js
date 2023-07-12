import React, { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Pokedex from './components/Pokedex';
import SearchBar from './components/SearchBar';
import { FavoriteProvider } from './contexts/FavContext/FavContext';
import { getPokemon, getPokemonData } from './services/api';

const favoriteskeys = "favorites"

function App() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [totalPokemons, setTotalPokemons] = useState([]);
  const [favorites, SetFavorites] = useState([]);

  const itensPerPage = 27
  const itensTotal = 151


  const ChargeTotal = async () => {
    const totalData = await getPokemon(itensTotal, 0)
    const totalPromises = totalData.results.map(async (pokemon) => {
      return await getPokemonData(pokemon.url)
    });

    const totalResult = await Promise.all(totalPromises)
    setTotalPokemons(totalResult)
  }

  const fetchPokemons = async () => {
    try {
      setLoading(true)
      setNotFound(false)
      const data = await getPokemon(itensPerPage, itensPerPage * page)
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

  const loadFavoritePokemons = () => {
    const pokemon = JSON.parse(window.localStorage.getItem(favoriteskeys)) || []
    SetFavorites(pokemon)
  }

  useEffect(() => {
    loadFavoritePokemons()
  }, [page])

  useEffect(() => {
    fetchPokemons()
    ChargeTotal()
  }, [page])

  const updateFavoritePokemons = (name) => {
    const updateFavorite = [...favorites]
    const favoriteIndex = favorites.indexOf(name)
    if (favoriteIndex >= 0) {
      updateFavorite.splice(favoriteIndex, 1);
    } else {
      updateFavorite.push(name);
    }
    window.localStorage.setItem(favoriteskeys, JSON.stringify(updateFavorite))
    SetFavorites(updateFavorite);
  }

  const HandleOnSearch = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemons();
    }
    setLoading(true)
    setNotFound(false)
    pokemonFilter(pokemon)
    console.log(pokemons)
    if (pokemons.length === 0) {
      setNotFound(true)
    }
    else {
      setPage(0)
      setTotalPages(1)
    }
    setLoading(false)
  }

  const pokemonFilter = (name) => {
    var filtredpokemons = [];
    for (var i in totalPokemons) {
      if (totalPokemons[i].name.includes(name)) {
        filtredpokemons.push(totalPokemons[i])
      }
    }
    setPokemons(filtredpokemons);
  }

  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons
      }}>
      <div>
        <NavBar
          favorites={favorites} />
        <SearchBar HandleOnSearch={HandleOnSearch} />
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
