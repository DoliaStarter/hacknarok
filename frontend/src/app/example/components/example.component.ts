import { Component } from '@angular/core';
import { ExampleService } from '../services/example.service';

@Component({
  selector: 'app-example-component',
  templateUrl: './example.component.html',
})
export class ExampleComponent {
  public exampleValue: string;

  constructor(public exampleService: ExampleService) {}

  onExampleButtonClick() {
    this.exampleService
      .getExample()
      .subscribe((value) => (this.exampleValue = value.key));
  }
}
