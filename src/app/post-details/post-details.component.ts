import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Comment } from '../../models/comment.model';
import { Post } from '../../models/post.model';
import { ApiService } from '../../services/api.service';
import { CommentCardComponent } from '../comment-card/comment-card.component';

@Component({
  selector: 'app-post-details',
  standalone: true,
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
  imports: [CommentCardComponent],
})
export class PostDetailsComponent implements OnInit {
  post: Post | undefined;
  comments: Comment[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap((params) => {
          const postId = +params['id'];
          this.fetchPost(postId);
          this.fetchComments(postId);
        })
      )
      .subscribe();
  }

  fetchPost(postId: number): void {
    this.apiService
      .getPosts()
      .pipe(
        tap((posts: Post[]) => {
          this.post = posts.find((post: Post) => post.id === postId);
        })
      )
      .subscribe(),
      (error: any) => {
        console.error('Error fetching post:', error);
      };
  }

  fetchComments(postId: number): void {
    this.apiService
      .getComments(postId)
      .pipe(
        tap((comments: Comment[]) => {
          this.comments = comments;
        })
      )
      .subscribe(),
      (error: any) => {
        console.error('Error fetching comments:', error);
      };
  }
}
