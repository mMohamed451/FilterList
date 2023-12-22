import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  // API call to fetch posts
  getPosts(): Observable<Post[]> {
    const url = `${this.baseUrl}/posts`;
    return this.http.get<Post[]>(url);
  }

  // API call to fetch comments for a post
  getComments(postId: number): Observable<Comment[]> {
    const url = `${this.baseUrl}/comments?postId=${postId}`;
    return this.http.get<Comment[]>(url);
  }
}
