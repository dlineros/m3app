import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { dashboardRoutes } from '../../dashboard/dashboard.routes';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import * as  ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,
    ReactiveFormsModule,
    CommonModule,


  ],
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent implements OnInit, OnDestroy {

  uiSubscription!: Subscription;
  cargando: boolean = false;
  registroForm!: FormGroup; // Es importante inicializar correctamente con `!` para TypeScript estricto



  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>

  ) {

  }

  ngOnInit() {

    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      paterno: ['', Validators.required],
      materno: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.uiSubscription = this.store.select('ui')
      .subscribe(ui => this.cargando = ui.isLoading);

  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  crearUsuario() {

    if (this.registroForm.invalid) { return; }
    this.store.dispatch(ui.isLoading());
    const { nombre, paterno, materno, correo, password } = this.registroForm.value;

    this.authService.crearUsuario(nombre, paterno, materno, correo, password)
      .then(credenciales => {
        console.log(credenciales);
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
          //footer: '<a href="#">Why do I have this issue?</a>'
        })
      }
      )

  }

}
