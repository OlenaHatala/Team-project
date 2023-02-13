import ServiceInfo from "./ServiceInfo";

import useNewBoardContext from "../../hooks/useNewBoardContext";

import Card from "../UI/Card";
import Settings from "./Settings";
import Schedule from "./Schedule";

const NewBoardForm = () => {
  const { page } = useNewBoardContext();

  const display = {
    "details": <ServiceInfo />,
    "settings": <Settings />,
    "schedule": <Schedule />,
  };

  const content = (
    <div className="account-details">
      <Card>{display[page]}</Card>
    </div>
  );

  return content;
};
export default NewBoardForm;
