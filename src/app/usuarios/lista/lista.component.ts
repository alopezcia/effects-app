import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { Usuario } from '../../models/usuario.model';

import * as usuariosActions from '../../store/actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaComponent implements OnInit, OnDestroy {

  usuarios: Usuario[] = [];
  loading: boolean;
  error: any;

  subscipcion: Subscription = new Subscription();
  
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscipcion = this.store.select('usuarios')
          .subscribe( data =>{ 
            this.usuarios = data.users;
            this.loading = data.loading;
            this.error = data.error;
          });

    this.store.dispatch( new usuariosActions.CargarUsuarios() );
  }

  ngOnDestroy(): void {
    this.subscipcion.unsubscribe();
  }
}
