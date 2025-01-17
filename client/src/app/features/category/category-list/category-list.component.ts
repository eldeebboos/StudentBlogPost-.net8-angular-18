import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements OnInit {
  categoryService = inject(CategoryService);
  categories$?: Observable<Category[]>;

  ngOnInit(): void {
    this.loadCategories();
  }

  deleteCategory(category: Category) {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(category).subscribe(() => {
          this.loadCategories();
        });
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  }

  private loadCategories() {
    this.categories$ = this.categoryService.getCategories();
  }
}
