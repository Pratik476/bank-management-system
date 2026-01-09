import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account';
import { Account } from '../model/account';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-account.html',
  styleUrls: ['./create-account.css'],
})
export class CreateAccount {
  account: Account = new Account();
  successMessage: string = '';

  constructor(
    private accountservice: AccountService,
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  saveAccount() {
    this.accountservice.createAccount(this.account).subscribe({
      next: (data) => {
        console.log('Account saved:', data);

        
        this.successMessage = 'Account Created Successfully';
        this.cdr.detectChanges(); 

       
        setTimeout(() => {
          this.router.navigate(['/accounts']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error creating account', err);
      },
    });
  }
}
