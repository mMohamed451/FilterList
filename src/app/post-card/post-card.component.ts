import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  @Input() post: Post | undefined;

  constructor(private router: Router) { }

  navigateToPostDetails(postId: number): void {
    this.router.navigate(['post', postId]);
  }
}
