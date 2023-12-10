import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from "../model/user";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private registerUrl = 'http://localhost:8080/api/v1/auth/register';
    private authenticationUrl = `http://localhost:8080/api/v1/auth/authenticate`;
    private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
    private loggedIn = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            this.validateToken(storedToken).subscribe(isValid => {
                if (isValid) {
                    this.tokenSubject.next(storedToken);
                    this.loggedIn.next(true);
                }
            });
        }
    }

    private validateToken(token: string): Observable<boolean> {
        // Backend endpoint to validate token
        return this.http.post<boolean>('http://localhost:8080/api/v1/auth/validate', { token });
    }

    register(user: any): Observable<any> {
        return this.http.post(this.registerUrl, user)
            .pipe(
                tap((response: any) => {
                    if (response.access_token && response) {
                        this.saveToken(response.token);
                    }
                })
            );
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(this.authenticationUrl, {email, password})
            .pipe(
                map(response => {
                    const token = response.access_token;
                    if (token) {
                        this.saveToken(token);
                        this.tokenSubject.next(token);
                        this.loggedIn.next(true);
                    }
                    return response;
                }),
                catchError(error => {
                    // Handle error and return a user-friendly message or rethrow
                    console.error('Login failed', error);
                    return throwError(() => new Error('Login failed'));
                })
            );
    }

    saveToken(token: string): void {
        localStorage.setItem('token', token);
    }

    getTokens(): Observable<string> {
        return this.tokenSubject.asObservable();
    }

    getToken(): string {
      console.log("this.tokenSubject.getValue(): " + this.tokenSubject.getValue())
        return this.tokenSubject.getValue();
    }

    refreshToken(): Observable<any> {
        // This URL and the request body might vary based on your backend implementation
        return this.http.post<any>('http://localhost:8080/api/v1/auth/refresh-token', {
            refreshToken: this.getRefreshToken()
        }).pipe(
            map(response => {
                const token = response.access_token;
                if (token) {
                    this.saveToken(token);
                    this.tokenSubject.next(token);
                }
                return response;
            })
        );
    }

    private getRefreshToken(): any {
        // Assuming the refresh token is stored in local storage (or use a different method)
        return localStorage.getItem('token');
    }


    logout(): void {
        // Remove token from local storage and set subject to null
        localStorage.removeItem('token');
        this.tokenSubject.next("");
        this.loggedIn.next(false);
    }

    setLoggedIn(value: boolean) {
        this.loggedIn.next(value);
    }

    isLoggedIn(): Observable<boolean> {
        return this.loggedIn.asObservable();
    }
}
