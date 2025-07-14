package com.SCCMS.SCCMS.Repository;

import com.SCCMS.SCCMS.Entity.ComplainEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplainRepository extends JpaRepository<ComplainEntity,String> {
}
