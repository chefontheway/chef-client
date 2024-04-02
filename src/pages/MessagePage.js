// import { EmailJSResponseStatus } from "@emailjs/browser";
import emailjs from "@emailjs/browser";
import { useState } from "react";


function MessagePage() {

  const [emailFrom, setEmailFrom] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

   const sendEmail = (e)=> {
    e.preventDefault();

    emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, 'template_bgtwqlw', e.target, 'UCLzWQygxDq8UnHZr')
      .then(() => {
        setEmailFrom("");
        setMessage("");
        setSent("");
      })
      .catch(err => console.log("failed send message"));
   }

  return(
    <div className="contact-contianer">
        <h3>Hi, Friends, Do not hesitate to send us a message regarding this website </h3>
        <p>You can give us some suggestions, complaints, compliments, or 
            anything else that comes to mind for the goodness of this platform
        </p>
        <form className="contact_form" onSubmit={sendEmail}>
          <label htmlFor="emailFrom">Your Email:</label>
          <input 
            type="text"
            name="email_from"
            id="emailForm"
            className="email__from"
            value={emailFrom}
            onChange={e => {setEmailFrom(e.target.value)}}
          />

          <label htmlFor="message">Message:</label>
          <textarea 
            name="message"
            id="message"
            className="message__box"
            value={message}
            onChange={e => {setMessage(e.target.value)}}
          />

          <button 
            type="submit"
            variant="contained"

          >Send</button>
        </form>
    </div>
  )
}

export default MessagePage;