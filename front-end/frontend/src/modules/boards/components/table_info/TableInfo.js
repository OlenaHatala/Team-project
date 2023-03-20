import classes from "./TableInfo.module.css";
import { Icon } from 'react-icons-kit'
import {calendar} from 'react-icons-kit/icomoon/calendar'
import {userPlus} from 'react-icons-kit/icomoon/userPlus'
import {priceTag} from 'react-icons-kit/icomoon/priceTag'
import {circleRight} from 'react-icons-kit/icomoon/circleRight'
import IconCounter from '../icon_counter/IconCounter';


const TableInfo = (props) => {
  let requests = null;
  let tickets = null;
  if(props.counters?.requests)
  {
    requests = <IconCounter icon={userPlus} counter={props.counters.requests}/>;
  }

  if(props.counters?.tickets)
  {
    tickets = <IconCounter icon={priceTag} counter={props.counters.tickets}/>;
  }

  return (
    <div className={classes.table}>
      <div className={classes["table-details"]}>
      <span className={classes["calendar-icon"]}><Icon icon={calendar} size={50} style={{ color: '#1C1333' }}/></span>
        <div className={classes["table-title"]}>
          <div className={classes["board-name-block"]}>
              <div className={classes["board-name-info"]}>
                {props.boardName.slice(0, 40)}
              </div>

            { (requests || tickets) ? ( 
                <div className={classes["table-info-block"]}>
                {
                  requests ? requests:null
                }
                {
                  tickets ? tickets:null
                }
                </div>
            ) : null}

          </div>
          <div className={classes["service-info"]}>{props.servName}</div>
          <div className={classes["address-info"]}>{props.address}</div>
          
        </div>
        <span className={classes["circleRight-icon"]}><Icon icon={circleRight} size={36} style={{ color: '#717171' }}/></span>
      </div>
    </div>
  );
};

export default TableInfo;
