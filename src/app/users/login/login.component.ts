import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/users/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;
  public showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ){ }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',
        Validators.required,
        Validators.email
    ],
      password: ['',
        Validators.required,
      ],
  });
  }

  get f(): { [key: string]: AbstractControl} {
    return this.loginForm.controls;
  }

  OnClick(): void {
    this.showPassword = !this.showPassword
  }


  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      (i) => {console.log(i);
      alert("You are logged in");
      this.router.navigate(['user/profile']);},
      (error) => {
        console.log(error);
        alert("Wrong email or password");
      }
  )}

  onReset(): void {
    this.submitted = false;
    this.loginForm.reset();
  }

}

