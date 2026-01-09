package com.pratik.service;

import java.util.List;

import com.pratik.dto.AccountDto;

public interface AccountService {
	
	AccountDto createAccount(AccountDto account);
	
	AccountDto getAccountById(Long id);
	
	AccountDto deposit(Long id, Double balance);
	
	AccountDto withdraw(Long id, Double balance);
	
	List<AccountDto> getAllAccounts();
	
	void deleteAccount(Long id);

}
