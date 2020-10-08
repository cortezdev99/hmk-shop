import {
  faAngleRight,
  faAngleLeft,
  faPlus,
  faMinus,
  faTimes,
  faArrowLeft,
  faCircle,
  faRobot,
  faExclamationTriangle,
  faDizzy,
  faCircleNotch,
  faShoppingCart,
  faBars
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as farFaCircle } from "@fortawesome/free-regular-svg-icons";
import { faInstagram, faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons' 
import { library } from "@fortawesome/fontawesome-svg-core";

const Icons = () => {
  return library.add(
    faAngleLeft,
    faAngleRight,
    faPlus,
    faMinus,
    faTimes,
    faArrowLeft,
    faCircle,
    farFaCircle,
    faRobot,
    faExclamationTriangle,
    faDizzy,
    faCircleNotch,
    faShoppingCart,
    faBars,
    faInstagram,
    faFacebookF,
    faTwitter
  );
};

export default Icons;
