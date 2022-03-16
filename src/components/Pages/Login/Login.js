import React from "react";
import axios from "axios";
import { useHistory } from "react-router";

import "./Login.css";

const Login = () => {
  const history = useHistory();
  const url = "https://acv-backend-demo.azurewebsites.net";
  const [msgData, setMsgData] = React.useState(null);

  React.useEffect(() => {
    const tkn = window.sessionStorage.getItem("Token");
    const usr = window.sessionStorage.getItem("User");
    if (tkn && usr) {
      history.push("/coupons");
    } else {
      history.push("/");
    }
  }, []);

  const validateInfo = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    axios
      .post(`${url}/api/admin/admin-login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        window.sessionStorage.setItem("User", res?.data.result.email);
        window.sessionStorage.setItem("Token", res?.data.result.token);
        history.push({
          pathname: "/coupons",
          state: { user: res.data.result.email, token: res.data.result.token },
        });
      })
      .catch((err) => {
        console.log(err, err.response);
        setMsgData(
          {
            message: err.response.data.message,
            type: err.response.status,
          } || null
        );
      });
  };
  return (
    <div className="container-fluid p-0 overflow-hidden text-left bg-acv h-100vh">
      {msgData ? (
        <div
          className={
            msgData?.type === "Success"
              ? "alert alert-success fixed-bottom alert-dismissible fade show"
              : "alert alert-danger fixed-bottom alert-dismissible fade show"
          }
          role="alert"
          style={{ zIndex: "9999" }}
        >
          {msgData?.message}
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
      ) : null}
      <section className="">
        <div className="container">
          <div className="row pt-5">
            <div className="col-md-3"></div>
            <div className="col-md-5 col-lg-6 justify-content-center align-items-center text-karla mt-5 pt-5">
              <div className="align-items-center justify-content-center mb-5 text-karla">
                <div className="card">
                  <div className="card-body">
                    <a className="navbar-brand" href="/admin">
                      <img
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Tangible IT"
                        src="data:image/png;base64,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"
                        alt="Tangible IT"
                      />
                    </a>
                    <br />
                    <br />
                    <h1 className="page-title">Hello Admin</h1>
                    <p className="lead">Login to enter in the Dashboard.</p>
                    <div
                      className="text-karla text-danger pb-3"
                      id="messages"
                    ></div>
                    <form id="login-form" onSubmit={(e) => validateInfo(e)}>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <button
                          id="btn-login"
                          type="submit"
                          className="btn btn-primary"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
