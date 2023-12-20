"use client";
import React from "react";

type Recipe = {
  title: string;
  page_content: string;
  metadata: {
    image: string;
    link: string;
  };
};

type Props = { recipeList: Recipe[] };

const RecipeList = ({ recipeList }: Props) => {
  console.log(recipeList);
  const recipes = recipeList.slice(0, 4).map((recipe) => {
    const parts = recipe.page_content.split("\n");
    const title = parts[0].slice(7);
    const malzemeler = parts[1].slice(13);
    const tarif = parts[3].slice(8);

    return {
      title,
      ingredients: malzemeler.split(",").join(", "),
      metadata: recipe.metadata,
      steps: tarif,
    };
  });

  return (
    <div
      className="flex my-2 mb-6 pr-[-10rem] overflow-x-scroll
        w-[calc(100%-30px)] md:w-full"
    >
      {recipes.map((recipe) => (
        <div
          key={recipe.title}
          className="flex gap-2 px-2 whitespace-pre-wrap "
        >
          <div className="rounded-lg px-3 text-sm py-2 shadow-md ring-1 ring-gray-900/10 w-60 bg-yellow-100 hover:bg-yellow-200">
            <img className="rounded-md mb-2" src={recipe.metadata.image} />
            <p className="font-bold mb-2 min-h-[2.2rem]">{recipe.title}</p>
            <p className="italic mb-4 text-xs">
              {recipe.ingredients?.substring(0, 150)}
            </p>
            {/* <a
              href={recipe.metadata.link}
              target="_blank"
              className="text-xs text-blue-400"
            >
              Tarife git →
            </a> */}
            {/* <p>{recipe.steps?.substring(0, 200)}</p> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
