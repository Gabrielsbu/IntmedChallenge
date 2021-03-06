import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { ConsultaService } from './../../cors/services/service/consulta.service';
import { EspecialidadeService } from './../../cors/services/service/especialidade.service';
import { AuthenticationService } from './../../cors/services/service/authentication.service';

import { Usuario } from './../../cors/services/model/usuario.model';
import { Agenda } from './../../cors/services/model/agenda.model';
import { Especialidade } from './../../cors/services/model/especialidade.model';
import { Medico } from './../../cors/services/model/medico.model';
import { Consulta } from 'src/app/cors/services/model/consultas.model';

@Component({
  selector: 'app-cadastrar-consulta-mobile',
  templateUrl: './cadastrar-consulta-mobile.component.html',
  styleUrls: ['./cadastrar-consulta-mobile.component.css'],
})
export class CadastrarConsultaMobileComponent implements OnInit {
  public consultaForm: FormGroup;

  agendas: Agenda[];
  especialidades: Especialidade[];
  medicos: Medico[];

  medicosPorEspecialidade: Medico[];
  agendaPorMedico: Agenda[];
  agendaSelecionada: Agenda;

  constructor(
    private _consultaService: ConsultaService,
    private _especialidadeService: EspecialidadeService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _buscarUsuario: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.buscarConsultas();
    this.buscarEspecialidades();
    this.buscarMedicos();

    this.consultaForm = this._formBuilder.group({
      horario: ['', Validators.required],
      profissional: ['', [Validators.required]],
      especialidade: ['', Validators.required],
      dia: ['', Validators.required],
    });
  }

  buscarEspecialidades() {
    this._especialidadeService.buscarEspecialidades().subscribe(
      (data) => {
        this.especialidades = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  buscarMedicos() {
    this._especialidadeService.buscarMedicos().subscribe(
      (data) => {
        this.medicos = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  buscarConsultas() {
    this._consultaService.buscarAgenda().subscribe(
      (data) => {
        this.agendas = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  buscarMedicosPorEspecialidade(especialidade: Especialidade) {
    this.medicosPorEspecialidade = this.medicos.filter(
      (e) => e.especialidade.nome === especialidade.nome
    );
  }

  buscarAgendaPorMedicos(medico: Medico) {
    this.agendaPorMedico = this.agendas.filter(
      (e) => e.medico.nome === medico.nome
    );
  }

  criarConsulta() {
    const horario: string = this.consultaForm.controls['horario'].value;
    const agenda: Agenda = this.consultaForm.controls['dia'].value;

    this._consultaService
      .criarConsulta({ agenda: agenda.id, horario: horario })
      .subscribe(
        (data: Consulta) => {
          Swal.fire('Consulta criada com sucesso!', ``, 'success');
          this._router.navigate(['/consults']);
        },
        (error) => {
          Swal.fire(
            'Verifique as credenciais inseridas e preencha todos os campos!',
            'Verifique os campos novamente!',
            'error'
          );
        }
      );
  }
}
