import { Ingredient } from './../../shared/ingredient.model';
import {
  Component,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;

  @Output() addedIngredientEvent = new EventEmitter<Ingredient>();

  onAddClick(): void {
    this.addedIngredientEvent.emit(
      new Ingredient(
        this.nameInput.nativeElement.value,
        this.amountInput.nativeElement.value
      )
    );
  }
}
