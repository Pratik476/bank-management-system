import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../account';
import { Account } from '../model/account';
import  { Router } from '@angular/router';



@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-list.html',
  styleUrl: './account-list.css',
})
export class AccountList implements OnInit {

  accounts: Account[] = [];

  constructor(private accountservice: AccountService,private cdr: ChangeDetectorRef,private router:Router) {}

  ngOnInit(): void {
    this.getAllAccounts();
  }

  getAllAccounts(): void {
    this.accountservice.getAllAccounts().subscribe({
      next: (data) => {
         console.log('API DATA:', data);
        this.accounts = data;
          this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching accounts', err);
      }
    });
  }

  deposit(id:number)
  {
    this.router.navigate(['/deposit',id])
  }


  withdraw(id:number)
  {
    this.router.navigate(['/withdraw',id])
  }

 deleteAccount(id: number) {
  this.accountservice.deleteAccount(id).subscribe({
    next: () => this.getAllAccounts(),
    error: err => alert(err.error?.message || 'Delete failed')
  });
}

  view(id: number) {
  this.router.navigate(['/account-details', id]);
}



}
