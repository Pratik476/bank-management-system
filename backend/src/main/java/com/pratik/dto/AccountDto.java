package com.pratik.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class AccountDto {
 
	   private Long id;
	   
	   private  String accountHolderName;
	   
	   private Double balance;
}
