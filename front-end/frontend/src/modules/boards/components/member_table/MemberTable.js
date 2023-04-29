import classes from "./MemberTable.module.css";
import { Icon } from 'react-icons-kit'
import {calendar} from 'react-icons-kit/icomoon/calendar'
import {priceTags} from 'react-icons-kit/icomoon/priceTags'
import {circleRight} from 'react-icons-kit/icomoon/circleRight'
import IconCounter from '../icon_counter/IconCounter';

const MemberTable = (props) => {
  return (
    <div className={classes.table}>
      <div className={classes["table-details"]}>
      <span className={classes["calendar-icon"]}><Icon icon={calendar} size={50} style={{ color: '#1C1333' }}/></span>
        <div className={classes["table-title"]}>
          {props.boardName.slice(0, 40)}
          <div className={classes["table-info-block"]}>
        </div>
        </div>
        <span className={classes["circleRight-icon"]}><Icon icon={circleRight} size={36} style={{ color: '#717171' }}/></span>
      </div>
    </div>
  );
};

export default MemberTable;
