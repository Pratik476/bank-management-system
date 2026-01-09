import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AccountService } from '../account';
import { Account } from '../model/account';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './account-details.html',
  styleUrls: ['./account-details.css'],
})
export class AccountDetails implements OnInit {

  id!: number;
  account!: Account;

  constructor(
    private accountservice: AccountService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // 1️⃣ get id from route
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID from route =', this.id);

    if (isNaN(this.id)) {
      console.error('Invalid ID from route');
      return;
    }

    // 2️⃣ call backend
    this.accountservice.getAccountById(this.id).subscribe({
      next: (data) => {
        console.log('Account Data =', data);

        this.account = data;

        // 3️⃣ force UI refresh
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('ERROR loading account =', err);
      }
    });
  }
}
