package org.example.recipeweb.controller;

import org.example.recipeweb.entity.Recipe;
import org.example.recipeweb.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "http://localhost:5174")  // Adjust for production frontend domain
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    // Create recipe endpoint
    @PostMapping
    public ResponseEntity<Recipe> createRecipe(@RequestBody Recipe recipe) {
        Recipe savedRecipe = recipeService.saveRecipe(recipe);
        return ResponseEntity.ok(savedRecipe);
    }

    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @PutMapping("/{id}")
    public Recipe updateRecipe(@PathVariable Long id, @RequestBody Recipe recipe) {
        return recipeService.updateRecipe(id, recipe);
    }

    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable Long id) {
        recipeService.deleteRecipe(id);
    }
}

