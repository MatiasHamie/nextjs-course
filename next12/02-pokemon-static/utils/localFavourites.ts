const toggleFavourite = (id: number) => {
  console.log("toogle favourite llamado");

  let favourites: number[] = JSON.parse(
    localStorage.getItem("favourites") || "[]"
  );

  if (favourites.includes(id)) {
    console.log("sita, entro al if");
    favourites = favourites.filter((pokeId) => pokeId !== id);
  } else {
    console.log("nota, entro al else");
    favourites.push(id);
  }

  localStorage.setItem("favourites", JSON.stringify(favourites));
};

const existInFavourites = (id: number): boolean => {
  if (typeof window === "undefined") {
    return false;
  }
  const favourites: number[] = JSON.parse(
    localStorage.getItem("favourites") || "[]"
  );

  return favourites.includes(id);
};

const pokemons = (): number[] => {
  return JSON.parse(localStorage.getItem("favourites") || "[]");
};

export default { toggleFavourite, existInFavourites, pokemons };
