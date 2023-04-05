import { useParams } from "react-router-dom";
import { DashboardIndex } from "../modules/dashboard";

export const DashboardPage = () => {
  let { boardId } = useParams();

  return <DashboardIndex id={ boardId } />;
};
