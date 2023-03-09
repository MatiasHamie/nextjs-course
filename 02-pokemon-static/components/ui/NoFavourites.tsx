import { Container, Image, Text } from "@nextui-org/react";

export const NoFavourites = () => {
  return (
    <Container
      css={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 100px)",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <Text h1>No hay favoritos</Text>
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/150.svg"
        alt="pokemon image"
        width={250}
        height={250}
        css={{ opacity: 0.2 }}
      />
    </Container>
  );
};
