import { Component} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-employee-navbar',
    imports: [HeaderComponent, MatIconModule, RouterOutlet],
    templateUrl: './employee-navbar.component.html'
})
export class EmployeeNavbarComponent { }