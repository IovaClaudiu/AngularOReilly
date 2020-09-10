import { User } from "./user.model";
import { environment } from "./../../environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registerd?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(`${environment.signUp}`, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(`${environment.signIn}`, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationData = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationData);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorRes);
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email already exists!";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "The password is invalid!";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "This email does not exist!";
        break;
    }
    return throwError(errorMessage);
  }
}
