import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exampleServiceUrl } from '../../app.config';
import { ExampleModel } from '../models/example.model';

@Injectable({
  providedIn: 'root',
})
export class ExampleService {
  constructor(public httpClient: HttpClient) {}

  public getExample() {
    return this.httpClient.get<ExampleModel>(exampleServiceUrl);
  }
}
