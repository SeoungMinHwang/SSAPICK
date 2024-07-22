import LocationAlarmIcon from 'icons/Alarm/LocationAlarmIcon';
import MessageAlarmIcon from 'icons/Alarm/MessageAlarmIcon';
import PickAlarmIcon from 'icons/Alarm/PickAlarmIcon';
import QuestionAlarmIcon from 'icons/Alarm/QuestionAlarmIcon';
import AlarmIcon from 'icons/AlarmIcon';
import BackIcon from 'icons/BackIcon';

const Alarm = () => {
  return (
    <div>
      <div className="flex flex-row items-center m-2">
        <BackIcon />
        <AlarmIcon className="me-2" />
        <h1>알림</h1>
      </div>
      <LocationAlarmIcon width={25} height={25} />
      <MessageAlarmIcon width={25} height={25} />
      <PickAlarmIcon width={25} height={25} />
      <QuestionAlarmIcon width={25} height={25} />
    </div>
  );
};

export default Alarm;
