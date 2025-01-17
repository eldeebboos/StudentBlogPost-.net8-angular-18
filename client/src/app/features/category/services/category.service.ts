import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../models/category';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  baseUrl = environment.apiUrl + '/api/categories';

  addCategory(category: Category) {
    return this.http.post<Category>(this.baseUrl, category);
  }
  updateCategory(category: Category) {
    return this.http.put<Category>(this.baseUrl + '/' + category.id, category);
  }
  deleteCategory(category: Category) {
    return this.http.delete(this.baseUrl + '/' + category.id);
  }

  getCategories() {
    return this.http.get<Category[]>(this.baseUrl);
  }

  getCategory(id: string) {
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }
}
