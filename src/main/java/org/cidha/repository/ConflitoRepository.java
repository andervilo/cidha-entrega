package org.cidha.repository;

import org.cidha.domain.Conflito;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Conflito entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConflitoRepository extends JpaRepository<Conflito, Long>, JpaSpecificationExecutor<Conflito> {}
