import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { ApiService } from '../../services/api.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  post: Post | undefined;
  comments: any = [];
  users: User[] = [];

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
        tap((posts: any) => {
          this.post = posts.find((post: any) => post.id === postId);
        })
      )
      .subscribe(),
      (error: any) => {
        console.error('Error fetching post:', error);
        // Handle error and display an error message to the user
      };
  }

  fetchComments(postId: number): void {
    this.apiService
      .getComments(postId)
      .pipe(
        tap((comments: any) => {
          this.comments = comments;
          // const userIds = comments.map((comment: any) => comment.userId);
          // this.fetchUsers(userIds);
        })
      )
      .subscribe(),
      (error: any) => {
        console.error('Error fetching comments:', error);
        // Handle error and display an error message to the user
      };
  }

  fetchUsers(userIds: number[]): void {
    this.apiService
      .getUsers(userIds as any)
      .pipe(
        tap((users: any) => {
          this.users = users.filter((user: any) => userIds.includes(user.email));
        })
      )
      .subscribe(),
      (error: any) => {
        console.error('Error fetching users:', error);
        // Handle error and display an error message to the user
      };
  }

  getPostDetails() {
    // Call your API service to fetch the post details
    // Assuming you have a method `getPostById` in your `apiService`
    // this.apiService.getPostById(this.postId).subscribe(post => {
    //   this.post = post;
    //   this.getUserDisplayName();
    // });
    return {
      name: 'John Doe',
      body: {},
      title: '',
    };
  }

  getUserDisplayName() {
    // Assuming you have a method `getUserById` in your `apiService`
    // this.apiService.getUserById(this.post.userId).subscribe(user => {
    //   this.userDisplayName = user.displayName;
    // });
    return {
      name: 'John Doe',
      body: {},
      title: '',
    };
  }
}
