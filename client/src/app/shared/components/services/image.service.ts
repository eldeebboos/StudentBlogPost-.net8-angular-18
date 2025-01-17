import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogImage } from '../models/blog-image';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl + '/api/images';
  selectedImage$: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id: '',
    title: '',
    fileName: '',
    url: '',
    fileExtention: '',
    dateCreated: new Date(),
  });

  getAllImages(): Observable<BlogImage[]> {
    return this.http.get<BlogImage[]>(this.baseUrl);
  }

  selectImage(image: BlogImage) {
    this.selectedImage$.next(image);
  }

  onSelectImage(): Observable<BlogImage> {
    return this.selectedImage$.asObservable();
  }

  uploadImage(
    file: File,
    fileName: string,
    title: string
  ): Observable<BlogImage> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);
    return this.http.post<BlogImage>(this.baseUrl, formData);
  }
}
