import { Component } from '@angular/core';
import { AppMaterialModule } from '../shared/modules/app.material.module';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manager-navbar',
  templateUrl: './manager-navbar.component.html',
  imports: [AppMaterialModule, HeaderComponent, RouterModule]
})
export class ManagerNavbarComponent { }