import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signupForm: FormGroup;
  forbiddenUsernames = ["Iova", "Claudiu"];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl("", [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(
          "",
          [Validators.required, Validators.email],
          [this.forbiddenEmails]
        ),
      }),
      gender: new FormControl("male", Validators.required),
      hobbies: new FormArray([]),
    });

    // Hook for a value change
    // this.signupForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });

    // Hook for a status change
    // this.signupForm.statusChanges.subscribe((value) => {
    //   console.log(value);
    // });

    // this.signupForm.setValue({
    //   userData: {
    //     username: "Iovaa",
    //     email: "iovaclaudiu@iova.com",
    //   },
    //   gender: "male",
    //   hobbies: ["Cooking"],
    // });
  }

  onSubmit(): void {
    console.log(this.signupForm);
  }

  get controls() {
    return (this.signupForm.get("hobbies") as FormArray).controls;
  }

  onAddHobby(): void {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get("hobbies")).push(control);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsFobbiden: true };
    }
    // trebuie sa fie null pentru un validator ca sa functioneaza, asta ii spune lui angular ca este valid
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
