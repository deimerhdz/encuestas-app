import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs';
import { LoginDto } from 'src/app/core/models/login.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = environment.url;
  constructor(private http:HttpClient, private cookie:CookieService) { }


  public login(login:LoginDto){
    return this.http.post(`${this.url}/auth/login`,login).pipe(
      tap((response:any)=>{
        this.cookie.set('id',response.id,1)
        this.cookie.set('token',response.token,1)
        this.cookie.set('nombre',response.username,1)
      })
    );
  }
}
