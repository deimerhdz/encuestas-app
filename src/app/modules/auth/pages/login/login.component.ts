import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup = new FormGroup({
    usuario: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  })

  public formSubmit:boolean=false;
  constructor(private router:Router, private authService:AuthService,private cookieService:CookieService) { }

  ngOnInit(): void {
    if(this.cookieService.get('token')){
      this.router.navigateByUrl('/home/encuestas')
    }
  }

  login(){
    this.formSubmit =true
    if(this.loginForm.invalid && this.formSubmit){
      return ;
    }
    this.authService.login(this.loginForm.value).subscribe((response:any)=>{
      if(response){
        this.router.navigateByUrl('/home/encuestas')
      }
    },({error})=>{
      Swal.fire('Error de credenciales',error.message,'success')
      
    })
    
   
  }

}
