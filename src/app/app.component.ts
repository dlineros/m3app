import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { FooterComponent } from "./shared/footer/footer.component";

import {ReactiveFormsModule} from '@angular/forms';
import { AuthService } from './services/auth.service';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ReactiveFormsModule,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'm3app';

constructor(private authService: AuthService ){

  this.authService.initAuthListener();
}

}
