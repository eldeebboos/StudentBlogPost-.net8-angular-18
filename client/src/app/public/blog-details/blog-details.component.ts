import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogpostService } from '../../features/blog-post/services/blogpost.service';
import { Observable } from 'rxjs';
import { Blogpost } from '../../features/blog-post/models/blogpost';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [NgIf, AsyncPipe, DatePipe, NgFor, MarkdownModule],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss',
})
export class BlogDetailsComponent implements OnInit {
  route = inject(ActivatedRoute);
  blogPostService = inject(BlogpostService);
  url: string | null = null;
  blogPost$?: Observable<Blogpost>;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.url = params.get('url');
    });

    if (this.url) {
      this.blogPost$ = this.blogPostService.getBlogpostByUrlHandle(this.url);
    }
  }
}
