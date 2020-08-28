import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ExampleComponent } from './components/example.component';
import { ExampleService } from './services/example.service';

@NgModule({
  imports: [HttpClientModule],
  declarations: [ExampleComponent],
  providers: [ExampleService],
})
export class ExampleModule {}
