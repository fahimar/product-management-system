import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  newCategory: string = '';
  categoryList = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.categoryList = this.categoryService.getCategories();
  }

  addCategory(): void {
    if (this.newCategory.trim()) {
      this.categoryService.addCategory(this.newCategory);
      this.newCategory = '';
      this.loadData();
    }
  }

  deleteCat(cat: any): void {
    this.categoryService.deleteCategory(cat);
    this.loadData();
  }
}
