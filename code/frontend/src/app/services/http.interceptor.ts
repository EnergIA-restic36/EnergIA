import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('energia.token');
    const router = inject(Router);

    if (token) {
        req = req.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
    
    return next(req).pipe(
        catchError((e: HttpErrorResponse) => {
            if (e.status === 401) {
                localStorage.removeItem('energia.token');
                router.navigate(['/login']);
            }

            const error = e.error?.messsage || e.statusText;
            return throwError(() => error);
        })
    );
};