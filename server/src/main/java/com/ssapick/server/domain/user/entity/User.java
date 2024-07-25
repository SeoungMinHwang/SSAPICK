package com.ssapick.server.domain.user.entity;

import java.util.ArrayList;
import java.util.List;

import com.ssapick.server.core.entity.BaseEntity;
import com.ssapick.server.domain.pick.entity.Hint;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(
	name = "users",
	uniqueConstraints = {@UniqueConstraint(columnNames = "username")},
	indexes = {
		@Index(name = "index_user_username", columnList = "username")
	}
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class User extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Long id;

	@OneToOne(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Profile profile;

	@Column(nullable = false)
	private String username;

	@Column(nullable = false)
	private char gender;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String email;

	@Column(name = "provider_type", nullable = false)
	@Enumerated(EnumType.STRING)
	private ProviderType providerType;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private RoleType roleType = RoleType.USER;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "followUser")
	private List<Follow> followers = new ArrayList<>();

	@Column(name = "provider_id", nullable = false)
	private String providerId;

	@Column(name = "is_mattermost_confirmed", nullable = false)
	private boolean isMattermostConfirmed = false;

	@Column(name = "is_locked", nullable = false)
	private boolean isLocked = false;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private final List<Hint> hints = new ArrayList<>();

	/**
	 * 사용자 생성 메서드
	 *
	 * @param username     사용자 이름
	 * @param gender
	 * @param providerType 제공자 타입 (GOOGLE, NAVER, KAKAO)
	 * @param providerId   제공자 ID
	 * @return {@link User} 새롭게 생성한 유저 객체
	 */
	public static User createUser(String username, String name, char gender, ProviderType providerType,
		String providerId) {
		User user = new User();
		user.username = username;
		user.name = name;
		user.email = username;
		user.gender = gender;
		user.providerType = providerType;
		user.providerId = providerId;
		return user;
	}

	public void mattermostConfirm() {
		this.isMattermostConfirmed = true;
	}

	@Builder
	private User(Long id, String username, String name, char gender, String email, ProviderType providerType,
		RoleType roleType, String providerId,
		boolean isMattermostConfirmed, boolean isLocked) {
		this.id = id;
		this.username = username;
		this.name = name;
		this.gender = gender;
		this.email = email;
		this.providerType = providerType;
		this.roleType = roleType;
		this.providerId = providerId;
		this.isMattermostConfirmed = isMattermostConfirmed;
		this.isLocked = isLocked;
	}

	public void setTestId(Long id) {
		this.id = id;
	}

	public void updateUser(String username, String name) {
		this.username = username;
		this.name = name;
	}

	public void updateName(String newName) {
		this.name = newName;
	}

	public void updateGender(char newGender) {
		this.gender = newGender;
	}

	public void updateProfile(Profile newProfile) {
		this.profile = newProfile;
	}

	@Override
	public String toString() {
		return "User{" +
			"id=" + id +
			", profile=" + profile +
			", username='" + username + '\'' +
			", gender=" + gender +
			", name='" + name + '\'' +
			", email='" + email + '\'' +
			", providerType=" + providerType +
			'}';
	}
}
