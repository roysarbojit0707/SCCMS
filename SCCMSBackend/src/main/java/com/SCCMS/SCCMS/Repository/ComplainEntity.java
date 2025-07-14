package com.SCCMS.SCCMS.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplainEntity extends JpaRepository<ComplainEntity,String> {
}
