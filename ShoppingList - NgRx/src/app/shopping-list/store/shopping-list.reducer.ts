import * as ShoppingListActions from "./shopping-list.actions";
import { Ingredient } from "../../shared/ingredient.model";

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          (<ShoppingListActions.AddIngredient>action).payload,
        ],
      };
    }

    case ShoppingListActions.ADD_INGREDIENTS: {
      return {
        ...state,
        ingredients: state.ingredients.concat(
          (<ShoppingListActions.AddIngredients>action).payload
        ),
      };
    }

    case ShoppingListActions.UPDATE_INGREDIENT: {
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngrediet = {
        ...ingredient,
        ...(<ShoppingListActions.UpdateIngredient>action).payload,
      };

      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngrediet;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    }

    case ShoppingListActions.DELETE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== state.editedIngredientIndex;
        }),
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    }

    case ShoppingListActions.START_EDIT: {
      const payloadIndex = (<ShoppingListActions.StartEdit>action).payload;
      return {
        ...state,
        editedIngredientIndex: payloadIndex,
        editedIngredient: { ...state.ingredients[payloadIndex] },
      };
    }

    case ShoppingListActions.STOP_EDIT: {
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    }
    default:
      return state;
  }
}
