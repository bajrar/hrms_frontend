import { ApplyjobsNavbar } from "../ApplyjobsNavbar/navbar";
import "../applyjobs.css";
// import { Header } from "../../Header/header";
import { UpdatejobsBody } from "../UpdateJob/updatejobbody";

type Props = {};

export const UpdateJobMain = (props: Props) => {
  return (
    <>
      <div className="applyjobs">
        {/* <Header /> */}
        <ApplyjobsNavbar />
        <UpdatejobsBody />
      </div>
    </>
  );
};
