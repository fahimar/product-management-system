import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  getCategories(): any{
    const categoryList = localStorage.getItem('category');
    if(!categoryList){
      const commonCategory = ['Electronics', 'Apparel', 'Beauty Products', 'Home Decor'];
      localStorage.setItem('category', JSON.stringify(commonCategory));
    }
    return JSON.parse(<string>localStorage.getItem('category'));
  }


  addCategory(category: string): void {
    const presentData = JSON.parse(<string>localStorage.getItem('category'));
    presentData.push(category);
    localStorage.setItem('category', JSON.stringify(presentData));
  }



  deleteCategory(category: string): void {
    const presentData: [] = JSON.parse(<string>localStorage.getItem('category'));

    // @ts-ignore
    const index: number = presentData.indexOf(category);
    if (index !== -1) {
      presentData.splice(index, 1);
    }

    localStorage.setItem('category', JSON.stringify(presentData));
  }


}
