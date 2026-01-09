package com.pratik.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pratik.dto.AccountDto;
import com.pratik.service.AccountService;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin("http://localhost:4200")
public class AccountController {

	private AccountService accountService;
	
	
	
	
	public AccountController(AccountService accountService) {
		super();
		this.accountService = accountService;
	}



    @PostMapping
	public ResponseEntity<AccountDto> addAccount(@RequestBody AccountDto accountDto)
	{
		System.out.println(accountDto);
    	return new ResponseEntity<>(accountService.createAccount(accountDto),HttpStatus.CREATED);
	}
	
    @GetMapping("/{id}")
    public ResponseEntity<AccountDto> getAccountById(@PathVariable Long id)
    {
    	AccountDto accountDto= accountService.getAccountById(id);
    	
    	return ResponseEntity.ok(accountDto);
    }
    
    
    @PutMapping("/{id}/deposit")
    public ResponseEntity<AccountDto> deposite(@PathVariable Long id,@RequestBody Map<String, Double>request)
    {
      Double balance=  request.get("balance");
    	
    	AccountDto accountDto= accountService.deposit(id, balance);
      
      return ResponseEntity.ok(accountDto);
    }
    
    
    @PutMapping("/{id}/withdraw")
    public ResponseEntity<AccountDto> withdraw(@PathVariable Long id,@RequestBody Map<String, Double>request)
    {
    	Double balance=  request.get("balance");
    	
    AccountDto accountDto=	accountService.withdraw(id, balance);
    
    return ResponseEntity.ok(accountDto);
    }
    
    
    @GetMapping
    public ResponseEntity<List<AccountDto>>getAllAccounts()
    {
    	List<AccountDto> accountDto= accountService.getAllAccounts();
    	
    	return ResponseEntity.ok(accountDto);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
        accountService.deleteAccount(id);
        return ResponseEntity.noContent().build(); // 204
    }

    
    
}
