import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ControlContainer } from '@angular/forms';
import { validateRex } from './validate-register';
import { city_name, SignupInfo } from '../format';
import { CommunicatorService } from '../communicator/communicator.service'

/*    1. formBuilder 用来构建表单数据
      2. formGroup 表示表单类型
      3. Validators 包含了表单内置的验证规则，如： Validators.required*/

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // 定义表单
  registerForm: FormGroup;
  cities_name: string[];
  signUpForm = {};

  // 表单验证不通过时显示的错误消息
  formErrors = {
    username: '',
    password1: '',
    password2: '',
    email: '',
    address: '',
  };

  // 为每一项表单验证添加说明文字
  validationMessage = {
    'username': {
      'minlength': 'Au moins 3 caratères',
      'maxlength': 'Au plus 15 caratères',
      'required': 'Champ obligatoire',
      'notdown': 'NE PAS commencer par le soulignement',
      'only': 'seulement Numéro,Caratère et Soulignement sont autorisés'
    },
    'password1': {
      'minlength': 'Au moins 8 caractères',
      'maxlength': 'Au plus 20 caractères',
      'required': 'Veuillez entrer le mot de passe',
      'notdown': 'Ne pas commencer par le soulignement',
      'only': 'Seulement les CHIFFRES,CARACTÈRES et SOULIGNEMENT sont autorisés'
    },
    'password2': {
      'confirmPassword': "两次输入密码不一致"   // unuseful for now
    },
    'email': {
      'email': 'Email invalide',
      'required': 'Champ obligatoire'
    },
    'address': {
      'maxlength': 'Au plus 30 caractères'
    }
  };

  // 添加 fb 属性，用来创建表单
  constructor(private fb: FormBuilder, private communicatorService: CommunicatorService) {
    this.cities_name = city_name;
    this.cities_name.push("Autre ville");
  }

  ngOnInit() {
    // 初始化时构建表单
    this.buildForm();
  }


  onSubmit() {
    if (this.check()) {
      this.signUp()
    } else {

    }
  }

  signUp() {
    //console.log(this.registerForm.value);
    this.signUpForm['city'] = this.registerForm.value.city;
    this.signUpForm['pword'] = this.registerForm.value.password1;
    this.signUpForm['uname'] = this.registerForm.value.username;
    this.signUpForm['address'] = this.registerForm.value.address;
    this.signUpForm['email'] = this.registerForm.value.email;
    //console.log(this.signUpForm)
    this.communicatorService.sigupUser(this.signUpForm)
      .subscribe(resp => {
        console.log(resp);
      });
  }

  /** check the signup form is valid or not */
  check(): boolean {
    if (this.registerForm.value['password1'] != this.registerForm.value['password2']) {
      console.log("两次密码输入不一致");
      return false;
    } else if (!this.registerForm.valid) {
      console.log(this.registerForm.valid);
      return false;
    }
    return true
  }

  // 构建表单方法
  buildForm(): void {
    // 通过 formBuilder构建表单
    this.registerForm = this.fb.group({
      /* 为 username 添加3项验证规则：
      * 1.必填， 2.最大长度为10， 3.最小长度为3， 4.不能以下划线开头， 5.只能包含数字、字母、下划线
      * 其中第一个空字符串参数为表单的默认值
      */
      'username': ['', [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(3),
        validateRex('notdown', /^(?!_)/),
        validateRex('only', /^[0-9a-zA-Z_]+$/)
      ]],
      'password1': ['', [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(8),
        validateRex('notdown', /^(?!_)/),
        validateRex('only', /^[0-9a-zA-Z_]+$/)
      ]],
      'password2': ['', []],
      'email': ['', [
        Validators.required,
        Validators.email
      ]],
      'address': ['', [
        Validators.maxLength(30)
      ]],
      'city': ['', []]

    });

    // 每次表单数据发生变化的时候更新错误信息
    this.registerForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    // 初始化错误信息
    this.onValueChanged();
  }

  // 每次数据发生改变时触发此方法
  onValueChanged(data?: any) {
    // 如果表单不存在则返回
    if (!this.registerForm) return;
    // 获取当前的表单
    const form = this.registerForm;

    // 遍历错误消息对象
    for (const field in this.formErrors) {
      // 清空当前的错误消息
      this.formErrors[field] = '';
      // 获取当前表单的控件
      const control = form.get(field);

      // 当前表单存在此空间控件 && 此控件没有被修改 && 此控件验证不通过
      if (control && control.dirty && !control.valid) {
        // 获取验证不通过的控件名，为了获取更详细的不通过信息
        const messages = this.validationMessage[field];
        // 遍历当前控件的错误对象，获取到验证不通过的属性
        for (const key in control.errors) {
          // 把所有验证不通过项的说明文字拼接成错误消息
          this.formErrors[field] += messages[key] + '\n';
        }
      }
    }
  }


}
