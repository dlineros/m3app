import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario.model';

import { Firestore, doc, setDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root', // Este servicio estará disponible de forma global
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore); // Inyección directa de Firestore

  user$: Observable<any> | undefined;

  constructor(

    //private firestore:AngularFirestore
  ) { }

  // Método para iniciar sesión
  loginUsuario(correo: string, password: string) {
    console.log(this.auth);
    return signInWithEmailAndPassword(this.auth, correo, password);
  }

  // Método para registrarse
  crearUsuario(nombre: string, paterno: string, materno: string, correo: string, password: string) {
    //console.log(this.auth);
    return createUserWithEmailAndPassword(this.auth, correo, password)
      .then(async ({ user }) => {
        if (user) {
          const newUser = new Usuario(user.uid, nombre, correo);
          const userDocRef = doc(this.firestore, `${user.uid}/usuario`);
          await setDoc(userDocRef, { ...newUser });
        }
      });

  }

  // Método para cerrar sesión
  logout() {
    return signOut(this.auth);
  }

  initAuthListener() {

    this.user$ = authState(this.auth); // authState devuelve un Observable con el estado del usuario
    this.user$?.subscribe(fuser => {
      console.log(fuser);
      console.log(fuser?.email);
    })
    }

    isAuth(){
      return this.user$?.pipe(
        map(fbuser=>fbuser!=null)
      ) ?? of(false)
    }

}
