export class Usuario {




  constructor(
    public uid: string,
    public nombre: string,
    public email: string


  ) {}

  static fromFirebase(firestoreUser: any): Usuario {
    return new Usuario(
      firestoreUser?.uid,
      firestoreUser?.nombre || 'Sin nombre',
      firestoreUser?.email || 'Sin correo'
    );
  }

}
