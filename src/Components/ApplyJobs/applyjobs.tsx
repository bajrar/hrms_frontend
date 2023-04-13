import { ApplyjobsNavbar } from "./ApplyjobsNavbar/navbar";
import { ApplyjobsBody } from "./ApplyjobsBody/index";
import "./applyjobs.css";
// import { Header } from "../Header/header";

type Props = {};

export const Applyjobs = (props: Props) => {
  return (
    <>
      <div className="applyjobs">
        {/* <Header /> */}
        <ApplyjobsNavbar />
        <ApplyjobsBody />
      </div>
    </>
  );
};
