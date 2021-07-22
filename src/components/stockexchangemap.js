
import React, { Component } from "react";
import { ReactDOM } from "react";
import IPOService from "../services/IPOService";
import Table from "react-bootstrap/Table";

export default class StockExchangeMap extends Component {
    constructor(props) {
        super(props);
        this.savemap = this.savemap.bind(this);
        this.newmap = this.newmap.bind(this);
        this.state = {
            companyName: "",
            companycode: "",
            name: "",
            submitted:false,
            exchangeMap:[],
        };
    }
    componentDidMount()
       {
        IPOService.getExchangeMap().then((response => {
            this.setState({exchangeMap:response.data})
        }));
       }
    changecompanyName(e){
        this.setState({companyName:e.target.value});
    }
    changecompanycode(e){
        this.setState({
            companycode: e.target.value
        });
    }
    changename(e){
        this.setState({
            name:e.target.value
        });
    }
    

    savemap() {
        var data = {
            companyName: this.state.companyName,
            companycode: this.state.companycode,
            name: this.state.name
        };
        console.log(JSON.stringify(data));
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'frontend'
            },
            body: JSON.stringify(data)
        };
        fetch('http://localhost:8080/mapcompanycode', requestOptions)
        .then(response => {
            this.setState({
                submitted:true
            });
            console.log(response.data);
        })
        .catch(e=> {
            console.log(e);
        });
    }

    newmap() {
        this.setState({
            companyName:"",
            companycode:"",
            name:"",
            submitted:false
        });
    }

    render() {
        return (
            <div>
                <div className="submit-form">
                    {this.state.submitted ? (
                        <div>
                            <h4>You submitted successfully!</h4>
                            <button className="btn btn-success" onClick={this.newmap}>
                                Add
                            </button>
                        </div>
                    ) : (
                            <div>
                             <div className="form-group">
                                 <label htmlFor="title">Company Name</label>
                                 <input
                                    type="text"
                                     className="form-control"
                                     id="companyName"
                                     required
                                     value={this.state.companyName}
                                     onChange={this.changecompanyName.bind(this)}
                                    name="companyName"
                                 />
                             </div>

                            <div className="form-group">
                                <label htmlFor="title">Company Code</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="companycode"
                                    required
                                    value={this.state.companycode}
                                    onChange={this.changecompanycode.bind(this)}
                                    name="companycode"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Stock Exchange Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    required
                                    value={this.state.name}
                                    onChange={this.changename.bind(this)}
                                    name="name"
                                />
                            </div>
                            

                            <button onClick={this.savemap} className="btn btn-success">
                                Submit
                            </button>
                        </div>
                    )}
                </div>
                <div>
                <h1 className="text-center"> Company List</h1>
                <Table className = "table table-dark table-striped table-hover">
                    <thead className ="thead-dark">
                        <tr>
                            <td>Company Exchange Map-ID</td>
                            <td>Company Name</td>
                            <td>Exchange Name </td>
                            <td>Company Code</td>
                        </tr>
                    </thead>
                
            <tbody>
                {
                    this.state.exchangeMap.map(
                        company =>
                        <tr key = {company.id}>
                            <td>{company.id}</td>
                            <td>{company.company.companyName}</td>
                            <td>{company.stockexchange.name}</td>
                            <td>{company.companyCode}</td>
                          
                            
                        </tr>
                    )
                }
                </tbody>
                </Table>
            </div>
            </div>

        );
    }
}
