import classes from './Footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as FooterLogo } from '../../../../assets/footerlogo.svg';
import { faFacebook, faInstagram, faTelegram, faTwitter} from '@fortawesome/free-brands-svg-icons';

function Footer({marginTop = 0}) {
  return (
    <footer className={classes.footer} style={{marginTop: `${marginTop}px`}}>
        <div className={classes["social-links"]}>
                 
          <div style={{marginLeft:'7px'}}>

          <FooterLogo height='70px' width='auto'/>
          </div>
            <p className={classes["top-text"]}>Be a part of Loggions Community</p>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className={classes["facebook-icon"]} icon={faFacebook} />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className={classes["instagram-icon"]} icon={faInstagram} />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className={classes["twitter-icon"]} icon={faTwitter} />
            </a>
            <a href="https://web.telegram.org/k/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className={classes["telegram-icon"]} icon={faTelegram} />
            </a>
            <p className={classes["bottom-text"]}>Powered by G&A</p>
        </div>
	  </footer>

  );
}

export default Footer;
