package org.example.recipeweb.service;

import org.example.recipeweb.entity.Recipe;
import org.example.recipeweb.entity.User;
import org.example.recipeweb.repository.RecipeRepo;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class RecipeService {
    private final RecipeRepo recipeRepository;
    private final UserService userService;

    public RecipeService(RecipeRepo recipeRepository, UserService userService) {
        this.recipeRepository = recipeRepository;
        this.userService = userService;
    }

    @Transactional
    public Recipe saveRecipe(Recipe recipe, String username) {
        recipe.setId(null);
        recipe.setUser(userService.findByUsername(username));
        return recipeRepository.save(recipe);
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Recipe getRecipe(Long id) {
        return recipeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Recipe not found"));
    }

    @Transactional
    public Recipe updateRecipe(Long id, Recipe updatedRecipe, String username) {
        Recipe recipe = getRecipe(id);
        checkOwner(recipe, username);

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

    @Transactional
    public void deleteRecipe(Long id, String username) {
        Recipe recipe = getRecipe(id);
        checkOwner(recipe, username);
        recipeRepository.delete(recipe);
    }

    private void checkOwner(Recipe recipe, String username) {
        User user = userService.findByUsername(username);
        if (recipe.getUser() == null || !recipe.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only change your own recipes");
        }
    }
}
