import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account';
import { Account } from '../model/account';

@Component({
  selector: 'app-withdraw',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './withdraw.html',
  styleUrls: ['./withdraw.css'],
})
export class Withdraw implements OnInit {

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
    error: () => console.error('Error loading account')
  });
}


  submitWithdraw() {

    if (!this.amount || this.amount <= 0) {
      this.showError('❌ Invalid amount! Enter valid amount');
      return;
    }

    if (this.amount > this.account.balance) {
      this.showError('❌ Insufficient Balance!');
      return;
    }

    this.accountService.withdraw(this.accountId, this.amount).subscribe({
      next: () => {
        this.successMessage = '✅ Withdraw Successful!';
        this.isSuccess = true;
        this.cdr.detectChanges();

        setTimeout(() => {
          this.router.navigate(['/accounts']);
        }, 2000);
      },
      error: () => {
        this.showError('❌ Withdraw Failed! Try again.');
      }
    });
  }

  showError(msg: string) {
    this.successMessage = msg;
    this.isSuccess = false;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.successMessage = '';
      this.cdr.detectChanges();
    }, 2000);
  }

  goBack() {
    this.router.navigate(['/accounts']);
  }
}
