import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ImageService } from '../services/image.service';
import { Observable } from 'rxjs';
import { BlogImage } from '../models/blog-image';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-image-selector',
  standalone: true,
  imports: [FormsModule, AsyncPipe, NgIf, NgFor],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.scss',
})
export class ImageSelectorComponent implements OnInit {
  private file?: File;
  fileName = '';
  title = '';
  imageService = inject(ImageService);
  images$?: Observable<BlogImage[]>;
  @ViewChild('form', { static: false }) uploadForm?: NgForm;

  ngOnInit(): void {
    this.loadImages();
  }

  private loadImages() {
    this.images$ = this.imageService.getAllImages();
  }

  onFileUploadChanged(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }
  onImageSelected(image: BlogImage) {
    this.imageService.selectImage(image);
  }

  onSubmit() {
    if (this.file && this.fileName !== '' && this.title != '') {
      this.imageService
        .uploadImage(this.file, this.fileName, this.title)
        .subscribe((data) => {
          this.uploadForm?.resetForm();
          this.loadImages();
        });
    }
  }
}
