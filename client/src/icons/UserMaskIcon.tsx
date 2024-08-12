import { useMutation } from '@tanstack/react-query';
import { patchPickAlarm } from 'api/pickApi';
import { useEffect, useState } from 'react';

interface UserMaskIconProps {
  pickId: number;
  alarm: boolean;
  gen: string;
  onAlarmUpdate: (pickId: number) => void;
}

const UserMaskIcon = ({
  pickId,
  alarm,
  gen,
  onAlarmUpdate,
}: UserMaskIconProps) => {
  const [stroke, setStroke] = useState<string>('white');
  const [fill, setFill] = useState<string>('none');

  useEffect(() => {
    setStroke(alarm ? 'white' : gen === 'M' ? '#7EAFFF' : '#FF9798');
    setFill(alarm ? (gen === 'M' ? '#7EAFFF' : '#FF9798') : 'none');
  }, [alarm, gen]);

  const patchPickPutation = useMutation({
    mutationFn: patchPickAlarm,
    onSuccess: () => {
      onAlarmUpdate(pickId);
    },
    onError: (error) => {
      console.error('patch error', error);
    },
  });

  const handleClick = async () => {
    try {
      patchPickPutation.mutate(pickId);
      console.log('픽 ID의 알람이 업데이트되었습니다:', pickId);
    } catch (error) {
      console.error('픽 ID의 알람을 업데이트하지 못했습니다:', pickId, error);
    }
  };

  return (
    <div onClick={handleClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.99502 1.08298C2.769 1.00451 2.52749 0.981237 2.29065 1.01511C2.0538 1.04898 1.8285 1.13902 1.63354 1.2777C1.43858 1.41639 1.27962 1.59969 1.16994 1.81232C1.06025 2.02495 1.00302 2.26073 1.00302 2.49998V11.143C0.963749 12.8316 1.30841 14.507 2.01102 16.043C3.64802 19.402 6.82802 21.843 10.976 23.405C11.3161 23.5327 11.691 23.5327 12.031 23.405C16.179 21.847 19.358 19.405 20.995 16.043C21.6976 14.507 22.0423 12.8316 22.003 11.143V2.49998C22.003 2.26073 21.9458 2.02495 21.8361 1.81232C21.7264 1.59969 21.5675 1.41639 21.3725 1.2777C21.1775 1.13902 20.9522 1.04898 20.7154 1.01511C20.4785 0.981237 20.237 1.00451 20.011 1.08298C14.5101 3.05297 8.49596 3.05297 2.99502 1.08298Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.99502 1.08298C2.769 1.00451 2.52749 0.981237 2.29065 1.01511C2.0538 1.04898 1.8285 1.13902 1.63354 1.2777C1.43858 1.41639 1.27962 1.59969 1.16994 1.81232C1.06025 2.02495 1.00302 2.26073 1.00302 2.49998V11.143C0.963749 12.8316 1.30841 14.507 2.01102 16.043C3.64802 19.402 6.82802 21.843 10.976 23.405C11.3161 23.5327 11.691 23.5327 12.031 23.405C16.179 21.847 19.358 19.405 20.995 16.043C21.6976 14.507 22.0423 12.8316 22.003 11.143V2.49998C22.003 2.26073 21.9458 2.02495 21.8361 1.81232C21.7264 1.59969 21.5675 1.41639 21.3725 1.2777C21.1775 1.13902 20.9522 1.04898 20.7154 1.01511C20.4785 0.981237 20.237 1.00451 20.011 1.08298C14.5101 3.05297 8.49596 3.05297 2.99502 1.08298Z"
          fill={fill}
          stroke={gen === 'M' ? '#7EAFFF' : '#FF9798'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.00293 13.375C7.05485 14.518 7.55755 15.5938 8.40096 16.3669C9.24438 17.14 10.3598 17.5475 11.5029 17.5C12.6461 17.5475 13.7615 17.14 14.6049 16.3669C15.4483 15.5938 15.951 14.518 16.0029 13.375"
          fill={fill}
        />
        <path
          d="M7.00293 13.375C7.05485 14.518 7.55755 15.5938 8.40096 16.3669C9.24438 17.14 10.3598 17.5475 11.5029 17.5C12.6461 17.5475 13.7615 17.14 14.6049 16.3669C15.4483 15.5938 15.951 14.518 16.0029 13.375"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.50293 8.875C8.50293 8.37772 8.30539 7.90081 7.95376 7.54917C7.60212 7.19754 7.12521 7 6.62793 7C6.13065 7 5.65374 7.19754 5.3021 7.54917C4.95047 7.90081 4.75293 8.37772 4.75293 8.875"
          fill={fill}
        />
        <path
          d="M8.50293 8.875C8.50293 8.37772 8.30539 7.90081 7.95376 7.54917C7.60212 7.19754 7.12521 7 6.62793 7C6.13065 7 5.65374 7.19754 5.3021 7.54917C4.95047 7.90081 4.75293 8.37772 4.75293 8.875"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.2529 8.875C18.2529 8.37772 18.0554 7.90081 17.7038 7.54917C17.3521 7.19754 16.8752 7 16.3779 7C15.8806 7 15.4037 7.19754 15.0521 7.54917C14.7005 7.90081 14.5029 8.37772 14.5029 8.875"
          fill={fill}
        />
        <path
          d="M18.2529 8.875C18.2529 8.37772 18.0554 7.90081 17.7038 7.54917C17.3521 7.19754 16.8752 7 16.3779 7C15.8806 7 15.4037 7.19754 15.0521 7.54917C14.7005 7.90081 14.5029 8.37772 14.5029 8.875"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default UserMaskIcon;
