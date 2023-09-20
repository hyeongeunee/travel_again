package com.acorn.work.jwt.repository;

import com.acorn.work.jwt.entity.UsersEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/*
 *    extends JpaRepository<Entity , id 역활을 하는 칼럼의 data type>
 */
@Repository
public interface UsersRepository extends JpaRepository<UsersEntity, String>{

    UsersEntity findByUserName(String username);
}