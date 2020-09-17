import { AuthService } from "./../auth/auth.service";
import { Recipe } from "./../recipes/recipe.model";
import { environment } from "./../../environments/environment";
import { RecipeService } from "./../recipes/recipe.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, tap, take, exhaustMap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http.put(`${environment.apiUrl}`, recipes).subscribe((response) => {
      console.log(response);
    });
  }

  fetchRecipes() {
    // This is the part without interceptor
    // return this.authService.user.pipe(
    //   take(1),
    //   exhaustMap((user) => {
    //     return this.http.get<Recipe[]>(`${environment.apiUrl}`, {
    //       params: new HttpParams().set("auth", user.token),
    //     });
    //   }),
    //   map((recipes) => {
    //     return recipes.map((recipe) => {
    //       return {
    //         ...recipe,
    //         ingredients: recipe.ingredients ? recipe.ingredients : [],
    //       };
    //     });
    //   }),
    //   tap((recipes) => {
    //     this.recipesService.setRecipes(recipes);
    //   })
    // );

    // This is the part with interceptor
    return this.http.get<Recipe[]>(`${environment.apiUrl}`).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipesService.setRecipes(recipes);
      })
    );
  }
}
