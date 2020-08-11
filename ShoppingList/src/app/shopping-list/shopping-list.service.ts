import { Ingredient } from './../shared/ingredient.model';
import { Injectable, OnInit, EventEmitter } from '@angular/core';

@Injectable()
export class ShoppingListService implements OnInit {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  addIngredientEvent: EventEmitter<Ingredient[]> = new EventEmitter<
    Ingredient[]
  >();

  ngOnInit() {}

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.addIngredientEvent.emit(this.getIngredients());
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.addIngredientEvent.emit(this.getIngredients());
  }
}
