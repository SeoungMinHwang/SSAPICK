package com.ssapick.server.domain.auth.service;

import com.ssapick.server.core.constants.AuthConst;
import com.ssapick.server.domain.auth.dto.MattermostData;
import com.ssapick.server.domain.auth.entity.JwtToken;
import com.ssapick.server.domain.auth.repository.AuthCacheRepository;
import com.ssapick.server.domain.user.entity.User;
import feign.FeignException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthService {
    private final JWTService jwtService;
    private final AuthCacheRepository authCacheRepository;
    private final MattermostConfirmService mattermostConfirmService;

    @Transactional
    public void signOut(User user, String refreshToken) {
        if (authCacheRepository.existsByUsername(signOutKey(user.getUsername()))) {
            throw new IllegalArgumentException("이미 로그아웃된 사용자입니다.");
        }

        authCacheRepository.save(signOutKey(user.getUsername()), refreshToken);
    }

    public JwtToken refresh(String refreshToken) {
        try {
            String username = jwtService.getUsername(refreshToken);

            if (authCacheRepository.existsByUsername(signOutKey(username))) {
                throw new IllegalArgumentException("로그아웃된 사용자입니다.");
            }

            return jwtService.refreshToken(refreshToken);
        } catch (Exception e) {
            throw new IllegalArgumentException("리프레시 토큰이 만료되었습니다.");
        }
    }

    @Transactional
    public void authenticate(User user, MattermostData.Request request) {
        MattermostData.Response mattermostResponse = null;
        try {
            System.out.println("mattermostResponse = " + mattermostResponse);
            mattermostConfirmService.authenticate(request);
        } catch (FeignException.NotFound exception) {
            System.out.println("exception = " + exception);
            throw new IllegalArgumentException("사용자 정보가 일치하지 않습니다.");
        }

        user.updateUser(mattermostResponse.getUsername(), mattermostResponse.getEmail());

    }

    private String signOutKey(String username) {
        return AuthConst.SIGN_OUT_CACHE_KEY + username;
    }
}
