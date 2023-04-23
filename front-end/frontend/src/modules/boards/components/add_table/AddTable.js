import classes from './AddTable.module.css';
import { Icon } from 'react-icons-kit' 
import {plus} from 'react-icons-kit/icomoon/plus'

function AddTable(props) {

  return (
    <div className={classes["table-list-item"]}>
        <div className={classes.table}>
            <div className={classes["table-details"]}>
                <p>Add new</p>
            </div>
            <span className={classes["circleRight-icon"]}><Icon icon={plus} size={28} style={{ color: '#717171' }}/></span>
        </div>
    </div>
  );
}

export default AddTable;