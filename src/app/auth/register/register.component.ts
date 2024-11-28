import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';


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
export class RegisterComponent implements OnInit {

  registroForm!: FormGroup; // Es importante inicializar correctamente con `!` para TypeScript estricto



  constructor(private fb: FormBuilder, private authService: AuthService) {

  }

  ngOnInit() {

    this, this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      paterno: ['', Validators.required],
      materno: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  crearUsuario() {

    if (this.registroForm.invalid) { return; }

    const { nombre, paterno, materno, correo, password } = this.registroForm.value;

    this.authService.crearUsuario(nombre, paterno, materno, correo, password);
  }

}
