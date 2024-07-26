import PointIcon from "icons/PointIcon"
import DeleteIcon from "icons/DeleteIcon"
import FriendBlockIcon from "icons/FriendBlockIcon"


import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"
import BlockModal from "components/modals/BlockModal"
import DeleteModal from "components/modals/DeleteModal"

const PopOver = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>
        <PointIcon/>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-28 mr-5">
        <div className="flex flex-col items-center">
        <div className="flex items-center">
        <FriendBlockIcon width={22} height={22}/>
        <BlockModal title="차단"/>
        </div>
        <div className="flex items-center">
        <DeleteIcon width={22} height={22}/>
        <DeleteModal title="삭제"/>
        </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default PopOver