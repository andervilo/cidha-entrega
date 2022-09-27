package org.cidha.repository;

import java.util.List;
import java.util.Optional;
import org.cidha.domain.Processo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Processo entity.
 */
@Repository
public interface ProcessoRepository
    extends ProcessoRepositoryWithBagRelationships, JpaRepository<Processo, Long>, JpaSpecificationExecutor<Processo> {
    default Optional<Processo> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findOneWithToOneRelationships(id));
    }

    default List<Processo> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships());
    }

    default Page<Processo> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships(pageable));
    }

    @Query(
        value = "select distinct processo from Processo processo left join fetch processo.tipoDecisao left join fetch processo.tipoEmpreendimento left join fetch processo.secaoJudiciaria",
        countQuery = "select count(distinct processo) from Processo processo"
    )
    Page<Processo> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select distinct processo from Processo processo left join fetch processo.tipoDecisao left join fetch processo.tipoEmpreendimento left join fetch processo.secaoJudiciaria"
    )
    List<Processo> findAllWithToOneRelationships();

    @Query(
        "select processo from Processo processo left join fetch processo.tipoDecisao left join fetch processo.tipoEmpreendimento left join fetch processo.secaoJudiciaria where processo.id =:id"
    )
    Optional<Processo> findOneWithToOneRelationships(@Param("id") Long id);
}
