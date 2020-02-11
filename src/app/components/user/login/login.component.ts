import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { UserInterface } from 'src/app/models/user-interface';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  isPasswordError = false;
  spinner = false

  user: UserInterface = {
    email: '',
    password: ''
  };

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    this.spinner = true
    return this.authService.loginUser(this.user.email, this.user.password).subscribe(data =>{
      this.authService.setUser(data)
      this.spinner = false
      this.router.navigate(['/user/profile']);
    },
      error => this.functionErrorPassword() 
    );
  }

  functionErrorPassword() {
    this.spinner = false
    this.isPasswordError = true
    this.user.password = ''
    setTimeout (() => {
      this.isPasswordError = false
    }, 3500); 
  }

}
