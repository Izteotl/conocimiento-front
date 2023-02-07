import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tabla } from '../models/tabla';
import { Inversion } from '../models/inversion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InteresService {

  constructor(private http: HttpClient) { }

  calculaInteres(input: Inversion):Observable<Tabla>{
    return this.http.post<Tabla>(environment.apiUrl + 'interes',input);
  }
}
