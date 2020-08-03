import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core"

const Icons = () => {
  return library.add(faAngleLeft, faAngleRight)
}

export default Icons;