import { Component } from '@angular/core';
import { SwitchButton } from '../../interfaces/switch-button';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ErrorModalComponent } from '../../components/error-modal/error-modal.component';
import { TokenService } from 'src/app/features/http-services/token.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  viewType: string = "swatch";

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.setIntialvalue()
  }

  /**setinitial value on login form */
  setIntialvalue() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  /**submit method here for login */
  submit(formvalue: any) {
    this.tokenService.generateToken(formvalue)
  }
}