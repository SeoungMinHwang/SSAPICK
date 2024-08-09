package com.ssapick.server.domain.notification.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.SimpleType;
import com.ssapick.server.core.configuration.SecurityConfig;
import com.ssapick.server.core.filter.JWTFilter;
import com.ssapick.server.core.support.RestDocsSupport;
import com.ssapick.server.domain.notification.dto.FCMData;
import com.ssapick.server.domain.notification.dto.NotificationData;
import com.ssapick.server.domain.notification.entity.NotificationType;
import com.ssapick.server.domain.notification.service.NotificationService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;
import java.util.stream.Stream;

import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("알림 컨트롤러 테스트")
@WebMvcTest(value = NotificationController.class,
        excludeFilters = {
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class),
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = JWTFilter.class),
        }
)
class NotificationControllerTest extends RestDocsSupport {
    @MockBean
    private NotificationService notificationService;

    @MockBean
    private ApplicationEventPublisher publisher;

    @Test
    @DisplayName("FCM 토큰 저장 테스트")
    @WithMockUser(username = "test-user")
    void FCM_토큰_저장_테스트() throws Exception {
        // * GIVEN: 이런게 주어졌을 때
        FCMData.Register register = new FCMData.Register();
        register.setToken("new-fcm-token");

        // * WHEN: 이걸 실행하면
        ResultActions perform = this.mockMvc.perform(
                post("/api/v1/notification/register")
                        .header("Content-Type", "application/json")
                        .content(toJson(register))
        );

        // * THEN: 이런 결과가 나와야 한다
        perform.andExpect(status().isOk())
            .andDo(this.restDocs.document(
                resource(
                     ResourceSnippetParameters.builder()
                             .tag("알림")
                             .summary("FCM 토큰 저장 API")
                             .description("FCM 에서 발급 받은 토큰 값을 저장한다.")
                             .requestFields(
                                     fieldWithPath("token").type(SimpleType.STRING).description("FCM 에서 제공받은 토큰")
                             )
                             .responseFields(empty())
                            .build()
                )
        ));
    }

    @Test
    @DisplayName("알림 전체 메시지 조회 테스트")
    @WithMockUser(username = "test-user")
    void 알림_전체_메시지_조회_테스트() throws Exception {
        // * GIVEN: 이런게 주어졌을 때
        List<NotificationData.Search> searches = Stream.of(1, 2, 3, 4, 5).map((num) -> {
            NotificationData.Search search = new NotificationData.Search();
            search.setType(NotificationType.PICK);
            search.setTitle("테스트 타이틀 " + num);
            search.setMessage("테스트 메시지");
            return search;
        }).toList();

        when(notificationService.list(anyLong())).thenReturn(searches);

        // * WHEN: 이걸 실행하면
        ResultActions perform = this.mockMvc.perform(get("/api/v1/notification"));

        // * THEN: 이런 결과가 나와야 한다
        perform.andExpect(status().isOk())
                .andDo(this.restDocs.document(resource(
                    ResourceSnippetParameters.builder()
                            .tag("알림")
                            .summary("받은 알림 목록 조회 API")
                            .description("자신이 지금까지 받은 알람들의 목록을 조회한다.")
                            .responseFields(response(
                                    fieldWithPath("data[].type").type(SimpleType.STRING).description("받은 알림 종류"),
                                    fieldWithPath("data[].title").type(SimpleType.STRING).description("받은 알림의 제목"),
                                    fieldWithPath("data[].message").type(SimpleType.STRING).description("받은 알림의 내용"),
                                    fieldWithPath("data[].read").type(SimpleType.BOOLEAN).description("메시지 읽었는지 여부")
                            ))
                            .build()
                )));

    }
}