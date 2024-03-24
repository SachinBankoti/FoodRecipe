import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeList from "../../components/recipelist/RecipeList";

export default function Home() {
  const { recipeList, loading } = useContext(GlobalContext);

  if (loading) return <div>Loading...Please wait!</div>;

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {recipeList.length > 0 ? (
        recipeList.map((item) => <RecipeList item={item} />)
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Nothing to show. Please search something
          </p>
        </div>
      )}
    </div>
  );
}