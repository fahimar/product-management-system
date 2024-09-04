import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Product } from '../product';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id!: number;
  post!: Product;
  form!: FormGroup;
  errorMessage: string = ''; // To store error message for category limit

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['productId'];
    this.initForm();
    this.loadPost();
  }

  private initForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      unitPrice: new FormControl('', Validators.required),
      createDate: new FormControl(''),
    });
  }

  private loadPost(): void {
    const posts = this.getPostsFromStorage();
    this.post = posts.find((p) => p.id === this.id)!;
    if (this.post) {
      this.form.patchValue(this.post);
    } else {
      console.error('Post not found');
      this.router.navigateByUrl('/product/index');
    }
  }

  get f() {
    return this.form?.controls || {};
  }

  submit(): void {
    if (this.form.valid) {
      const updatedPost: Product = { ...this.form.value, id: this.id };
      const posts = this.getPostsFromStorage();

      // Count the number of products in the same category
      const categoryCount = posts.filter(
        (p) => p.category === updatedPost.category
      ).length;

      // Check if the limit of 10 products for the same category is reached
      if (categoryCount >= 10) {
        this.errorMessage = `Cannot add more than 10 products in the category "${updatedPost.category}"!`;
        return; // Prevent form submission if validation fails
      }

      // Update the post if validation passes
      const index = posts.findIndex((p) => p.id === this.id);
      if (index !== -1) {
        posts[index] = updatedPost;
        this.savePostsToStorage(posts);
        console.log('Post updated successfully!');
        this.router.navigateByUrl('/product/index');
      }
    }
  }

  private getPostsFromStorage(): Product[] {
    const isLocalData = localStorage.getItem('product');
    return isLocalData ? JSON.parse(isLocalData) : [];
  }

  private savePostsToStorage(posts: Product[]): void {
    localStorage.setItem('product', JSON.stringify(posts));
  }
}
