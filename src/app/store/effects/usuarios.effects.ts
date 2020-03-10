import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as usuariosAcciones from '../actions';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuariosEffects {
    constructor( private actions$: Actions, public usuarioService: UsuarioService ){}

    // @Effect({dispatch: false}) cargarUsuarios$ = this.actions$
    //     .ofType( usuariosAcciones.CARGAR_USUARIOS )
    //     .pipe( map(action => {
    //         console.log(action);
    //         return action;
    //     }));

    cargarUsuarios$ = createEffect( () =>
        this.actions$.pipe(
            ofType( usuariosAcciones.CARGAR_USUARIOS ),
            mergeMap( () => this.usuarioService.getUsers()
                .pipe(
                    map( usuarios => new usuariosAcciones.CargarUsuariosSuccess( usuarios )),
                    catchError( err => of(new usuariosAcciones.CargarUsuariosFail( err )))
                )
            )
        )
    );

}
