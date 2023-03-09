import { FavouritePokemons } from "@/components/pokemon";
import { NoFavourites } from "@/components/ui";
import { localFavourites } from "@/utils";
import { useState, useEffect } from "react";
import { Layout } from "../../components/layouts/Layout";

const Favourites = () => {
  const [favouritePokemons, setFavouritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavouritePokemons(localFavourites.pokemons());
  }, []);

  return (
    <Layout title="Pokémons - Favoritos">
      {favouritePokemons.length > 0 ? (
        <FavouritePokemons pokemons={favouritePokemons} />
      ) : (
        <NoFavourites />
      )}
    </Layout>
  );
};

export default Favourites;
