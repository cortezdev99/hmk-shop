import { faAngleRight, faAngleLeft, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core"

const Icons = () => {
  return library.add(faAngleLeft, faAngleRight, faPlus, faMinus)
}

export default Icons;