package org.cidha.repository;

import org.cidha.domain.TipoRecurso;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TipoRecurso entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoRecursoRepository extends JpaRepository<TipoRecurso, Long>, JpaSpecificationExecutor<TipoRecurso> {}
