import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataComment } from '../../model/comment'
import { map } from 'rxjs/operators';

//const API_URL = 'http://covid-map-2020-back-end.herokuapp.com/api/test/';
const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  comments: DataComment[];
  commentsById:DataComment;
  commentsByIdDataCountry: DataComment[];

  constructor(private http: HttpClient) { }

  getComments(): Observable<any> {
    return this.http.get(API_URL + 'comments');
  }
  getCommentsById(id:number): Observable<any> {
    return this.http.get(API_URL + `comments/${id}`)
    .pipe(
        map(res => res[0]) // or any other operator
      )
  }
  postComments(data: any):Observable<any>{
    return this.http.post(API_URL + 'comments',data);
  }
  getCommentsByIdDataCountry(idDataCountry:number): Observable<any> {
    return this.http.get<any>(API_URL + `commentsByDataCountry/${idDataCountry}`)
    // .pipe(
    //     map(res => res[0]) // or any other operator
    //   )
  }

}
