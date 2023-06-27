import { useNavigate } from "react-router-dom";
import "./breadcrumb.css";

interface IBreadCrumb {
  imagesrc: string;
  location: string;
  location1: string;
  location2?: string;
  location3?: string;
  classNames?: string;
  toLocation1?: string;
  toLocation2?: string;
}

const BreadCrumbs = ({
  imagesrc,
  location,
  location1,
  location2,
  location3,
  classNames,
}: IBreadCrumb) => {
  const navigate = useNavigate();
  console.log({ location, location1, location2 });

  return (
    <div
      className={`row m-0 p-0 breadcrumbs d-flex align-items-center ${classNames}`}
    >
      <div className="bread-crumbs-image">
        <img src={imagesrc} alt="add employee" />
      </div>
      <div className='location-container'>
        <span className='location'>{location}</span> &gt;{' '}
        <span className='location' onClick={() => navigate(`/${location1}`)}>
          {location1}
        </span>
        {location2 ? (
          <>
            &gt;{" "}
            <span className="location" onClick={() => navigate("")}>
              {location2}
            </span>{" "}
          </>
        ) : (
          ""
        )}
        {location3 ? (
          <>
            &gt;<span className="location"> {location3}</span>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default BreadCrumbs;
