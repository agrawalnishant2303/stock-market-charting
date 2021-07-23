import React, { Component } from 'react';
import '../App.css';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import ReactFusioncharts from "react-fusioncharts";
import Card from "react-bootstrap/Card"

import { Switch, HashRouter, Router, Route, Link } from "react-router-dom";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);
let chartConfigs = {
    type: 'column2d',// The chart type
    width: '700', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
        // Chart Configuration
        chart: {
            caption: "Comparison of two companies over time",
            exportEnabled: "1",
            exportMode: "client",
            xaxisname: "Date",
            yaxisname: "Share Price",
            numberprefix: "Rs. ",
            showhovereffect: "1",
            formatnumberscale: "1",
            plottooltext:
                "<b>$dataValue</b> is the price of <b>$seriesName</b> in $label",
            theme: "fusion",
            drawcrossline: "1"
        },
        // Chart Data
        data: []
    },
};

export default class CompareCompany extends React.Component {
    
    constructor(props) {

        super(props);
        this.state = {
            companySelected: "",
            secondCompanySelected: "",
            name: "",
            from1: "",
            to1: "",
            companyValue1: null,
            companyValue2: null,
            category: ""
        };
        
        
        
        this.dosearch = this.dosearch.bind(this);

    }
    onChangecompanySelected(e) {
        this.setState({
            companySelected: e.target.value
        });
    }
    onChangesecondCompanySelected(e) {
        this.setState({
            secondCompanySelected: e.target.value
        });
    }
    onChangename(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangefrom1(e) {
        this.setState({
            from1: e.target.value
        });
    }
    onChangeto1(e) {
        this.setState({
            to1: e.target.value
        });
    }

    dosearch() {
        var dataSend = {
            companyName1: this.state.companySelected,
            companyName2: this.state.secondCompanySelected,
            name: this.state.name,
            from1: this.state.from1,
            to1: this.state.to1
        };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'frontend'
            },
            body: JSON.stringify(dataSend)
        };
        console.log(dataSend);
        fetch('http://localhost:8080/getdifferentcompany', requestOptions)
            .then(response => {


                return response.json();
            })
            .then(response => {
                if(response.firstList != null && response.secondList != null){
                    console.log(response.firstList);
                    console.log(response.secondList);
                    let category = [];
                    let companyValue1 = [];
                    let companyValue2 = [];
                    var len1 = response.firstList.length;
                    var len2 = response.secondList.length;
                    for(var i=0;i<len1;i++){
                        let date = response.firstList[i].datee;
                        let price1 = response.firstList[i].shareprice;

                        let tempObj = {
                            "label":date
                        }
                        let comp1Obj = {
                            "value":price1
                        }
                        category.push(tempObj);
                        companyValue1.push(comp1Obj);
                    }
                    for(var i=0;i<len2;i++){
                        let date = response.secondList[i].datee;
                        let price1 = response.secondList[i].shareprice;

                        let tempObj = {
                            "label":date
                        }
                        let comp1Obj = {
                            "value":price1
                        }
                        companyValue2.push(comp1Obj);
                    }
                    return category;
                    console.log(companyValue1);
                    console.log(companyValue2);
                    console.log(category);
                    this.setState({
                        category:category,
                        companyValue1:companyValue1,
                        companyValue2:companyValue2
                    })
                }
            })
        // .then(response => {
        //     console.log(firstMap);//real print of array


        // var prevDs = Object.assign({}, this.state.dataSource2Companies);
        // data = firstMap.get("firstlist");
        // data.forEach((value,key) => )
        // firstMap.get((value, key) => {
        //     //		data[key] = {
        //     this.setState({
        //         category:
        //     })


        //     this.setState({
        //         dataSource2Companies: prevDs,
        //     });

        //     console.log('data' + JSON.stringify(data));



        // });
        // console.log('this.' + data);
        // console.log('chart' + JSON.stringify(chartConfigs));


        // })//endo of .then line 53	



    }
    
    render() {
        let dataSource2Companies = {
            chart: {
                caption: "Comparison of two companies over time",
                exportEnabled: "1",
                exportMode: "client",
                xaxisname: "Date",
                yaxisname: "Share Price",
                numberprefix: "Rs. ",
                showhovereffect: "1",
                formatnumberscale: "1",
                plottooltext:
                    "<b>$dataValue</b> is the price of <b>$seriesName</b> in $label",
                theme: "fusion",
                drawcrossline: "1"
            },
            categories: [{
                category:this.state.category
            }],
            dataset: [
                {
                    seriesname: this.state.companySelected,
                    data: this.state.companyValue1
                },
                {
                    seriesname:this.state.secondCompanySelected,
                    data:this.state.companyValue2
                }
            ]
        };
        return (
            <div className="App">


                <div>
                    <div className="form-group" class="col-md-6">
                        <label htmlFor="title">First Company</label>
                        <input
                            type="text"
                            className="form-control"
                            id="companyselected"
                            required
                            value={this.state.companyselected}
                            onChange={this.onChangecompanySelected.bind(this)}
                            name="companyselected"
                        />
                    </div>

                    <div className="form-group" class="col-md-6">
                        <label htmlFor="title">Second Company</label>
                        <input
                            type="text"
                            className="form-control"
                            id="secondcompanyselected"
                            required
                            value={this.state.secondcompanyselected}
                            onChange={this.onChangesecondCompanySelected.bind(this)}
                            name="secondcompanyselected"
                        />
                    </div>

                    <div className="form-group" class="col-md-6">
                        <label htmlFor="title">From Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="from1"
                            required
                            value={this.state.from1}
                            onChange={this.onChangefrom1.bind(this)}
                            name="from1"
                        />
                    </div>
                    <div className="form-group" class="col-md-6">
                        <label htmlFor="title">To Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="to1"
                            required
                            value={this.state.to1}
                            onChange={this.onChangeto1.bind(this)}
                            name="to1"
                        />
                    </div>
                    <div className="form-group" class="col-md-6">
                        <label htmlFor="title">Exchange Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={this.state.name}
                            onChange={this.onChangename.bind(this)}
                            name="name"
                        />
                    </div>


                    <button onClick={this.dosearch} className="btn btn-success">
                        Submit
                    </button>
                </div>

                
				<div id="chart">
					<Card id="chart-display">
						<Card.Title id="chart-header">Chart</Card.Title>
						{/* <Card.Body id="chart-body">
							{this.state.secondcompanyselected === ''}?
							<ReactFC
								id="fusioncharts"
								type="line"
								width="100%"
								height="100%"
								dataFormat="JSON"
							/>
						</Card.Body>
						: */}
						<ReactFC
							type="msline"
							width="100%"
							height="100%"
							dataFormat="JSON"
							dataSource={this.dataSource2Companies} />
					</Card>
				</div> 


            </div>
        );
    }
}