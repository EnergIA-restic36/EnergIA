import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({    
    standalone: true,
    imports: [FormsModule, InputTextModule, ButtonModule, ReactiveFormsModule, CardModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    

    // constructor(private fb: FormBuilder, private loginService: LoginService) {
    //     this.loginForm = this.fb.group({
    //         login: ['', [Validators.required]],
    //         senha: ['', [Validators.required]]
    //     });
    // }

    // onSubmit() {
    //     if (this.loginForm.valid) {
    //         this.loginInvalido.set(false);
    //         this.loginService.efetuarLogin(this.loginForm.value.login, this.loginForm.value.senha).subscribe({
    //             next: (response) => {
    //                 localStorage.setItem("financas.token", response);
    //                 this.router.navigateByUrl("/");
    //             },
    //             error: (e) => {
    //                 if (e.status === 404) {
    //                     this.loginInvalido.set(true);
    //                     return;
    //                 }
    //                 alert("Ocorreu um erro desconhecido!")
    //                 console.log(e);
    //             }
    //         });
    //     }
    // }
}

