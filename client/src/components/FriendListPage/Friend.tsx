import PopOver from "components/common/Popover";

interface FriendProps {
  campus: string;
  th: number;
  classNum: number;
  name: string;
}

const Friend = ({ campus, th, classNum, name }: FriendProps) => {
  return <div className="flex flex-col relative">
    <div className="flex items-center ml-5 mr-5 justify-between">
      <img className="w-16 h-16 ml-6" src="../icons/Profile.png" alt="profile" />
      <div className="">{campus}캠퍼스 {th}기 {classNum}반 {name}</div>
      <PopOver />
    </div>
    <div className="bg-white h-px w-90 mx-8 mt-5"></div>
  </div>
}

export default Friend;