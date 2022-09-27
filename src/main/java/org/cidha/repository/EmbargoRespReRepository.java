package org.cidha.repository;

import org.cidha.domain.EmbargoRespRe;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the EmbargoRespRe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmbargoRespReRepository extends JpaRepository<EmbargoRespRe, Long>, JpaSpecificationExecutor<EmbargoRespRe> {}
