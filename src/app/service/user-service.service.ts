import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CarResponse} from "../model/car";
import {map} from "rxjs/operators";
import {UserResponse} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) {}

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<UserResponse>(`${this.apiUrl}/${email}`).pipe(
        map(response => response._embedded.user) // map the response to the carList array
    );
  }
}
