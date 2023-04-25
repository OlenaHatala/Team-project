import classes from './AddTable.module.css';
import { Icon } from 'react-icons-kit' 
import {plus} from 'react-icons-kit/icomoon/plus'
import { useNavigate } from 'react-router-dom';

function AddTable() {

  const navigate = useNavigate();
  const addTableHandler = () => {
    navigate("/newboard");
  }

  return (
    <div className={classes["table-list-item"]}>
        <div className={classes.table} onClick={addTableHandler}>
            <div className={classes["table-details"]}>
                <p>Add new</p>
            </div>
            <span className={classes["circleRight-icon"]}><Icon icon={plus} size={28} style={{ color: '#717171' }}/></span>
        </div>
    </div>
  );
}

export default AddTable;