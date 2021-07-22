package com.socgen.stockmarketcharting.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="StockExchange")
@Getter
@Setter
public class StockExchange {
	@Id
	@GeneratedValue
	private Long id;
	private String name;
	
	@OneToMany(targetEntity = CompanyStockExchangeMap.class)
	private List<CompanyStockExchangeMap> compStockmap;
	
	
	
}
