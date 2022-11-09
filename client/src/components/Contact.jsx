import React from "react";
import emailjs from "emailjs-com";
import "./Contact.css";

const Contact = () => {
  //const { YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_PUBLIC_KEY } = process.env;

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_sb76ywg",
        "template_0l7p8bm",
        e.target,
        "user_5hA9JKUjBoFTxoijU4HlY"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };
  return (
    <div className="contact-content">
      <h2>If you enjoyed my individual proyect send me a message!</h2>
      <div className="form-container">
        <form onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name="name" />
          <label>Email</label>
          <input type="email" name="email" />
          <label>Message</label>
          <textarea name="message" />
          <input type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
};

export default Contact;
