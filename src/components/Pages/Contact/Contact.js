import React from "react";
import axios from "axios";
import * as Icon from "react-feather";
import Header from "../../Header/Header";

import "./Contact.css";

const Contact = () => {
  const url = "https://acv-backend-demo.azurewebsites.net";
  const [contactData] = React.useState([
    {
      name: "Priyank Dhameliya",
      email: "pd@devtim.tech",
      message:
        "Hello There, Hope you are doing great. I am little confused about corporate plans for my organization, can you help me with the same? Thank you.",
    },
    {
      name: "Tushar Beladiya",
      email: "tb@devtim.tech",
      message: `Hello There,
        I hope you are doing great.
        
        How are you by the way?`,
    },
    {
      name: "Abhay Kanani",
      email: "abhay.kanani@devtim.tech",
      message:
        "Hi There, I would like to dicuss a great idea with you guys. let me know the suitable time to connect.",
    },
  ]);
  const [msgData, setMsgData] = React.useState(null);

  React.useEffect(() => {
    document.getElementsByClassName("alert")[0]?.classList.add("show");
    // axios
    //   .get(`${url}/api/admin/get-contact-data`)
    //   .then((res) => {
    //     console.log(res);
    //     setContactData(res.data.result || null);
    //   })
    //   .catch((err) => {
    //     console.log(err, err.response);
    //     setMsgData(
    //       {
    //         message: err?.response?.data.message,
    //         type: err?.response.status,
    //       } || null
    //     );
    //   });

    // Closing the alert
    setTimeout(() => {
      document.getElementsByClassName("alert")[0]?.classList.remove("show");
    }, 3000);
  }, [msgData]);

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

  return (
    <>
      <Header />
      <div className="mx-4 mt-58">
        {msgData ? showMessage() : null}
        <table className="table table-hover text-left">
          <thead>
            <tr>
              <th scope="col" className="fw-6">
                #
              </th>
              <th scope="col" className="fw-6">
                Name
              </th>
              <th scope="col" className="fw-6">
                Email
              </th>
              <th scope="col" className="fw-6">
                Message
              </th>
              <th scope="col" className="fw-6">
                Reply
              </th>
              <th scope="col" className="fw-6 text-center">
                Send
              </th>
            </tr>
          </thead>
          <tbody>
            {contactData &&
              contactData.map((info, key) => {
                return (
                  <tr key={key}>
                    <th scope="row" className="fw-6">
                      {key + 1}
                    </th>
                    <td>{info.name}</td>
                    <td className="longLine mw-200">
                      <a href={"mailto:" + info.email} className="text-muted">
                        {info.email}
                      </a>
                    </td>
                    <td className="mw-400">{info.message}</td>
                    <td className="longLine mw-450">
                      <textarea
                        name="replyMsg"
                        id={"input-reply" + (key + 1)}
                        class="form-control"
                        rows="2"
                        placeholder="Reply to customer..."
                      ></textarea>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (
                            window.confirm(
                              "Do you really wants to sends the reply to customer?"
                            )
                          ) {
                            axios
                              .post(
                                `${url}/api/admin/send-reply-user/${info.email}`,
                                {
                                  message: document.getElementById(
                                    "input-reply" + (key + 1)
                                  ).value,
                                }
                              )
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
                                setMsgData(
                                  {
                                    message: err.response.data.message,
                                    type: err.response.status,
                                  } || null
                                );
                              });
                          }
                        }}
                        type="button"
                        class="btn btn-link c-ptr d-flex align-items-center justify-content-center"
                      >
                        <Icon.Send
                          size="22"
                          strokeWidth="1.5"
                          className="pt-1 pr-1"
                        />{" "}
                        Send
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Contact;
