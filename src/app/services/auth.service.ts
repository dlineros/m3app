import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) {  }

  crearUsuario(nombre:string, paterno:string,materno:string,correo:string, password:string)
      {
        //console.log(nombre,paterno,materno,password);
        this.auth.signInWithEmailAndPassword(correo,password)
        .then(credenciales=>{
          console.log(credenciales);
        })
        .catch(err=>console.error(err));
      }

}
