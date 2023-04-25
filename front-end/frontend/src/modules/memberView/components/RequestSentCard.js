import Card from "../../common/UI/Card";

import classes from "./RequestSentCard.module.css";

export const RequestSentCard = () => {
  return (
    <div className={classes["reqsent-container"]}>
      <Card>
        <div className={classes["reqsent-inner"]}>
          <h2>Your request has been sent!</h2>
          <p>
            Your request for joining this board was sent successfully.
            <br />
            Board owner will let you in soon.
          </p>
        </div>
      </Card>
    </div>
  );
};
