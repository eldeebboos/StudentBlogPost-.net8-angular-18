import {
  AfterViewChecked,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import { Blogpost } from '../models/blogpost';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { BlogpostService } from '../services/blogpost.service';
import { Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category';
import { Observable, Subscription } from 'rxjs';
import { ImageSelectorComponent } from '../../../shared/components/image-selector/image-selector.component';
import { ImageService } from '../../../shared/components/services/image.service';

@Component({
  selector: 'app-add-blogpost',
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
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.scss',
})
// | date : 'yyyy-MM-dd'
export class AddBlogpostComponent
  implements OnInit, AfterViewChecked, OnDestroy
{
  model: Blogpost;
  @ViewChild('publishedDate') publishedDate!: ElementRef;
  blogPostService = inject(BlogpostService);
  categoryService = inject(CategoryService);
  router = inject(Router);
  categories$?: Observable<Category[]>;
  showImageSelector = false;
  imageService = inject(ImageService);
  subscribtion?: Subscription[];

  constructor() {
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      publishedDate: new Date(),
      author: '',
      isVisible: true,
      categories: [],
      categoriesGuids: [],
    };
  }

  openImageSelector() {
    this.showImageSelector = true;
  }

  hideImageSelector() {
    this.showImageSelector = false;
  }

  onSubmit() {
    console.log(this.model);
    // this.model.categoriesGuids = this.model.categories.map(
    //   (c) => c.id
    // ) as string[];
    this.blogPostService.addBlogpost(this.model).subscribe((data) => {
      console.log('Blogpost added');
      console.log(data);
      this.router.navigate(['/admin/blogposts']);
    });
  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
    const sub3 = this.imageService.onSelectImage().subscribe((res) => {
      if (this.model) {
        this.model.featuredImageUrl = res.url;
        this.showImageSelector = false;
      }
    });
    this.subscribtion?.push(sub3);
  }

  ngAfterViewChecked(): void {
    this.publishedDate.nativeElement.value = new DatePipe('en-US').transform(
      this.model.publishedDate,
      'yyyy-MM-dd'
    );
  }

  ngOnDestroy(): void {
    this.subscribtion?.forEach((x) => x.unsubscribe());
  }
}
