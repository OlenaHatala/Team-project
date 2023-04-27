import { Link } from "react-router-dom";

import  classes  from "./HomeIndexPage.module.css";
import BoardImage from '../../pictures/BoardImage.png';
import homepage from '../../pictures/homepage-p.png';
import photo1 from '../../pictures/photo1.jpg';
import photo2 from '../../pictures/photo2.jpg';

export function HomeIndexPage() {
  return (
        <>
        <div className={classes.design}>
          <div className={classes.wave}>
            <div className={classes.content}>
              <h2 className={classes["header-text"]}>Smart queue system</h2>
              <br/>
              <p>
                Loggions is an easy queue system. It serves to reduce walkaways
                and maximize your customer value and engagement. Create a virtual
                queue in only 2 minutes!
              </p>
              <Link to={"/register"} state={{ from: "/" }}>
                <button className={classes["start-button"]}>Get Started Now</button>
              </Link>
            </div>
            <div><img src={homepage} alt="homepage"/></div>
          </div>
        </div>
        <div className={classes["main-info"]}>
          <div className={classes.info}>
            <img className={classes.image2} src={photo2} alt="photo2"/>
            <div className={classes["text-block"]}>
              <h2>Virtual queues attract new customers</h2>
              <br/>
              <p>
                Loggions queue management system
                <ul>
                  <li>replaces traditional queues with virtual ones</li>
                  <li>makes a store without visible queues more attractive to new customers</li>
                </ul>
              </p>
            </div>
          </div>
  
          <div className={classes.info}>
            <div className={classes["text-block"]}>
              <h2>Virtual queues attract new customers</h2>
              <br/>
              <p>
                Loggions online queuing system
                <ul>
                  <li>gives room for additional walk-ins</li>
                  <li>enables new revenue streams and improves an overall sales process</li>
                  <li>aids to maximize the customer value</li>
                </ul>
              </p>
            </div>
            <img className={classes.image2} src={BoardImage} alt="BoardImage"/>
          </div>
  
          <div className={classes.info}>
            <img className={classes.image3} src={photo1} alt="photo1"/>
            <div className={classes["text-block"]}>
              <h2>Virtual queues improve Customer Loyalty and Retention</h2>
              <br/>
              <p>
                Loggions queuing solutions
                <ul>
                  <li><span>minimize the customer’s perceived waiting time</span></li>
                  <li>reduce the number of complaints</li>
                  <li>increase the retention rate</li>
                  <li>lead to a better service quality and higher customer satisfaction ratings</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </>
  );
}
