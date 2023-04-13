// import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css'

type Props = {};

export const ApplyjobsNavbar = (props: Props) => {
  return (
    <>
    <div className="jobs-navbar" >
      <div className="container left">
        <h1>NEW JOBS</h1>
      </div>
      <div className="right">
        <button>Cancel</button>
      </div>
      
    </div>
 </>
  );
};
