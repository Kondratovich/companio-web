import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html'
})
export class NotFoundComponent {
    constructor(private _location: Location) { }

    backClicked() {
        this._location.back();
    }
}