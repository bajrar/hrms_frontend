import { MdInfo } from 'react-icons/md';
import './attendanceCount.css';
const AttendaceCount = () => {
  return (
    <div className='attendance-count'>
      <span>Employee Attendance Count</span>
      <div className='attendance-count-container'>
        <div>
          <div className='attedance-container'>
            <p>Attendance</p>
            <div>
              <span>Present (New baneshwor office) (10)</span>
              <span>Present (Old baneshwor office) (10)</span>
              <span>Working From Home (5)</span>
              <span>On Leave (10)</span>
            </div>
          </div>
          <div className='leave-request-container'>
            <div className='on-leave'>
              <p>
                On Leave Today <MdInfo color='#BB2124' />
              </p>
              <span>Total (10)</span>
            </div>
            <div className='on-request'>
              <p>
                Request for Approval <MdInfo color='#F0AD4E' />
              </p>
              <span>Total (10)</span>
            </div>
          </div>
        </div>
        <div>Hi</div>
      </div>
    </div>
  );
};

export default AttendaceCount;
