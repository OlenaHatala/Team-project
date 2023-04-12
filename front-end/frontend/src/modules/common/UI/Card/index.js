import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div
      style={ props.style }
      className={`${classes.card} ${
        props.color === "white" ? classes.white : ""
      }`}
    >
      {props.children}
    </div>
  );
};

export default Card;
