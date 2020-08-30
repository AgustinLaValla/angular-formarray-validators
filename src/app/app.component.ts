import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "Angular Reactive Forms: Array Validators";
  public myForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
    console.log(this.myForm);
  }

  initializeForm() {
    this.myForm = this.fb.group({
      author: ["", [Validators.required, Validators.maxLength(40)]],
      books: this.fb.array([this.buildBooks()])
    });
  }

  buildBooks(): FormGroup {
    return this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(40)]],
      stars: ["", [Validators.required, this.range(1, 5)]]
    });
  }

  range(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (
        (control.value || control.value === 0) &&
        (isNaN(control.value) || control.value < min || control.value > max)
      ) {
        return { range: true };
      }
      return null;
    };
  }

  addNewBook() {
    this.books.push(this.buildBooks());
  }

  removeBook(i: number) {
    this.books.removeAt(i);
  }

  get books(): FormArray {
    return this.myForm.get("books") as FormArray;
  }

  submitHandler() {}
}
