import { Component } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'client-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(angularFireAuth: AngularFireAuth) {
    void angularFireAuth.signInAnonymously();
  }
}
