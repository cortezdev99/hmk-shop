import { faAngleRight, faAngleLeft, faPlus, faMinus, faTimes, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core"

const Icons = () => {
  return library.add(faAngleLeft, faAngleRight, faPlus, faMinus, faTimes, faArrowLeft)
}

export default Icons;