import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,
            ReactiveFormsModule,
            CommonModule

  ],
  templateUrl: './login.component.html',
  styles: ``
})


export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,private authService: AuthService,private router:Router) {}

  ngOnInit() {
      this.loginForm = this.fb.group({
      correo: ['', Validators.email],
      password: ['', Validators.required]

    })
  }

loginUsuario(){

   if (this.loginForm.invalid){return};

   const {correo,password} =this.loginForm.value;

   this.authService.loginUsuario(correo,password)
   .then(credenciales=>{
    console.log(credenciales);
    this.router.navigate(['/dashboard']);
   })


}






}
