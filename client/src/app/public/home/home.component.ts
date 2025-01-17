import { Component, inject, OnInit } from '@angular/core';
import { BlogpostService } from '../../features/blog-post/services/blogpost.service';
import { Observable } from 'rxjs';
import { Blogpost } from '../../features/blog-post/models/blogpost';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  blogPostService = inject(BlogpostService);
  blogPosts$?: Observable<Blogpost[]>;

  ngOnInit(): void {
    this.blogPosts$ = this.blogPostService.getBlogposts();
  }
}
