// import { KAKAO_AUTH_URL } from "api/clientApi";

import { KAKAO_AUTH_URL } from "api/clientApi";
import { Link } from "react-router-dom";

const KakaoButton = () => {

  return (
      <Link
        to={KAKAO_AUTH_URL}
        type="button"
        className="flex my-2 items-center justify-center backGround-kakao w-72 h-14 rounded-lg">
        <img className="w-8 h-8 mr-4" src="icons/Kakao.png" alt="카카오로 시작하기" />
        카카오로 시작하기
      </Link>
  );
};

export default KakaoButton;
