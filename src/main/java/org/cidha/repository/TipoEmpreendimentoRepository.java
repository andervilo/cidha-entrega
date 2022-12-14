package org.cidha.repository;

import org.cidha.domain.TipoEmpreendimento;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TipoEmpreendimento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoEmpreendimentoRepository
    extends JpaRepository<TipoEmpreendimento, Long>, JpaSpecificationExecutor<TipoEmpreendimento> {}
