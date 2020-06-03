import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhoneService } from '../shared/phone.service';
import { PhoneRequest } from '../shared/phone.request';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { PhoneMnemonics } from '../shared/phone.mnemonics';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-phone-mnemonics',
  templateUrl: './phone-mnemonics.component.html',
  styleUrls: ['./phone-mnemonics.component.css']
})
export class PhoneMnemonicsComponent implements OnInit {
  phoneMnemonicForm: FormGroup;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  submitted = false;
  dataSource: any;
  displayedColumns: string[] = ['id', 'phoneNumber', 'mnemonic'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions = [10, 20, 50, 100];
  pageSize: number = 10;
  currentPage: number = 0;
  totalPosts = 0;
  

  constructor(
    private _formBuuilder: FormBuilder,
    private service: PhoneService
  ) { }


  ngOnInit() {
    this.phoneMnemonicForm = this._formBuuilder.group({
      phoneNumber: ['', Validators.required],
    })
  }

  get f() { return this.phoneMnemonicForm.controls; }

  onSubmit() {
    this.submitted = true;
    // if (this.phoneMnemonicForm.invalid) {
    //     return;
    // } else {
      const  number = this.phoneMnemonicForm.controls['phoneNumber'].value;
      if(number){
        let  request = new PhoneRequest();
        request.phoneNumber = number;
        this.service.crearePhoneMnemonis(request).subscribe(data =>{
            if(data){
              this.getPhoneNumberMnemonics()
            }
        })
       
      // }
    }

  } 




  getPhoneNumberMnemonics(){
    const  number = this.phoneMnemonicForm.controls['phoneNumber'].value;
    if(number){
    this.service.getPaginatedPhoneMnemonics(this.pageSize, this.currentPage, number).subscribe(data => {
      if(data){
        this.dataSource = new MatTableDataSource<PhoneMnemonics>(data.content);
        this.totalPosts = data.totalElements;
      }
    })
  }
}


ngAfterViewInit() {
  if(this.totalPosts > 0)
  this.dataSource.paginator = this.paginator
}


onChangePageEvent(pageData: PageEvent){
  console.log(PageEvent);
  this.pageSize = pageData.pageSize;
  this.currentPage = pageData.pageIndex + 1;
  const  number = this.phoneMnemonicForm.controls['phoneNumber'].value;
  this.service.getPaginatedPhoneMnemonics(this.pageSize, this.currentPage, number).subscribe(data => {
    if(data){
      this.dataSource = new MatTableDataSource<PhoneMnemonics>(data.content);
      this.totalPosts = data.totalElements;
    }
   
  })

}



onReset(){
  this.phoneMnemonicForm.reset();
  this.dataSource = [];
  this.totalPosts = 0;
}

}
