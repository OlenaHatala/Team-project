import classes from "./PageContent.module.css";

function PageContent({ title, children }) {
  return (
    <div className={classes.content}>
      {title ? <h1>{title}</h1> : null}
      {children}
    </div>
  );
}

export default PageContent;
