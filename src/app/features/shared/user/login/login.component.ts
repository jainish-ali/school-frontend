import { Component } from '@angular/core';
import { SwitchButton } from '../../interfaces/switch-button';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ErrorModalComponent } from '../../components/error-modal/error-modal.component';
import { TokenService } from 'src/app/features/http-services/token.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  viewType: string = "swatch";
  spinnerLoading: boolean = false;
  registerForm!: FormGroup;
  constructor (private modalService: BsModalService,    private tokenService: TokenService,){}
  switchBtnConfig: SwitchButton = {
    leftLabel: "Admin",
    leftValue: "Admin",
    rightLabel: "User",
    rightValue: "user",
    id: "image-mode",
  };
  ngOnInit(){
    this.setFormValue();
  }
  setFormValue() {
    this.registerForm = new FormGroup(
      {
        email: new FormControl(
          '',
          Validators.compose([Validators.required])
        ),
        password: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.minLength(3)])
        ),
      },
      {}
    );
  }
  onSwitch(data: string) {
    this.viewType = data;
    // const anyService = this.owlCar as any;
    // // console.log("this.owlCar: ", this.owlCar);
    // const carouselService = anyService.carouselService as CarouselService;
    // carouselService.register("");
    // carouselService.refresh();
    // this.cd.detectChanges();
  }
  modalRef?: BsModalRef;
  bsModalRef?: BsModalRef;
  onSubmit(formValue : any) {
    console.log(formValue,'form');
    
    this.tokenService.generateToken(formValue);
  }
}
