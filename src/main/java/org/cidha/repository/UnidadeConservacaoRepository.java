package org.cidha.repository;

import org.cidha.domain.UnidadeConservacao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the UnidadeConservacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UnidadeConservacaoRepository
    extends JpaRepository<UnidadeConservacao, Long>, JpaSpecificationExecutor<UnidadeConservacao> {}
