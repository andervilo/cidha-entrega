package org.cidha.repository;

import org.cidha.domain.OpcaoRecurso;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the OpcaoRecurso entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OpcaoRecursoRepository extends JpaRepository<OpcaoRecurso, Long>, JpaSpecificationExecutor<OpcaoRecurso> {}
