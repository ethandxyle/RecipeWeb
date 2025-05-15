package org.example.recipeweb.service;

import org.example.recipeweb.entity.Recipe;
import org.example.recipeweb.entity.User;
import org.example.recipeweb.repository.RecipeRepo;
import org.example.recipeweb.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepo recipeRepository;

    @Autowired
    private UserRepo userRepository;

    // Save new recipe (no user association in this example)
    public Recipe saveRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Recipe updateRecipe(Long id, Recipe updatedRecipe) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        recipe.setTitle(updatedRecipe.getTitle());
        recipe.setDescription(updatedRecipe.getDescription());
        recipe.setDifficulty(updatedRecipe.getDifficulty());
        recipe.setCategory(updatedRecipe.getCategory());
        recipe.setIngredients(updatedRecipe.getIngredients());
        recipe.setCalories(updatedRecipe.getCalories());
        recipe.setProtein(updatedRecipe.getProtein());
        recipe.setCookingTime(updatedRecipe.getCookingTime());

        return recipeRepository.save(recipe);
    }

    public void deleteRecipe(Long id) {
        recipeRepository.deleteById(id);
    }
}
