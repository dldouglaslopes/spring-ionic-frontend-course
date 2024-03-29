import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StateService } from '../../services/domain/state.service';
import { CityService } from '../../services/domain/city.service';
import { StateDTO } from '../../models/state.dto';
import { CityDTO } from '../../models/city.dto';
import { ClientService } from '../../services/domain/client.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  states : StateDTO[];
  cities : CityDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public stateService : StateService,
    public cityService : CityService,
    public clientService : ClientService,
    public alertCtrl : AlertController) {

    this.formGroup = this.formBuilder.group({
      name: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      type: ['1', [Validators.required]],
      cpfOrCnpj: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      password: ['123', [Validators.required]],
      patio: ['Rua Via', [Validators.required]],
      number: ['25', [Validators.required]],
      additional: ['Apto 3', []],
      district: ['Copacabana', []],
      zipCode: ['10828333', [Validators.required]],
      phone1: ['789456611', [Validators.required]],
      phone2: ['', []],
      phone3: ['', []],
      stateId: [null, [Validators.required]],
      cityId: [null, [Validators.required]]
    });
  }


  ionViewDidLoad() {
    this.stateService.findAll()
        .subscribe (response => {
          this.states = response;
          this.formGroup.controls.stateId.setValue(this.states[0].id);
          this.updateCities();
        },
        error => {});
  }

  updateCities() {
    let state_id = this.formGroup.value.stateId;

    this.cityService.findAll(state_id)
        .subscribe(response => {
          this.cities = response;
          this.formGroup.controls.cityId.setValue(null);
        },
        error => {});
  }

  signupUser() {
    this.clientService.insert(this.formGroup.value)
        .subscribe(response => {
          this.showInsertOk();
        },
        error => {});
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Success!',
      message: 'Registration done',
      enableBackdropDismiss: false, 
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });

    alert.present();
  }
}
