package com.socgen.stockmarketcharting.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;
@Entity
@Table(name="CompanyStockExchangemap")
@Getter
@Setter
@NamedQuery(name="CompanyStockExchange.findById",query="SELECT company FROM CompanyStockExchangeMap c WHERE c.stockexchange=:stockexchange")
@NamedQuery(name="CompanyStockExchange.findBycompanyCode",query="SELECT companyCode FROM CompanyStockExchangeMap c WHERE c.stockexchange=:stockexchange AND c.company=:company")
public class CompanyStockExchangeMap {
	
	
	@Id
	@GeneratedValue
	private Long id;
	private String companyCode;
	@ManyToOne(fetch=FetchType.LAZY, cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	private Company company;
	@ManyToOne(fetch=FetchType.LAZY)
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	private StockExchange stockexchange;
	public CompanyStockExchangeMap() {
		super();
	}
	
	
}
