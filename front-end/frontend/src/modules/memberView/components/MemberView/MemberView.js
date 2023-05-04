import { useSelector } from "react-redux";

import { Card } from "../../../common/UI";
import { BoardHeader } from "../../../common/components";

import { BoardWeekIndex, BoardWeekSlider } from "../../../boardWeek";
import { selectWeekIndex } from "../../../boardWeek/store/weekSlice";

import classes from "./MemberView.module.css";

export const MemberView = ({ board, id }) => {
  const { index: weekIndex } = useSelector(selectWeekIndex);
  return (
    <div className={classes["member-view-container"]}>
      <Card color="white" style={{ padding: "5px 30px", marginBottom: "0" }}>
        <BoardHeader
          label={board.label}
          servname={board.service_name}
          description={board.description}
          address={board.address}
        />
      </Card>
      <Card
        color="white"
        style={{ padding: "20px",  height: "100%" }}
      >
        <div className={classes["topbar-buttons"]}>
          <div className={classes["slider-container"]}>
            <BoardWeekSlider />
          </div>
        </div>
        <div className={classes["week-container"]}>
          <BoardWeekIndex mode="member" id={id} weekIndex={weekIndex} />
        </div>
      </Card>
    </div>
  );
};
