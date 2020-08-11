import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) {}

  onAddToShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }
}
