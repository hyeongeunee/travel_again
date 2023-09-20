package com.acorn.work.repository;

import com.acorn.work.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, String > {


    MemberEntity findByMemberId(String memberId);

    MemberEntity findByMemberIdAndPwd(String memberId, String pwd);

    Boolean existsByMemberId(String memberId);
}