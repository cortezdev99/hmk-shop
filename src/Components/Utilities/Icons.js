import { faAngleRight, faAngleLeft, faPlus, faMinus, faTimes, faArrowLeft, faCircle, faRobot, faExclamationTriangle, faDizzy, faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import { faCircle as farFaCircle } from '@fortawesome/free-regular-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core"

const Icons = () => {
  return library.add(faAngleLeft, faAngleRight, faPlus, faMinus, faTimes, faArrowLeft, faCircle, farFaCircle, faRobot, faExclamationTriangle, faDizzy, faCircleNotch)
}

export default Icons;