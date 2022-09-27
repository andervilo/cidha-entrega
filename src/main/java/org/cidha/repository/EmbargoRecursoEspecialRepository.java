package org.cidha.repository;

import org.cidha.domain.EmbargoRecursoEspecial;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the EmbargoRecursoEspecial entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmbargoRecursoEspecialRepository
    extends JpaRepository<EmbargoRecursoEspecial, Long>, JpaSpecificationExecutor<EmbargoRecursoEspecial> {}
