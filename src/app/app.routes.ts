import { Routes } from '@angular/router';

import { IndexComponent } from './post/index/index.component';
import { CreateComponent } from './post/create/create.component';
import { EditComponent } from './post/edit/edit.component';
import {AddCategoryComponent} from "./post/add-calegory/add-category.component";

export const routes: Routes = [
	  {path: '', redirectTo: 'product/index', pathMatch: 'full'},
  	{ path: 'product/index', component: IndexComponent },
  	{ path: 'product/add-category', component: AddCategoryComponent },
  	{ path: 'product/create', component: CreateComponent },
  	{ path: 'product/:productId/edit', component: EditComponent }
  ];
