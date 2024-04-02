import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";
const Finsmart2024 = () => {
    
return (
  <div className="finSmart">
    <form className="start">
      <Link to="/auth">
        <button className="btn">LOGIN</button>
      </Link>
      <Link to="/auth">
        <button className="btn">SIGNUP</button>
      </Link>
    </form>
  </div>
);

}
export default Finsmart2024;