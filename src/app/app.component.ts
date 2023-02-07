import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Inversion } from './models/inversion';
import { Registros } from './models/resgistros';
import { InteresService } from './services/interes.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  error:string = '';
  gananciaInversion:number = 0;
  montoFinal:number = 0;
  interesCompuestoForm:FormGroup;
  inversion:Inversion = new Inversion();
  registros:Registros[];
  constructor(
    private fb: FormBuilder,
    private interesService:InteresService
  ){}

  ngOnInit() {
    this.interesCompuestoForm = this.fb.group({
      inversionInicial:['',Validators.required],
      aportacionAnual:['',Validators.required],
      incrementoAnual:[''],
      anosInversion:['',Validators.required],
      rendimiento:['',Validators.required],
    });
  }

  calcular(){
    if(this.interesCompuestoForm.valid){ 
      let incrementoAnual = this.interesCompuestoForm.controls['incrementoAnual'].value;
      console.log(incrementoAnual);
      if(!incrementoAnual){
        incrementoAnual = 0;
      }
        
      this.inversion.aportacionAnual = this.interesCompuestoForm.controls['aportacionAnual'].value;
      this.inversion.incrementoAnual = incrementoAnual;
      this.inversion.anosDeInversion = this.interesCompuestoForm.controls['anosInversion'].value;
      this.inversion.rendimientoInversion = this.interesCompuestoForm.controls['rendimiento'].value;
      this.inversion.inversionInicial = this.interesCompuestoForm.controls['inversionInicial'].value;
      this.interesService.calculaInteres(this.inversion).subscribe(
        data => {
          console.log(data);
          this.registros = data.registros;
          this.gananciaInversion = data.gananciaInversion;
          this.montoFinal = data.montoFinal;
          this.error = '';
        }, error =>{
          console.log(error);
        }
      );
    }
    this.error ='No es posible procesar su solicitud con los datos proporcionados';
    return;
  }
}
