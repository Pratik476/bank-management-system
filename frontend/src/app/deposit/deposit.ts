import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account';
import { Account } from '../model/account';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './deposit.html',
  styleUrls: ['./deposit.css'],
})
export class Deposit implements OnInit {

  accountId!: number;
  amount!: number;
  account!: Account;

  successMessage = '';
  isSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.accountId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAccount();
  }

  loadAccount() {
    this.accountService.getAccountById(this.accountId).subscribe({
      next: (data) => this.account = data,
      error: (err) => console.error('Error loading account', err)
    });
  }

  submitDeposit() {
    
    if (!this.amount || this.amount <= 0 || this.amount > 10000000) {
      this.successMessage = '❌ Invalid amount! Please enter an amount greater than 0';
      this.isSuccess = false;
      this.cdr.detectChanges();

     
      setTimeout(() => {
        this.successMessage = '';
        this.cdr.detectChanges();
      }, 2000);
      return;
    }

    
    this.accountService.deposit(this.accountId, this.amount).subscribe({
      next: () => {
        this.successMessage = '✅ Deposit Successful! ';
        this.isSuccess = true;
        this.cdr.detectChanges();

        setTimeout(() => {
          this.router.navigate(['/accounts']);
        }, 2000);
      },
      error: () => {
        this.successMessage = '❌ Deposit Failed! Try again.';
        this.isSuccess = false;
        this.cdr.detectChanges();
      }
    });
  }

  goBack() {
    this.router.navigate(['/accounts']);
  }
}
