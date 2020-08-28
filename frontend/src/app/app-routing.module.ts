import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleComponent } from './example/components/example.component';
import { ExampleModule } from './example/example.module';

const routes: Routes = [
  {
    path: '',
    component: ExampleComponent,
  },
];

@NgModule({
  imports: [ExampleModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
