package org.example.recipeweb.repository;

import org.example.recipeweb.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepo extends JpaRepository<Recipe, Long> {}

