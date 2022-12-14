package org.cidha.repository;

import org.cidha.domain.EmbargoDeclaracao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the EmbargoDeclaracao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmbargoDeclaracaoRepository extends JpaRepository<EmbargoDeclaracao, Long>, JpaSpecificationExecutor<EmbargoDeclaracao> {}
