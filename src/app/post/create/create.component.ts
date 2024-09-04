import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import {CategoryService} from "../../category.service";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form!: FormGroup;
  categories: string[] = [];

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      quantity: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      unitPrice: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      createDate: new FormControl(''),
    });

    // @ts-ignore
    /*this.categoryService.categories$.subscribe(categories => {
      this.categories = categories;
    });*/
    this.categories = this.categoryService.getCategories();
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      const formData = this.form.value;
      const isLocalData = localStorage.getItem('product');

      if (isLocalData != null) {
        const localArray = JSON.parse(isLocalData);
        formData.id = localArray.length ? Math.max(...localArray.map((p: any) => p.id)) + 1 : 1;
        localArray.push(formData);
        localStorage.setItem('product', JSON.stringify(localArray));
      } else {
        formData.id = 0;
        const localArray = [formData];
        localStorage.setItem('product', JSON.stringify(localArray));
      }
      this.router.navigateByUrl('product/index');
    }
  }
}
