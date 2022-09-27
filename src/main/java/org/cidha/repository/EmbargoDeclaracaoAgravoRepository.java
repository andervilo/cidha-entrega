package org.cidha.repository;

import org.cidha.domain.EmbargoDeclaracaoAgravo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the EmbargoDeclaracaoAgravo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmbargoDeclaracaoAgravoRepository
    extends JpaRepository<EmbargoDeclaracaoAgravo, Long>, JpaSpecificationExecutor<EmbargoDeclaracaoAgravo> {}
