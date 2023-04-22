import React from "react";
const FavContext = React.createContext({
    favoritePokemons: [],
    updateFavoritePokemons: (id) => null
})

export const FavoriteProvider = FavContext.Provider

export default FavContext;