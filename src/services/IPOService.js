import axios from 'axios';

import http from "../http-common";
const ipodetail = "http://localhost:8080/getipodetails";
const stockexchange = "http://localhost:8080/getstockexchange";
const company = "http://localhost:8080/getallcompany";
const exchangemap = "http://localhost:8080/listallmap";
const upcomingipo = "http://localhost:8080/getupcomingipodetails";
const sector = "http://localhost:8080/getallsector";

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