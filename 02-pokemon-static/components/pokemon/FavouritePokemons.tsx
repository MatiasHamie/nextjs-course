import { Grid } from "@nextui-org/react";
import React, { FC } from "react";
import { FavouritePokemonCard } from "./FavouritePokemonCard";

interface Props {
  pokemons: number[];
}

export const FavouritePokemons: FC<Props> = ({ pokemons }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {pokemons.map((id) => (
        <FavouritePokemonCard pokemonId={id} />
      ))}
    </Grid.Container>
  );
};
