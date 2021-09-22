import React from "react";
import axios from "axios";
import * as Icon from "react-feather";
import Header from "../../Header/Header";
import { useLocation,useHistory } from "react-router-dom";

import "./Coupons.css";

const Coupons = (props) => {
  const location = useLocation();
  const history = useHistory();
  const url = "https://acv-backend-demo.azurewebsites.net";
  const [couponsData, setcouponsData] = React.useState(null);
  const [msgData, setMsgData] = React.useState(null);
  const [setUser] = React.useState(null);
  const [setToken] = React.useState(null);

  React.useEffect(() => {
    const tkn=window.sessionStorage.getItem("Token");
    const usr=window.sessionStorage.getItem("User");
    if(tkn&&usr){
      setUser(usr);
      setToken(tkn);
    }else{
      history.push('/')
    }
  },[]);
  React.useEffect(() => {
    document.getElementsByClassName("alert")[0]?.classList.add("show");
    axios
      .get(`${url}/api/admin/get-coupon-user`,{
        headers:{
          "x-access-token":window.sessionStorage.getItem("Token")
        }
      })
      .then((res) => {
        console.log(res);
        setcouponsData(res.data.result || null);
      })
      .catch((err) => {
        console.log(err, err.response);
        if(err?.response.status===401){
          history.push('/');
          sessionStorage.clear();
        }
        setMsgData(
          {
            message: err?.response?.data.message,
            type: err?.response.status,
          } || null
        );
      });

    // Closing the alert
    setTimeout(() => {
      document.getElementsByClassName("alert")[0]?.classList.remove("show");
    }, 5000);
  }, []);

  const sendCoupon = (email) => {
    email
      ? axios
          .post(`${url}/api/admin/send-coupon-code`, {
            Email: email,
          },{
            headers:{
              "x-access-token":window.sessionStorage.getItem("Token")
            }
          })
          .then((res) => {
            console.log(res);
            setMsgData(
              { message: res.data.message, type: res.data.status } || null
            );
          })
          .catch((err) => {
            console.log(err, err.response);
            if(err?.response.status===401){
              history.push('/');
              sessionStorage.clear();
            }
            setMsgData(
              {
                message: err.response.data.message,
                type: err.response.status,
              } || null
            );
          })
      : console.log("No Email Found!");
  };

  const showMessage = () => {
    return (
      <div
        className={
          msgData.type === "Success"
            ? "alert alert-success fixed-bottom alert-dismissible fade show"
            : "alert alert-danger fixed-bottom alert-dismissible fade show"
        }
        role="alert"
        style={{ zIndex: "9999" }}
      >
        {msgData.message}
        <button
          type="button"
          className="close"
          // data-dismiss="alert"
          // aria-label="Close"
          onClick={() =>
            document
              .getElementsByClassName("alert")[0]
              ?.classList.remove("show")
          }
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  };

  const addCouponHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${url}/api/admin/post-coupon-user`, {
        Email: document.getElementById("school-email").value,
        SchoolName: document.getElementById("school-name").value,
        UserName: document.getElementById("user-name").value,
        SchoolAddress: document.getElementById("school-address").value,
        OfficePhone: document.getElementById("school-phone").value,
      },{
        headers:{
          "x-access-token":window.sessionStorage.getItem("Token")
        }
      })
      .then((res) => {
        setMsgData(
          {
            message: "Coupon has been created successfully",
            type: res.data.status,
          } || null
        );
        document.getElementById("close-modal").click();
        document.getElementById("school-email").value = "";
        document.getElementById("school-name").value = "";
        document.getElementById("user-name").value = "";
        document.getElementById("school-address").value = "";
        document.getElementById("school-phone").value = "";
      })
      .catch((err) => {
        console.log(err);
        setMsgData(
          { message: err.response.data.message, type: err.response.status } ||
            null
        );
      });
  };

  return (
    <>
      <Header
        setcouponsData={(data) => setcouponsData(data || null)}
        setMsgData={(data) => setMsgData(data || null)}
      />
      <div className="mx-4 mt-58">
        {msgData ? showMessage() : null}
        <table className="table table-hover text-left">
          <thead>
            <tr>
              <th scope="col" className="fw-6">
                #
              </th>
              <th scope="col" className="fw-6">
                Creation Date
              </th>
              <th scope="col" className="fw-6">
                School Name
              </th>
              <th scope="col" className="fw-6">
                School Address
              </th>
              <th scope="col" className="fw-6">
                School Phone
              </th>
              <th scope="col" className="fw-6">
                User Name
              </th>
              <th scope="col" className="fw-6">
                Email
              </th>
              <th scope="col" className="fw-6">
                Coupon
              </th>
              <th scope="col" className="fw-6">
                Activation date
              </th>
              <th scope="col" className="fw-6 text-center">
                Send
              </th>
              <th scope="col" className="fw-6 text-center">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {couponsData &&
              couponsData.map((school, key) => {
                const d = new Date(school.createdAt);
                const actived = new Date(school.activatedAt);
                return (
                  <tr key={key}>
                    <th scope="row" className="fw-6">
                      {key + 1}
                    </th>
                    <td>{d.toDateString()}</td>
                    <td className="longLine mw-200">{school.SchoolName}</td>
                    <td
                      className="longLine mw-100 pt-cur"
                      title={school.SchoolAddress}
                    >
                      {school.SchoolAddress ? (
                          <span
                            className="copy-btn"
                            onClick={(event) => {
                              event.preventDefault();
                              navigator.clipboard.writeText(
                                school.SchoolAddress
                              );
                              setMsgData(
                                {
                                  message: "Text copied to the clipboard!",
                                  type: "Success",
                                } || null
                              );
                            }}
                          >
                            <Icon.Copy
                              size="16"
                              className="mr-2 text-primary"
                            />
                            {school.SchoolAddress}
                          </span>
                      ) : (
                        ""
                      )}
                    </td>
                    <td className="longLine mw-100">{school.OfficePhone}</td>
                    <td>{school.UserName}</td>
                    <td className="longLine mw-200"><a href={"mailto:"+school.Email} className="text-muted">{school.Email}</a></td>
                    <td>
                      {school.Coupon ? (
                        school.redeem ? (
                          <span className="text-success">{school.Coupon}</span>
                        ) : (
                          <span className="text-primary">{school.Coupon}</span>
                        )
                      ) : (
                        ""
                      )}
                    </td>
                    <td>{school.activatedAt ? actived.toDateString() : ""}</td>
                    <td>
                      <a
                        href="/"
                        onClick={(e) => {
                          e.preventDefault();
                          if (
                            window.confirm(
                              "Do you really wants to resend the coupon?"
                            )
                          ) {
                            sendCoupon(school.Email);
                          }
                        }}
                        className={
                          school.Coupon
                            ? "c-ptr d-flex align-items-center justify-content-center text-success"
                            : "c-ptr d-flex align-items-center justify-content-center"
                        }
                      >
                        <Icon.Send
                          size="18"
                          strokeWidth="1.5"
                          className="mr-2"
                        />
                        {school.Coupon ? "Resend" : "Send"}
                      </a>
                    </td>
                    <td>
                      {!school.redeem ? (
                        <a
                          href="/"
                          onClick={(e) => {
                            e.preventDefault();
                            if (
                              window.confirm(
                                "Do you really wants to remove this Demo request?"
                              )
                            ) {
                              axios
                                .delete(
                                  `${url}/api/admin/delete-coupon-user/${school.Email}`
                                  ,{
                                    headers:{
                                      "x-access-token":window.sessionStorage.getItem("Token")
                                    }
                                  })
                                .then((res) => {
                                  console.log(res);
                                  setMsgData(
                                    {
                                      message: res.data.message,
                                      type: res.data.status,
                                    } || null
                                  );
                                })
                                .catch((err) => {
                                  console.log(err, err.response);
                                  if(err?.response.status===401){
                                    history.push('/');
                                    sessionStorage.clear();
                                  }
                                  setMsgData(
                                    {
                                      message: err.response.data.message,
                                      type: err.response.status,
                                    } || null
                                  );
                                });
                            }
                          }}
                          className="c-ptr d-flex align-items-center justify-content-center text-danger"
                        >
                          <Icon.Delete
                            size="18"
                            strokeWidth="1.5"
                            className="mr-2"
                          />
                        </a>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div
          className="modal fade"
          id="addModel"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="addCoupon"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content text-left">
              <div className="modal-header">
                <h5 className="modal-title" id="addCoupon">
                  Add a Coupon
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  id="close-modal"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={(e) => addCouponHandler(e)} method="POST">
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="school-name" className="col-form-label">
                      School name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="school-name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="school-address" className="col-form-label">
                      School address:
                    </label>
                    <textarea
                      className="form-control"
                      id="school-address"
                      required
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="school-phone" className="col-form-label">
                      School phone:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="school-phone"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="user-name" className="col-form-label">
                      User name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="user-name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="school-email" className="col-form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="school-email"
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="cancel"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save coupon
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coupons;
