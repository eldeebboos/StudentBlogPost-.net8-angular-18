import { Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostslListComponent } from './features/blog-post/blogpostsl-list/blogpostsl-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { HomeComponent } from './public/home/home.component';
import { BlogDetailsComponent } from './public/blog-details/blog-details.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { authGuard } from './features/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'blog/:url',
    component: BlogDetailsComponent,
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      {
        path: 'categories',
        children: [
          {
            path: '',
            component: CategoryListComponent,
          },
          {
            path: 'add',
            component: AddCategoryComponent,
          },
          {
            path: 'edit/:id',
            component: EditCategoryComponent,
          },
        ],
      },
      {
        path: 'blogposts',

        children: [
          {
            path: '',
            component: BlogpostslListComponent,
          },
          {
            path: 'add',
            component: AddBlogpostComponent,
          },
          {
            path: 'edit/:id',
            component: EditBlogpostComponent,
          },
        ],
      },
    ],
  },
];
