import { Routes } from '@angular/router';
import { AccountList } from './account-list/account-list';
import { CreateAccount } from './create-account/create-account';
import { Deposit } from './deposit/deposit';
import { Withdraw } from './withdraw/withdraw';
import { AccountDetails } from './account-details/account-details';

export const routes: Routes = [
    {path: 'accounts' , component:AccountList},
    { path: 'create-account', component:CreateAccount},
    { path: 'deposit/:id' , component:Deposit},
    { path: '' , redirectTo:'accounts',pathMatch:'full'},
    { path: 'withdraw/:id', component:Withdraw},
    {
  path: 'account-details/:id',
  component: AccountDetails
}

];
