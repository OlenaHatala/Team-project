import Card from "../../common/UI/Card";

import classes from "./RequestSentCard.module.css";

export const RequestSentCard = () => {
  return (
    <div className={classes["reqsent-container"]}>
      <Card>
        <div className={classes["reqsent-inner"]}>
          <h2>Request sent!</h2>
          <p>
            Your request for joining to this board was sent successfully.
            <br />
            Board owner will let you in soon.
          </p>
        </div>
      </Card>
    </div>
  );
};
