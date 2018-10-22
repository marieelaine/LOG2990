import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PartieMultiple } from './dialog-multiple/partie-mutiple';

@Injectable()
export class PartieMultipleService {

  constructor(private http: HttpClient) { }

  private register(partieMultiple: PartieMultiple) {

  }
}
