package org.cidha.repository;

import org.cidha.domain.TipoRepresentante;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TipoRepresentante entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoRepresentanteRepository extends JpaRepository<TipoRepresentante, Long>, JpaSpecificationExecutor<TipoRepresentante> {}
