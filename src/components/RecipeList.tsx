import React from "react";

type Recipe = {
  title: string;
  page_content: string;
  image: string;
};

type Props = { recipeList: Recipe[] };

const RecipeList = ({ recipeList }: Props) => {
  const recipes = recipeList.slice(0, 4).map((recipe) => {
    const tarif = recipe.page_content.split("Tarif:  ")[1];
    const beforeTarif = recipe.page_content.split("Tarif:  ")[0];
    const malzemeler = beforeTarif.split("Malzemeler: ")[1];
    const beforeMalzemeler = beforeTarif.split("Malzemeler: ")[0];
    const title = beforeMalzemeler.slice(8);

    return {
      title,
      ingredients: malzemeler.split(",").join(", "),
      steps: tarif,
    };
  });

  return (
    <div className="flex">
      {recipes.map((recipe) => (
        <div className="flex flex-col gap-2 px-2 ">
          <div
            key={recipe.title}
            className="flex whitespace-pre-wrap bg-neutral-100 hover:bg-neutral-200"
          >
            <div className="rounded-lg px-3 text-sm py-2 shadow-md ring-1 ring-gray-900/10 w-60">
              <p className="font-bold mb-2 min-h-[2.4rem]">{recipe.title}</p>
              <p className="italic mb-4">
                {recipe.ingredients?.substring(0, 100)}
              </p>
              <p>{recipe.steps?.substring(0, 200)}</p>
              {/* <img src={recipe.image} /> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
