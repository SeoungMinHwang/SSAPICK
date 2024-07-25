import Attendance from 'pages/Attendance';
import Block from 'pages/Block';
import LocationAlarm from 'pages/LocationAlarm';
import ModiUserAddInfo from 'pages/ModiUserAddInfo';
import ModiUserInfo from 'pages/ModiUserInfo';
import QuestionList from 'pages/QuestionList';
import SetAccount from 'pages/SetAccount';
import SetAlarm from 'pages/SetAlarm';
import FriendList from 'pages/FriendList';
import FriendSearch from 'components/FriendListPage/FriendSeartch';
import { Route, Routes } from 'react-router-dom';

const ProfileRoute = () => {
  return(
    <Routes>
      <Route path="/modiuserinfo" element={<ModiUserInfo />} />
              <Route path="/modiuseraddinfo" element={<ModiUserAddInfo />} />
              <Route path="/setalarm" element={<SetAlarm />} />
              <Route path="/friendlist" element={<FriendList />} />
              <Route path="/block" element={<Block />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/locationalarm" element={<LocationAlarm />} />
              <Route path="/questionlist" element={<QuestionList />} />
              <Route path="/setaccount" element={<SetAccount />} />
              <Route path="/friendsearch" element={<FriendSearch />} />
    </Routes>

  )
}
export default ProfileRoute;