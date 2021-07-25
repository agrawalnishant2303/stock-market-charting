import axios from 'axios';

import http from "../http-common";
const ipodetail = "https://stockmarketcharting.herokuapp.com/getipodetails";
const stockexchange = "https://stockmarketcharting.herokuapp.com/getstockexchange";
const company = "https://stockmarketcharting.herokuapp.com/getallcompany";
const exchangemap = "https://stockmarketcharting.herokuapp.com/listallmap";
const upcomingipo = "https://stockmarketcharting.herokuapp.com/getupcomingipodetails";
const sector = "https://stockmarketcharting.herokuapp.com/getallsector";


class IPOService{
    getUpcomingIPOs(){
        return axios.get(upcomingipo);
    }
    getAll(){
        return axios.get(ipodetail);
    }

    getAllStockExchange(){
        return axios.get(stockexchange);
    }

    getAllCompany(){
        return axios.get(company);
    }
    getExchangeMap(){
        return axios.get(exchangemap);
    }
    getCompany(id){
        return http.get(`/company/${id}`)
    }
    updateCompany(id,data){
        return http.put(`/company/${id}`, data)
    }
    deleteCompany(id) {
        return http.delete(`/company/${id}`);
    }
    getAllSector(){
        return axios.get(sector)
    }


}

export default new IPOService();