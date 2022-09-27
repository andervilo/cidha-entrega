package org.cidha.repository;

import org.cidha.domain.Quilombo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Quilombo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuilomboRepository extends JpaRepository<Quilombo, Long>, JpaSpecificationExecutor<Quilombo> {}
