import React, { Component } from "react";
import IPOService from "../services/IPOService";

export default class Company extends Component {
    constructor(props) {
        super(props);
        this.onChangecompanyName = this.onChangecompanyName.bind(this);
        this.onChangeturnover = this.onChangeturnover.bind(this);
        this.onChangeceo = this.onChangeceo.bind(this);
        this.onChangeboardOfDirectors = this.onChangeboardOfDirectors.bind(this);
        this.onChangebriefWriteup = this.onChangebriefWriteup.bind(this);
        this.onChangesectorName = this.onChangesectorName.bind(this);
        this.getCompany = this.getCompany.bind(this);
        this.updateCompany = this.updateCompany.bind(this);
        this.deleteCompany = this.deleteCompany.bind(this);

        this.state = {
            currentCompany: {
                id: null,
                companyName: "",
                turnover: 0,
                ceo: "",
                boardOfDirectors: "",
                briefWriteup: "",
                sectorName: "",
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getCompany(this.props.match.params.id);
    }

    onChangecompanyName(e) {
        const companyName = e.target.value;

        this.setState(function (prevState) {
            return {
                currentCompany: {
                    ...prevState.currentCompany,
                    companyName: companyName
                }
            };
        });
    }
    onChangeturnover(e) {
        const turnover = e.target.value;

        this.setState(function (prevState) {
            return {
                currentCompany: {
                    ...prevState.currentCompany,
                    turnover: turnover
                }
            };
        });
    }
    onChangeceo(e) {
        const ceo = e.target.value;

        this.setState(function (prevState) {
            return {
                currentCompany: {
                    ...prevState.currentCompany,
                    ceo: ceo
                }
            };
        });
    }
    onChangeboardOfDirectors(e) {
        const boardOfDirectors = e.target.value;

        this.setState(function (prevState) {
            return {
                currentCompany: {
                    ...prevState.currentCompany,
                    boardOfDirectors: boardOfDirectors
                }
            };
        });
    }
    onChangebriefWriteup(e) {
        const briefWriteup = e.target.value;

        this.setState(function (prevState) {
            return {
                currentCompany: {
                    ...prevState.currentCompany,
                    briefWriteup: briefWriteup
                }
            };
        });
    }
    onChangesectorName(e) {
        const sectorName = e.target.value;

        this.setState(function (prevState) {
            return {
                currentCompany: {
                    ...prevState.currentCompany,
                    sectorName: sectorName
                }
            };
        });
    }

    getCompany(id) {
        IPOService.getCompany(id)
            .then(response => {
                this.setState({
                    currentCompany: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }


    updateCompany() {
        IPOService.updateCompany(
            this.state.currentCompany.id,
            this.state.currentCompany
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The Company was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteCompany() {
        IPOService.deleteCompany(this.state.currentCompany.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/company')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentCompany } = this.state;
    
        return (
          <div>
            {currentCompany ? (
              <div className="edit-form">
                <h4>Company</h4>
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Company Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="companyName"
                      value={currentCompany.companyName}
                      onChange={this.onChangecompanyName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="title">Turnover</label>
                    <input
                      type="text"
                      className="form-control"
                      id="turnover"
                      value={currentCompany.turnover}
                      onChange={this.onChangeturnover}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="title">CEO</label>
                    <input
                      type="text"
                      className="form-control"
                      id="ceo"
                      value={currentCompany.ceo}
                      onChange={this.onChangeceo}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="title">Board of Directors</label>
                    <input
                      type="text"
                      className="form-control"
                      id="boardOfDirectors"
                      value={currentCompany.boardOfDirectors}
                      onChange={this.onChangeboardOfDirectors}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="title">About the company</label>
                    <input
                      type="text"
                      className="form-control"
                      id="briefWriteup"
                      value={currentCompany.briefWriteup}
                      onChange={this.onChangebriefWriteup}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="title">Sector Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="sectorName"
                      value={currentCompany.sectorName}
                      onChange={this.onChangesectorName}
                    />
                  </div>
                </form>
    
                <button
                  className="badge badge-danger mr-2"
                  onClick={this.deleteCompany}
                >
                  Delete
                </button>
    
                <button
                  type="submit"
                  className="badge badge-success"
                  onClick={this.updateCompany}
                >
                  Update
                </button>
                <p>{this.state.message}</p>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Company...</p>
              </div>
            )}
          </div>
        );
      }
}