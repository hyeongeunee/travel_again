package com.acorn.work.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Table(name = "TB_MEMBER")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class MemberEntity implements UserDetails {

    @Id
    @Column(length = 36)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String memberNo;


    @Column(length = 32, unique = true)
    private String memberId;

    @Column(length = 200)
    private String name;

    @Column(length = 100)
    private String pwd;

    @Column(length = 100)
    private String birth;

    @Column(length = 1)
    private String gender;

    @Column(length = 100, unique = true)
    private String phone;

    @Column(length = 100, unique = true)
    private String email;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("user"));
    }

    @Override
    public String getPassword() {
        return pwd;
    }

    @Override
    public String getUsername() {
        return memberId;
    }

    // 계정 만료된지 확인
    @Override
    public boolean isAccountNonExpired() {
        // 만료인지 확인하는 코드 나중에 짜서 true, false 반환
        return true;
    }

    // 게정 잠금 여부
    @Override
    public boolean isAccountNonLocked() {
        // 잠금 확인 로직
        return true;
    }

    // 패스워드 만료 여부
    @Override
    public boolean isCredentialsNonExpired() {
        // 패스워드 만료 확인 로직
        return true;
    }

    // 계정 사용 가능 여부
    @Override
    public boolean isEnabled() {
        // 계정 사용 가능 로직
        return true;
    }
}
