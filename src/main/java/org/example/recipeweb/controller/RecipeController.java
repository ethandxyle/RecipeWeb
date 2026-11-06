package org.example.recipeweb.controller;

import jakarta.validation.Valid;
import org.example.recipeweb.entity.Recipe;
import org.example.recipeweb.service.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {
    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @PostMapping
    public ResponseEntity<Recipe> createRecipe(@Valid @RequestBody Recipe recipe, Principal principal) {
        Recipe savedRecipe = recipeService.saveRecipe(recipe, principal.getName());
        return ResponseEntity.created(URI.create("/api/recipes/" + savedRecipe.getId())).body(savedRecipe);
    }

    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @GetMapping("/{id}")
    public Recipe getRecipe(@PathVariable Long id) {
        return recipeService.getRecipe(id);
    }

    @PutMapping("/{id}")
    public Recipe updateRecipe(@PathVariable Long id, @Valid @RequestBody Recipe recipe, Principal principal) {
        return recipeService.updateRecipe(id, recipe, principal.getName());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRecipe(@PathVariable Long id, Principal principal) {
        recipeService.deleteRecipe(id, principal.getName());
    }
}
