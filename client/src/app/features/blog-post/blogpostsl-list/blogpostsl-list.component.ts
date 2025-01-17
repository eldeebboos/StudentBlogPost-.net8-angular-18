import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Blogpost } from '../models/blogpost';
import { BlogpostService } from '../services/blogpost.service';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blogpostsl-list',
  standalone: true,
  imports: [RouterLink, NgIf, AsyncPipe, NgFor, DatePipe],
  templateUrl: './blogpostsl-list.component.html',
  styleUrl: './blogpostsl-list.component.scss',
})
export class BlogpostslListComponent implements OnInit {
  blogPostService = inject(BlogpostService);
  blogPosts$?: Observable<Blogpost[]>;

  ngOnInit(): void {
    this.loadBlogPosts();
  }

  private loadBlogPosts() {
    this.blogPosts$ = this.blogPostService.getBlogposts();
  }

  onDelete(blogpost: Blogpost) {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogPostService.deleteBlogpost(blogpost).subscribe(() => {
          this.loadBlogPosts();
        });
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  }
}
