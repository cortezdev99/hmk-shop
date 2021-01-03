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
  faBars,
  faChevronDown,
  faCheck,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as farFaCircle, faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
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
    faTwitter,
    faChevronDown,
    faCheck,
    faInfoCircle,
    faSquare,
    faCheckSquare
  );
};

export default Icons;
