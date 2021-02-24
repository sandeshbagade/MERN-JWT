import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";
import { Route, Switch, useLocation } from 'react-router-dom';




class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {products: []};
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  componentDidMount(){
    axios
    .get("/api/products")
    .then(res => this.setState({ products: res.data }))
    .catch(err =>console.log(err))
  }
  render() {
    const { user } = this.props.auth;

    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <Switch>
            <Route exact path="/dashboard/:id">
            <div className="row">
              <div className="landing-copy col s12 center-align">
                {this.state.products[this.props.match.params.id]?
                 <div>
                 <h5>{this.state.products[this.props.match.params.id].name}</h5><br/>
                 <img src={this.state.products[this.props.match.params.id].image} style={{width:'300px'}}></img>
                 <h6>Price:{this.state.products[this.props.match.params.id].price}</h6> 
                 <h6>Sku Code:{this.state.products[this.props.match.params.id].skuCode}</h6> 
                 <h6>Features:<br/>
                 Feature 1: {this.state.products[this.props.match.params.id].features.feature_1}<br/>
                 Feature 2: {this.state.products[this.props.match.params.id].features.feature_2}<br/>
                 </h6>    
                 </div>:
                ""}
               </div>
                </div>  
            </Route>
            <Route exact path="/dashboard/">
              <div className="row">
              <div className="landing-copy col s12 center-align">
                <h4>
                  <b>Hey there,</b> {user.name.split(" ")[0]}

                </h4>
                {this.state.products.map( (val, ind) =>(
                <div key={val._id} style={{display:'inline-block', margin:'10px'}} onClick={()=> this.props.history.push(`/dashboard/${ind}`)}>
                  <h5>{val.name}</h5>
                  <img src={val.image}></img> 
                  <h6>Price:{val.price}</h6> 
                </div>)
                )}<br/>
                  <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  onClick={this.onLogoutClick}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Logout
                </button>
              </div>
            </div>
            </Route>
            </Switch>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
