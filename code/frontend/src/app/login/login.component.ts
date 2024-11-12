import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { LoginService } from './login.service';
import { single } from 'rxjs';

@Component({    
    standalone: true,
    imports: [FormsModule, InputTextModule, ButtonModule, ReactiveFormsModule, CardModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    router = inject(Router);
    loginForm!: FormGroup;
    submitted = signal(false);
    loginInvalido = signal(false);
    errorsMessage = signal<string[]>([]);

    constructor(private fb: FormBuilder, private loginService: LoginService) {
        this.loginForm = this.fb.group({
            login: ['', [Validators.required]],
            senha: ['', [Validators.required]]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.submitted.set(true);
            this.loginInvalido.set(false);
            this.loginService.efetuarLogin(this.loginForm.value.login, this.loginForm.value.senha).subscribe({
                next: (response) => {
                    localStorage.setItem("energia.token", response);
                    console.log(response);
                    this.router.navigateByUrl("/");
                },
                error: (e) => {this.processarFalha(e)}
            });
        }
    }

    processarFalha(fail: any) {
        debugger
        this.errorsMessage.set([...fail]);
        this.loginInvalido.set(true);
    }
}

