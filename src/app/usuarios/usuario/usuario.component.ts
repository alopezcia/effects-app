import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import * as fromActions from '../../store/actions';
import { Usuario } from '../../models/usuario.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit, OnDestroy {

  user: Usuario;
  loading: boolean;
  error: any;
  subscipcion: Subscription = new Subscription();

  constructor(private router: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.router.params
      .subscribe( params => {
        const id = params['id'];
        this.store.dispatch( new fromActions.CargarUsuario(id) );
      });

    this.subscipcion = this.store.select('usuario')
      .subscribe( data => {
        this.user = data.user;
        this.loading = data.loading;
        this.error = data.error;
      } );

  }

  ngOnDestroy(): void {
    this.subscipcion.unsubscribe();
  }

}
