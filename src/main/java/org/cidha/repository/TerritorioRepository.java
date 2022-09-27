package org.cidha.repository;

import org.cidha.domain.Territorio;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Territorio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TerritorioRepository extends JpaRepository<Territorio, Long>, JpaSpecificationExecutor<Territorio> {}
