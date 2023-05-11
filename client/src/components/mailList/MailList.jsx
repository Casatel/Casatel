import "./mailList.css"

function MailList() {
  return (
    <div className="mail">
    <h1 className="mailTitle">Book Your Room, Plant a Tree </h1>
      <span className="mailDescript">Sign up for the best deals and to go green </span>
       <div className="mailInput">
        <input type="text" placeholder="Your Email" />
        <button>Subscribe</button>
       </div>
    </div>
  );
}

export default MailList;
