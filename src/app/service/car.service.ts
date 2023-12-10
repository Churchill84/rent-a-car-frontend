import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {Car, CarResponse} from "../model/car";
import {AuthService} from "./auth.service";
import {map} from "rxjs/operators";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:8080/api/v1/cars';  // URL to web api

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  /** GET cars from the server */
  getAllCars(): Observable<Car[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<CarResponse>(this.apiUrl, { headers }).pipe(
      map(response => response._embedded.carList) // map the response to the carList array
    );
  }

  addCar(carData: any) {
    return this.http.post(this.apiUrl, carData, {headers: this.getAuthHeaders()});
  }

  updateCar(carId: number, carData: any): Observable<Car> {

    console.log(JSON.stringify(carData));

    const url = `${this.apiUrl}/${carId}`;
    const headers = this.getAuthHeaders();
    headers.set("Content-Type", "multipart/form-data");

    return this.http.put<Car>(url, carData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // You can customize this further based on your needs
    // and possibly based on different types of errors
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    // Return an observable with a user-facing error message
    return throwError(errorMessage);
  }


  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Retrieve token from AuthService or similar service
    if (!token) {
      throw new Error("No token found"); // Optionally, you can handle cases where the token is not available
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
