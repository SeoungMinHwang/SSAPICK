package com.ssapick.server.domain.attendance.entity;

import com.ssapick.server.core.entity.TimeEntity;
import com.ssapick.server.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Attendance extends TimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attendance_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user", nullable = false, foreignKey = @ForeignKey(name = "foreign_key_pick_from_user_id"))
    private User user;

    public static Attendance Create(User user) {
        Attendance attendance = new Attendance();
        attendance.user = user;
        return attendance;
    }
}
