package org.cidha.repository;

import org.cidha.domain.TipoData;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TipoData entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoDataRepository extends JpaRepository<TipoData, Long>, JpaSpecificationExecutor<TipoData> {}
