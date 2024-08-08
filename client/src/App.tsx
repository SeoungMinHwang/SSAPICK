import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CommonRoute from 'components/Routes/CommonRoute';
import ProfileRoute from 'components/Routes/ProfileRoute';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { validState } from 'atoms/ValidAtoms';

import { initializeApp } from 'firebase/app';
import NotFoundPage from 'pages/NotFoundPage';
import { useEffect } from 'react';
import { validCheck } from 'api/validApi';
import {
  accessTokenState,
  isLoginState,
  refreshRequestState,
} from 'atoms/UserAtoms';
import { refresh } from 'api/authApi';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

function App() {
  initializeApp(firebaseConfig);
  const location = useLocation().pathname.split('/')[1];
  const queryClient = new QueryClient();

  const navigate = useNavigate();
  const [ValidState, setValidState] = useRecoilState(validState);
  const [refreshRequest, setRefreshRequest] =
    useRecoilState(refreshRequestState);
  const setAccessToken = useSetRecoilState(accessTokenState);
  const isAuthenticated = useRecoilValue(isLoginState);

  const headerFooter = () => {
    return (
      location !== '' && // 로그인 페이지
      location !== 'splash' && // 스플래시 페이지
      location !== 'mattermost' && // mm 인증 페이지
      location !== '404' && // 404 페이지
      location !== 'infoinsert' // 추가 정보 입력 페이지
    );
  };

  useEffect(() => {
    if (!refreshRequest) {
      refresh()
        .then((response) => {
          setAccessToken(response.accessToken);
          setRefreshRequest(true);
        })
        .catch((error) => {
          console.error(error);
          setRefreshRequest(true);
        });
    }
  }, []);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/home');
  //   }
  // }, [isAuthenticated]);

  // useEffect(() => {
  //   const checkValidity = async () => {
  //     try {
  //       console.log('location', location);
  //       console.log('ValidState', ValidState);
  //       if (location === 'splash') {
  //         return;
  //       }
  //       const data = await validCheck();
  //       setValidState(data);
  //       console.log('data', data);
  //       if (data.lockedUser) {
  //         console.log('유저 잠김');
  //         navigate('/');
  //         return;
  //       }
  //       if (!data.mattermostConfirmed) {
  //         console.log('mm 미확인');
  //         navigate('/mattermost');
  //         return;
  //       }
  //       if (!data.validInfo && !location.includes('infoinsert')) {
  //         navigate('/infoinsert');
  //         return;
  //       }
  //       if (data.validInfo) {
  //         navigate('/home');
  //         return;
  //       }
  //     } catch (error) {
  //       console.error('유효성 검사 실패', error);
  //       navigate('/'); // 유효성 검사 실패 시 로그인 페이지로 리다이렉트
  //     }
  //   };
  //   checkValidity();
  // }, [navigate, setValidState]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {/* <div className="flex flex-col relative">
        <div className="flex flex-col h-screen">
          {headerFooter() && <Header />}
          <div className="flex-grow">
            <Routes>
              <Route path="/*" element={<CommonRoute />} />
              <Route path="/profile/*" element={<ProfileRoute />} />
              <Route path="/404" element={<NotFoundPage />} />
            </Routes>
          </div>
          <div className="flex flex-col h-screen">
            {headerFooter() && <Footer />}
          </div>
        </div>
      </div> */}
      <div className="flex flex-col relative min-h-screen">
        {headerFooter() && <Header />}
        <main className="flex-grow mb-[70px]">
          <Routes>
            <Route path="/*" element={<CommonRoute />} />
            <Route path="/profile/*" element={<ProfileRoute />} />
            <Route path="/404" element={<NotFoundPage />} />
          </Routes>
        </main>
        {headerFooter() && <Footer />}
      </div>
    </QueryClientProvider>
  );
}

export default App;
