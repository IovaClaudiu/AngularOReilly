import { RecipeService } from './../../recipe.service';
import { Recipe } from './../../recipe.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent {
  @Input('recipe-item') recipe: Recipe;

  constructor(private recipeService: RecipeService) {}

  onRecipeSelect(): void {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
