import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as fromAcciones from '../actions';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuarioEffects {
    constructor( private actions$: Actions, public usuarioService: UsuarioService ){}

    // @Effect({dispatch: false}) cargarUsuarios$ = this.actions$
    //     .ofType( usuariosAcciones.CARGAR_USUARIOS )
    //     .pipe( map(action => {
    //         console.log(action);
    //         return action;
    //     }));

    cargarUsuarios$ = createEffect( () =>
        this.actions$.pipe(
            ofType( fromAcciones.CARGAR_USUARIO ),
            mergeMap( action => this.usuarioService.getUserById(action['id'])
                .pipe(
                    map( usuario => new fromAcciones.CargarUsuarioSuccess( usuario )),
                    catchError( err => of(new fromAcciones.CargarUsuarioFail( err )))
                )
            )
        )
    );

}
