import { Recipe } from './../../recipe.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent {
  @Input('recipe-item') recipe: Recipe;
  @Output() recipeSelected: EventEmitter<void> = new EventEmitter<void>();

  onRecipeSelect(): void {
    this.recipeSelected.emit();
  }
}
