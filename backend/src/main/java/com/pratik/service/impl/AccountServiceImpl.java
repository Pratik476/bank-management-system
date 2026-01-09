package com.pratik.service.impl;

import java.text.Collator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.pratik.dto.AccountDto;
import com.pratik.entity.Account;
import com.pratik.mapper.AccountMapper;
import com.pratik.repository.AccountRepository;
import com.pratik.service.AccountService;

import jakarta.transaction.Transactional;

@Service
public class AccountServiceImpl  implements AccountService {

	private AccountRepository accountRepository;
	
	public AccountServiceImpl(AccountRepository accountRepository) {
		super();
		this.accountRepository = accountRepository;
	}




	@Override
	public AccountDto createAccount(AccountDto accountDto) {
		
		Account account=AccountMapper.mapToAccount(accountDto);
	Account savedAccount=	accountRepository.save(account);
		
		return AccountMapper.mapToAccountDto(savedAccount);
	}




	@Override
	public AccountDto getAccountById(Long id) {
		
	Account account=	accountRepository.findById(id).orElseThrow( ()-> new RuntimeException("Account Does Not Exist"));  
		
		return AccountMapper.mapToAccountDto(account);
	}




	@Override
	public AccountDto deposit(Long id, Double balance) {
	
		Account account=	accountRepository.findById(id).orElseThrow( ()-> new RuntimeException("Account Does Not Exist"));  
		
	Double TotalBalance=account.getBalance()+balance;
	account.setBalance(TotalBalance);
	Account savedAccount=  accountRepository.save(account);
		
		return AccountMapper.mapToAccountDto(savedAccount);
	}




	@Override
	public AccountDto withdraw(Long id, Double balance) {
		
		Account account=	accountRepository.findById(id).orElseThrow( ()-> new RuntimeException("Account Does Not Exist"));  
		
		if(account.getBalance()<balance)
		{
			throw new RuntimeException("Insufficient Balance");
		}
		
		Double TotalBalance=account.getBalance()-balance;
		
		account.setBalance(TotalBalance);
		
		Account savedAccount= accountRepository.save(account);
		
		return AccountMapper.mapToAccountDto(savedAccount);
	}




	@Override
	public List<AccountDto> getAllAccounts() {
	
	return	accountRepository.findAll().stream().map((account)->AccountMapper.mapToAccountDto(account)).collect(Collectors.toList());
		
		
	}




	@Override
	@Transactional
	public void deleteAccount(Long id) {
	    if (!accountRepository.existsById(id)) {
	        throw new RuntimeException("Account Does Not Exist");
	    }
	    accountRepository.deleteById(id);
	}


}
