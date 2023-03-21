import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store";

export const useSelectUser = () => {
    const user = useSelector(selectCurrentUser);
    return user;
}
