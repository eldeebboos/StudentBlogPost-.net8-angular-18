import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Blogpost } from '../models/blogpost';

@Injectable({
  providedIn: 'root',
})
export class BlogpostService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl + '/api/BlogPost';

  addBlogpost(blogpost: Blogpost) {
    return this.http.post<Blogpost>(this.baseUrl, blogpost);
  }
  updateBlogpost(blogpost: Blogpost) {
    return this.http.put<Blogpost>(this.baseUrl + '/' + blogpost.id, blogpost);
  }
  deleteBlogpost(blogpost: Blogpost) {
    return this.http.delete(this.baseUrl + '/' + blogpost.id);
  }
  getBlogposts() {
    return this.http.get<Blogpost[]>(this.baseUrl);
  }
  getBlogpost(id: string) {
    return this.http.get<Blogpost>(`${this.baseUrl}/${id}`);
  }
  getBlogpostByUrlHandle(urlHandle: string) {
    return this.http.get<Blogpost>(`${this.baseUrl}/${urlHandle}`);
  }
}
