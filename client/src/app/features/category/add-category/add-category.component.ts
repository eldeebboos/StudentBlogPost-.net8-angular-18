import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent implements OnDestroy {
  categoryService = inject(CategoryService);
  private router = inject(Router);
  model: Category;
  private subscribtion?: Subscription;

  constructor() {
    this.model = {
      name: '',
      urlHandle: '',
    };
  }
  onSubmit() {
    this.subscribtion = this.categoryService.addCategory(this.model).subscribe({
      next: (response) => {
        this.model.name = '';
        this.model.urlHandle = '';
        this.router.navigate(['/admin/categories']);
      },
      error: (error) => {
        console.error('error', error);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscribtion?.unsubscribe();
  }
}
