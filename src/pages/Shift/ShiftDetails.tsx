import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import EmployeeShiftTable from '../../Components/Shifts/EmployeeShiftTable';
import ShiftDetailsTable from '../../Components/Shifts/ShiftDetailsTables';
import BreadCrumbs from '../../Components/Ui/BreadCrumbs/BreadCrumbs';
import Selects from '../../Components/Ui/Selects/Selects';
import { getSingleShift } from '../../redux/features/singleShiftSlice';
import Layout from '../../Components/Layout';
import Navbar from '../../Components/Ui/Navbar';

const ShiftDetails = () => {
  const { shiftId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (shiftId) {
      dispatch(
        getSingleShift({
          shiftId,
        }) as any
      );
    }
  }, [dispatch]);

  return (
    <Layout>
      <Navbar />
      <div className='padding'>
        <hr />
        <BreadCrumbs
          imagesrc='/images/employee.svg'
          location='Attendance /Shift Management'
          location1='Shift Schedule'
          location2='Shift'
          location3='Assign Shifts'
        />
        <hr />
        <Selects placeHolder='Shift name' />
        <div className='d-flex justify-content-between align-items-end'>
          <ShiftDetailsTable />
        </div>
        <EmployeeShiftTable />
      </div>
    </Layout>
  );
};

export default ShiftDetails;
