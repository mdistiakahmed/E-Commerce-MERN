import { Button } from "@mui/material";
import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:istinishat@gmail.com">
        <Button>Contact: istinishat@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
