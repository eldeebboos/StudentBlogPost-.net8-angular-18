import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../models/category';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss',
})
export class EditCategoryComponent implements OnInit {
  route = inject(ActivatedRoute);
  categoryService = inject(CategoryService);
  router = inject(Router);

  id: string | null = null;
  model?: Category;

  subscribtion: Subscription[] = [];
  onSubmit() {
    if (this.model && this.id) {
      this.subscribtion.push(
        this.categoryService.updateCategory(this.model).subscribe((data) => {
          this.router.navigate(['/admin/categories']);
        })
      );
    }
  }
  ngOnInit(): void {
    const paramsub = this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.subscribtion.push(
          this.categoryService.getCategory(this.id).subscribe((data) => {
            this.model = data;
          })
        );
      }
    });
    this.subscribtion.push(paramsub);
  }

  ngOnDestroy(): void {
    this.subscribtion.forEach((sub) => sub.unsubscribe());
  }
}
