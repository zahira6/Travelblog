import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/users/auth.service';
import CustomValidators from 'src/app/model/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    PasswordConfirm: new FormControl('')
  });
  submitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ){ }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      email:['',
        Validators.required,
        Validators.email
    ],
      password: ['',
        Validators.required,
      ],
      passwordConfirm:['',
        Validators.required,
      ]},
      {validator: CustomValidators.MatchValidator('password', 'passwordConfirm')}
  )};

  get f(): { [key: string]: AbstractControl} {
    return this.registrationForm.controls;
  }


  onSubmit(): void {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }
    this.authService.register(this.registrationForm.value.email, this.registrationForm.value.password).subscribe(
      (i) => {console.log(i);
      alert("You are registered");
      this.router.navigate(['/user/login']);},
      (error) => {
        console.log(error);
        alert("This email is already registered");
      }
  )}

  onReset(): void {
    this.submitted = false;
    this.registrationForm.reset();
  }
}
