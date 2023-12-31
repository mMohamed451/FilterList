import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { tap } from 'rxjs/operators';
import { PostCardComponent } from '../post-card/post-card.component';

@Component({
  selector: 'app-filterable-list',
  templateUrl: './filterable-list.component.html',
  standalone: true,
  imports: [FormsModule, RouterLink, PostCardComponent],
  styleUrls: ['./filterable-list.component.scss'],
})
export class FilterableListComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  searchInput = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.apiService
      .getPosts()
      .pipe(
        tap((posts: Post[]) => {
          this.posts = posts;
          this.filteredPosts = posts;
        })
      )
      .subscribe(),
      (error: any) => {
        console.error('Error fetching posts:', error);
      };
  }

  searchPosts(): void {
    const searchText = this.searchInput.toLowerCase();
    this.filteredPosts = this.posts.filter(
      (post: Post) =>
        post.title.toLowerCase().includes(searchText) ||
        post.body.toLowerCase().includes(searchText)
    );
  }
}
