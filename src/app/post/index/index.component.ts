import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  posts: Product[] = [];
  filteredPosts: Product[] = [];
  searchQuery: string = '';

  pages: number[] = [];
  pageSizeOptions = [5, 10, 25];
  pageSize = 5;
  currentPage = 1;
  totalPages!: number;
  pagedPosts: Product[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadPosts();
    this.filteredPosts = this.posts;
    this.calculateTotalPages();
    this.updatePagedPosts();
  }

  loadPosts(): void {
    const isLocalData = localStorage.getItem('product');
    if (isLocalData) {
      this.posts = JSON.parse(isLocalData);
      this.filteredPosts = this.posts;
      this.calculateTotalPages();
      this.updatePagedPosts();
    }
  }

  searchPosts(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredPosts = this.posts.filter(
      (post) =>
        post.name.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query)
    );
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updatePagedPosts();
  }

  deletePost(id: number): void {
    this.posts = this.posts.filter((item) => item.id !== id);
    this.filteredPosts = this.posts;
    localStorage.setItem('product', JSON.stringify(this.posts));
    this.calculateTotalPages();
    this.updatePagedPosts();
    console.log('Post deleted successfully!');
  }

  onPageSizeChange(event: any): void {
    this.pageSize = +event.target.value; // Convert value to a number
    this.currentPage = 1; // Reset to the first page
    this.calculateTotalPages();
    this.updatePagedPosts();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedPosts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedPosts();
    } else {
      console.log('No more pages left!');
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedPosts();
    }
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredPosts.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updatePagedPosts(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedPosts = this.filteredPosts.slice(start, end);
  }
}
