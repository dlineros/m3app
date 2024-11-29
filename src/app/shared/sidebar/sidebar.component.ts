import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {

  constructor(private auth:AuthService,
              private router:Router
  ){
  }

  logout(){
    this.auth.logout().then(
       ()=>
        {
          this.router.navigate(['/login'])
        }
    );
  }

}
