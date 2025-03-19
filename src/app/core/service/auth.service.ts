import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

import { CookieService } from 'ngx-cookie-service'
import { User } from '../helpers/fake-backend'

const API_URL = 'http://localhost:5050';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user: User | null = null

  public readonly authSessionKey = '_APPROX_AUTH_SESSION_KEY_'
  private cookieService = inject(CookieService)

  constructor(private http: HttpClient) {}

  login(username: string , password: string) {
    return this.http.post<User>(`${API_URL}/generate-token`, { username, password }).pipe(
      map((user) => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          this.user = user
          // store user details and jwt in session
          this.saveSession(user.token)
        }
        return user
      })
    )
  }

  logout(): void {
    // remove user from cookie to log user out
    this.removeSession()
    this.user = null
  }

  get session(): string {
    return this.cookieService.get(this.authSessionKey)
  }

  saveSession(token: string): void {
    this.cookieService.set(this.authSessionKey, token)
  }

  removeSession(): void {
    this.cookieService.delete(this.authSessionKey)
  }
}
