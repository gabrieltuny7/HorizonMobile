import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SpaceComponent } from './space/space.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, SpaceComponent, RouterModule],
})
export class AppComponent {
  constructor() {}
}
