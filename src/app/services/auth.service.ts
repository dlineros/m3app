import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root', // Este servicio estará disponible de forma global
})
export class AuthService {
  private auth = inject(Auth);

  constructor() {}

  // Método para iniciar sesión
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Método para registrarse
  crearUsuario(nombre: string, paterno:string, materno:string,correo: string, password: string) {
    console.log(this.auth);
    return createUserWithEmailAndPassword(this.auth, correo, password);
  }

  // Método para cerrar sesión
  logout() {
    return signOut(this.auth);
  }
}
