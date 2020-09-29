import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ModalConsultsComponent } from './modal-consults/modal-consults.component';
import { ConsultaService } from './../../cors/services/service/consulta.service';
import { Consulta } from './../../cors/services/model/consultas.model';

export interface PeriodicElement {
  especialidade: string;
  profissional: string;
  data: string;
  hora: string;
}

@Component({
  selector: 'app-consults',
  templateUrl: './consults.component.html',
  styleUrls: ['./consults.component.css'],
})
export class ConsultsComponent implements OnInit {
  consulta: Consulta[];
  displayedColumns: string[] = [
    'especialidade',
    'profissional',
    'data',
    'hora',
    'acoes',
  ];
  dataSource: Consulta[] = [];

  constructor(
    public dialog: MatDialog,
    private _router: Router,
    private _buscarConsultas: ConsultaService
  ) {}

  openDialog() {
    this.dialog
      .open(ModalConsultsComponent, {
        width: '700px',
      })
      .afterClosed()
      .subscribe((res) => {
        if (!!res) {
          this.buscarConsultas();
        }
      });
  }

  ngOnInit(): void {
    this.buscarConsultas();
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['/']);
  }

  buscarConsultas() {
    this._buscarConsultas.buscarConsulta().subscribe(
      (data) => {
        this.dataSource = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  excluirConsulta(id) {
    this._buscarConsultas.deletarConsulta(id).subscribe(
      (data) => {
        this.buscarConsultas();
      },
      (error) => {
        console.log(error);
        console.log(id);
      }
    );
  }
}