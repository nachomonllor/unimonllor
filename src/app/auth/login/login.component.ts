import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private router: Router,
    public authService: AuthService
  ) {
    this.createFormGroup();
  }

  ngOnInit(): void {
  }

  createFormGroup(): void {
    this.form = new FormGroup({
      email: new FormControl('idevkingos@gmail.com', Validators.required),
      password: new FormControl('123456', Validators.required),
    });
  }
  onSubmit(): void {
    this.authService.loginEmailUser(
      this.form.get('email').value,
      this.form.get('password').value
    ).then((res) => {
      debugger
      this.onLoginRedirect();
    }).catch(err => this.handleError(err));
  }
  onLoginRedirect(): void {
    this.router.navigate(['/home']);
  }
  onLogout() {
    this.authService.logoutUser();
  }
  handleError(err): void {
    console.log('err', err.message);
  }
}
