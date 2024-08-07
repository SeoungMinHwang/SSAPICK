import BackIcon from 'icons/BackIcon';
import UserPickIcon from 'icons/UserPickIcon';
import LocationCircle from 'components/LocationPage/LocationCircle';
import LocationCheckModal from 'components/LocationPage/LocationCheckModal';
import LocationWatchModal from 'components/LocationPage/LocationWatchModal';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LocationModal from 'components/modals/LocationModal';
import { useLocation } from 'hooks/useLocation';

const LocationAlarm = () => {
  const nav = useNavigate();
  const [dot, setDot] = useState('');
  const {coords, error} = useLocation()

  // search text
  useEffect(() => {
    const interval = setInterval(() => {
      setDot((prevDots) => (prevDots === '...' ? '' : prevDots + '.'));
    }, 700);

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 정리
  }, []);



  return (
    <div>
      <div
        className="flex flex-row items-center m-2 cursor-pointer"
        onClick={() => nav(-1)}
      >
        <BackIcon />
      </div>
      <div className="relative flex justify-center items-center">
        <div className="relative">
          <LocationCircle />
          <UserPickIcon
            width={70}
            height={70}
            gen="female"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
      <div className="text-center mt-9">
        <span className="luckiest_guy text-[#3D6CE6] text-3xl">
          SEARCHING{dot}
        </span>
      </div>
      <div className="flex flex-col">
        <LocationModal />
        <LocationCheckModal latitude={coords.latitude} longitude={coords.longitude} />
      </div>
    </div>
  );
};

export default LocationAlarm;
