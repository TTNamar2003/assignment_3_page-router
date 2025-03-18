"use client"
import React from 'react'
import { useEffect,useState } from 'react'


interface Recipe {
    id: number;
    name: string;
    prepTimeMinutes: number;
    servings: number;
}

export default function Recipes() {

    const [recipes,setRecipes]=useState<Recipe[]>([]);

    useEffect(()=>
    {
        fetch("https://dummyjson.com/recipes?limit=12")
        .then((res)=>res.json())
        .then((data)=> setRecipes(data.recipes));
        
    },[])

  return (
    <div className="container mx-auto p-6">
      
    <h2 className="text-2xl font-bold text-center mb-4">Recipes</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="border p-4 rounded shadow-md">
          <h3 className="text-lg font-semibold">{recipe.name}</h3>
          <p>Prep Time: {recipe.prepTimeMinutes} min</p>
          <p>Servings: {recipe.servings}</p>
        </div>
      ))}
    </div>
  </div>
  )
}
