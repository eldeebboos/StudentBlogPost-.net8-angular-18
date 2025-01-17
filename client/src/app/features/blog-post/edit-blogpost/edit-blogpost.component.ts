import {
  AfterViewChecked,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogpostService } from '../services/blogpost.service';
import { Blogpost } from '../models/blogpost';
import { NgIf, AsyncPipe, NgFor, DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { Category } from '../../category/models/category';
import { CategoryService } from '../../category/services/category.service';
import { ImageSelectorComponent } from '../../../shared/components/image-selector/image-selector.component';
import { ImageService } from '../../../shared/components/services/image.service';

@Component({
  selector: 'app-edit-blogpost',
  standalone: true,
  imports: [
    FormsModule,
    MarkdownModule,
    NgIf,
    AsyncPipe,
    NgFor,
    ImageSelectorComponent,
    NgClass,
  ],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.scss',
})
export class EditBlogpostComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  route = inject(ActivatedRoute);
  blogPostService = inject(BlogpostService);
  categoryService = inject(CategoryService);
  categories$?: Observable<Category[]>;
  subscribtion?: Subscription[];
  id: string | null = null;
  model!: Blogpost;
  @ViewChild('publishedDate') publishedDate!: ElementRef;
  router = inject(Router);
  showImageSelector = false;
  imageService = inject(ImageService);

  ngOnInit(): void {
    const sub = this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');

      if (this.id) {
        const sub2 = this.blogPostService
          .getBlogpost(this.id)
          .subscribe((data) => {
            this.model = data;
          });
        this.subscribtion?.push(sub2);
      }
      const sub3 = this.imageService.onSelectImage().subscribe((res) => {
        if (this.model) {
          this.model.featuredImageUrl = res.url;
          this.showImageSelector = false;
        }
      });
      this.subscribtion?.push(sub3);
    });
    this.subscribtion?.push(sub);

    this.categories$ = this.categoryService.getCategories();
  }

  ngOnDestroy(): void {
    this.subscribtion?.forEach((x) => x.unsubscribe());
  }
  ngAfterViewChecked(): void {
    this.publishedDate.nativeElement.value = new DatePipe('en-US').transform(
      this.model.publishedDate,
      'yyyy-MM-dd'
    );
  }

  onSubmit() {
    this.blogPostService.updateBlogpost(this.model).subscribe((data) => {
      console.log('Blogpost updated');
      console.log(data);
      this.router.navigate(['/admin/blogposts']);
    });
  }
  openImageSelector() {
    this.showImageSelector = true;
  }
  hideImageSelector() {
    this.showImageSelector = false;
  }
}
