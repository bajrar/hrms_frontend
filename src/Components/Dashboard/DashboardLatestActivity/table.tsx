import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

type DashBoardLatestActivityTableProps = {}

export const DashBoardLatestActivityTable =
  ({}: DashBoardLatestActivityTableProps) => (
    <div className="virtuosway-hr-dashboard-table">
      <div className="virtuosway-hr-dashboard-table-content">
        <tbody>
          <tr>
            <td>
              <span>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="virtuosway-hr-dashboard-interview-title-icon"
                />
              </span>
              Breena Walsh moved Meredith Kennedy into in Person Interview
            </td>
            <td>
                <span>1 week ago</span>
            </td>
          </tr>
        </tbody>
      </div>
    </div>
  );