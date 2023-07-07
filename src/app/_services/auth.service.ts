import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminDetails } from '../model-dto/admin/adminDetails';
import { AuthenticationResponse } from '../model-dto/admin/authenticationResponse';
import { AuthenticationRequest } from '../model-dto/admin/authenticationRequest';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServiceUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private router: Router) { }

  public loginUser(adminUserLogin: AuthenticationRequest):Observable<AuthenticationResponse>{
    return this.http.post<AuthenticationResponse>(`${this.apiServiceUrl}/authenticate`, adminUserLogin);
  } 

  public registerUser(adminUser: AdminDetails):Observable<AuthenticationResponse>{
    return this.http.post<AuthenticationResponse>(`${this.apiServiceUrl}/register`, adminUser);
  }

  redirectUrl!: string;

  public loggedIn(): boolean{
    this.redirectUrl = this.router.url;
    return !!localStorage.getItem('jwtToken');
  } 

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  public setUserName(username: string) {
    localStorage.setItem('username', username);
  }

  public getUsername(): string | null {
    return localStorage.getItem('username');
  }

  public setRole(role: string) {
    localStorage.setItem('role', role);
  }

  public getRole(): string | null {
    return localStorage.getItem('role');
  }

  public clear() {
    localStorage.clear();
  }
}

/*
  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles'));
  }
*/