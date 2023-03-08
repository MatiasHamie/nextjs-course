import { NextPage, GetStaticProps } from "next";
import { Layout } from "../components/layouts/Layout";
import pokeApi from "../api/pokeApi";
import { PokemonListResponse, SmallPokemon } from "@/interfaces";
import { Card, Grid, Row, Text } from "@nextui-org/react";
import PokemonCard from "@/components/pokemon/PokemonCard";

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = (props) => {
  console.log(props);
  const pokemons: SmallPokemon[] = props.pokemons;
  return (
    <Layout title="Listado de Pokemons">
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((p) => (
          <PokemonCard pokemon={p} key={p.id} />
        ))}
      </Grid.Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("pokemon?limit=151");

  const pokemons = data.results.map((pokemon, i) => {
    return {
      ...pokemon,
      id: `${i + 1}`,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
        i + 1
      }.svg`,
    };
  });

  return {
    props: { pokemons },
  };
};
export default HomePage;
