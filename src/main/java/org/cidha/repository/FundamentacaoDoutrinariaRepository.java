package org.cidha.repository;

import org.cidha.domain.FundamentacaoDoutrinaria;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the FundamentacaoDoutrinaria entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FundamentacaoDoutrinariaRepository
    extends JpaRepository<FundamentacaoDoutrinaria, Long>, JpaSpecificationExecutor<FundamentacaoDoutrinaria> {}
