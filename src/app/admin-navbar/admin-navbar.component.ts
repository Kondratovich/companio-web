import { Component} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-admin-navbar',
    standalone: true,
    imports: [HeaderComponent, MatIconModule, RouterOutlet],
    templateUrl: './admin-navbar.component.html'
})
export class AdminNavbarComponent { }