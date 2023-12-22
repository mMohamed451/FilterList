import { Routes } from '@angular/router';
import { FilterableListComponent } from './filterable-list/filterable-list.component';
import { PostDetailsComponent } from './post-details/post-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: 'posts', component: FilterableListComponent },
  { path: 'post/:id', component: PostDetailsComponent }
];
