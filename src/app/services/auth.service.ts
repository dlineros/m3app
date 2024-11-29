import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root', // Este servicio estará disponible de forma global
})
export class AuthService {
  private auth = inject(Auth);
  user$: Observable<any> | undefined;

  constructor() {}

  // Método para iniciar sesión
  loginUsuario(correo: string, password: string) {
    console.log(this.auth);
    return signInWithEmailAndPassword(this.auth, correo, password);
  }

  // Método para registrarse
  crearUsuario(nombre: string, paterno:string, materno:string,correo: string, password: string) {
    //console.log(this.auth);
    return createUserWithEmailAndPassword(this.auth, correo, password);
  }

  // Método para cerrar sesión
  logout() {
    return signOut(this.auth);
  }

  initAuthListener(){

    this.user$ = authState(this.auth); // authState devuelve un Observable con el estado del usuario
    this.user$?.subscribe(fuser=>{
      console.log(fuser);
      console.log(fuser?.email);
    })

  }

}
