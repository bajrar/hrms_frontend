// import "./index.css";
import { Tabs, Space } from 'antd';
import { FaLock } from 'react-icons/fa';
import { ApplyjobsSideBox } from '../ApplyjobsSideBox/index';
import Updatejob from './UpdateJobs';

type Props = {};

export const UpdatejobsBody = (props: Props) => {
  return (
    <div className='applyjobsbody-container'>
      {/* <div className="job-header">
        <Space size="large">
          <Tabs size="large" type="card">
            <Tabs.TabPane
              tab="Post"
              key="Post"
              style={{ flex: 1, width: "100%" }}
            ></Tabs.TabPane>
            <Tabs.TabPane
              tab={
                <span>
                  <FaLock />
                  Application
                </span>
              }
              key="Application"
              disabled
            ></Tabs.TabPane>
            <Tabs.TabPane
              tab={
                <span>
                  <FaLock />
                  Workflow
                </span>
              }
              key="Workflow"
              disabled
            ></Tabs.TabPane>
            <Tabs.TabPane
              tab={
                <span>
                  <FaLock />
                  Team
                </span>
              }
              disabled
            ></Tabs.TabPane>
            <Tabs.TabPane
              tab={
                <span>
                  <FaLock />
                  Refer
                </span>
              }
              key="Refer"
              disabled
            ></Tabs.TabPane>
            <Tabs.TabPane
              tab={
                <span>
                  <FaLock />
                  Promote
                </span>
              }
              key="Promote"
              disabled
            ></Tabs.TabPane>
          </Tabs>
        </Space>
      </div> */}
      <div className='about-post'>
        <h3>Create a compiling job post.</h3>
        <p>
          Follow the guide below to create your job. Visit the support for more
          practice.
        </p>
        <hr className='line' />
      </div>
      <div className='job-post'>
        <div className='row'>
          <div className='col-8 d-flex flex-1 flex-column gap-4 container-fluid '>
            <Updatejob />
          </div>
          <div className='col-4 sidebox'>
            <ApplyjobsSideBox />
          </div>
        </div>
      </div>
    </div>
  );
};
