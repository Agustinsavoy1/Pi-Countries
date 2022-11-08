import React from "react";
import emailjs from "emailjs-com";

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
  };
  return (
    <div>
      Contact
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
  );
};

export default Contact;
