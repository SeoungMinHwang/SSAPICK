import AlarmIcon from 'icons/AlarmIcon';
import BackIcon from 'icons/BackIcon';
import AlarmContent from 'components/AlarmPage/AlarmContent';

import { useNavigate } from 'react-router-dom';

const Alarm = () => {
  const nav = useNavigate();

  return (
    <div>
      <div className="flex flex-row items-center m-2 cursor-pointer" onClick={() => nav(-1)}>
        <BackIcon />
        <AlarmIcon className="me-2" />
        <h1>알림</h1>
      </div>
      <div className="m-6">
        <AlarmContent
          category="location"
          content="XXX님이 반경 Xm 안으로 들어왔습니다."
          read
        />
      </div>
    </div>
  );
};

export default Alarm;
