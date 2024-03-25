import { createContext } from "react";
import { useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList, setFavoritesList] = useState([]);


  const handleAddToFavorite = (getcurrentItem)=>{
    console.log(getcurrentItem);
    let cpyFavoritesList = [...favoritesList];
    const index = cpyFavoritesList.findIndex(item => item.id ===getcurrentItem.id)

    if (index === -1) {
        cpyFavoritesList.push(getcurrentItem);
    }else{
        cpyFavoritesList.splice(index);
    }
    setFavoritesList(cpyFavoritesList);
  }
  console.log('favourites List',favoritesList);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await res.json();
      console.log(data);
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
      }
    } catch (error) {
      console.log(error);
    }
    console.log(loading, recipeList);
  };
  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleSubmit,
        loading,
        recipeList,
        recipeDetailsData,
        setRecipeDetailsData,
        favoritesList,
        setFavoritesList,
        handleAddToFavorite
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
