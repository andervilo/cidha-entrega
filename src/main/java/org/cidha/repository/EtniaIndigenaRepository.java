package org.cidha.repository;

import org.cidha.domain.EtniaIndigena;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the EtniaIndigena entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtniaIndigenaRepository extends JpaRepository<EtniaIndigena, Long>, JpaSpecificationExecutor<EtniaIndigena> {}
