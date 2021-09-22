import React from "react";
import { useHistory } from "react-router-dom";

import TangibleITLogo from "../../Assets/Images/TangibleITLogo.png";
import axios from "axios";

import * as Icon from "react-feather";
import "./Header.css";

const Header = (props) => {
  const history = useHistory();
  const url = "https://acv-backend-demo.azurewebsites.net";
  return (
    <nav className="dash navbar navbar-expand-lg navbar-light bg-light fixed-top shadow border-bottom">
      <a className="navbar-brand" href="/">
        <img
          src={TangibleITLogo}
          width="136"
          height="32"
          className="d-inline-block align-top"
          alt="Tangible IT Logo"
        />
        <span className="badge badge-warning ml-2 fw-6">Admin</span>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className={window.location.pathname==="/coupons"||window.location.pathname==="/"?"nav-link active text-primary":"nav-link"} href="/coupons">
              <Icon.ShoppingBag size="18" strokeWidth="1.5" className="mr-2" />{" "}
              Coupons
            </a>
          </li>
          <li className="nav-item">
            <a className={window.location.pathname==="/contact"?"nav-link active text-danger":"nav-link"} href="/contact">
              <Icon.Mail size="18" strokeWidth="1.5" className="mr-2" />{" "}
              Contact
            </a>
          </li>
          <li className="nav-item">
            <a className={window.location.pathname==="/help"?"nav-link active text-info":"nav-link"} href="/help">
              <Icon.HelpCircle size="18" strokeWidth="1.5" className="mr-2" />{" "}
              Help
            </a>
          </li>
          <li className="nav-item">
            <a className={window.location.pathname==="/settings"?"nav-link active text-dark":"nav-link"} href="/settings">
              <Icon.Settings size="18" strokeWidth="1.5" className="mr-2" />{" "}
              Settings
            </a>
          </li>
          {/* <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="/">Action</a>
                        <a className="dropdown-item" href="/">Another action</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="/">Something else here</a>
                    </div>
                </li> */}
          {/* <li className="nav-item">
                    <a className="nav-link disabled" href="/">Disabled</a>
                </li> */}
        </ul>
        {window.location.pathname==="/coupons"||window.location.pathname==="/"?<>
          <div className="navbar-nav my-2 my-lg-0">
            <a className="btn btn-light align-items-center d-flex mr-2" href="/coupons" data-toggle="modal" data-target="#addModel">
                <Icon.Plus size="18" strokeWidth="1.5" className="mr-2" />{" "}
                Add
              </a>
            <a className="btn btn-light align-items-center d-flex mr-2" href="/coupons">
                <Icon.RefreshCcw size="15" strokeWidth="1.5" className="mr-2" />{" "}
                Refresh
              </a>
          </div>
          <form className="form-inline my-2 my-lg-0" onSubmit={(e)=>{
            e.preventDefault();
            const search=document.getElementById("input-search").value;
            console.log(search);
            axios
              .post(`${url}/api/admin/search-coupon-by-school`, {
                schoolName: search,
              })
              .then((res) => {
                console.log(res);
                props.setcouponsData(res.data.result || null);
              })
              .catch((err) => {
                console.log(err, err.response);
                props.setMsgData({ message: err.response.data.message, type: err.response.status } || null );
              })
          }}>
            <input className="form-control mr-sm-2" type="search" placeholder="Search school name" aria-label="Search" id="input-search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
          <a className="btn btn-outline-danger color-white align-items-center d-flex ml-2 logoutBtn" onClick={()=>{
            sessionStorage.clear();
            history.push("/");
          }}>
                <Icon.LogOut size="18" strokeWidth="1.5" className="mr-2" />{" "}
                Sign out
              </a>
        </>:<a className="btn btn-outline-danger color-white align-items-center d-flex ml-2 logoutBtn" onClick={()=>{
            sessionStorage.clear();
            history.push("/");
          }}>
                <Icon.LogOut size="18" strokeWidth="1.5" className="mr-2" />{" "}
                Sign out
              </a>}
      </div>
    </nav>
  );
};

export default Header;
