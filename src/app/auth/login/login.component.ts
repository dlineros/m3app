import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as  ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';


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


export class LoginComponent implements OnInit, OnDestroy {
  cargando: boolean = false;
  loginForm!: FormGroup;
  uiSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      correo: ['', Validators.email],
      password: ['', Validators.required]

    })

    this.uiSubscription =
    this.store.select('ui')
    .subscribe(ui => this.cargando = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  loginUsuario() {

    if (this.loginForm.invalid) { return };
    this.store.dispatch(ui.isLoading());


    /*  Swal.fire({
       title: "Espere por favor",
       didOpen: () => {
         Swal.showLoading();

       }
       }) */




    const { correo, password } = this.loginForm.value;

    this.authService.loginUsuario(correo, password)
      .then(credenciales => {
        console.log(credenciales);
        //Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        this.store.dispatch(ui.stopLoading()); // Corregido: dentro de las llaves
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: this.handleAuthError(error),
          //footer: '<a href="#">Why do I have this issue?</a>'
        })
      }
      )




  }

  private handleAuthError(error: any): string {
    console.log(error.code);
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'El correo electrónico ya está en uso.';
      case 'auth/invalid-email':
        return 'El correo electrónico no es válido.';
      case 'auth/wrong-password':
        return 'La contraseña es incorrecta.';
      case 'auth/user-not-found':
        return 'No se encontró un usuario con ese correo electrónico.';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres.';
      case 'auth/invalid-credential':
        return 'Usuario y contraseña inválidos.';

      default:
        return 'Ocurrió un error inesperado. Inténtalo nuevamente.';
    }
  }




}
