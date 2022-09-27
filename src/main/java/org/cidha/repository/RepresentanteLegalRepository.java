package org.cidha.repository;

import java.util.List;
import java.util.Optional;
import org.cidha.domain.RepresentanteLegal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the RepresentanteLegal entity.
 */
@Repository
public interface RepresentanteLegalRepository
    extends JpaRepository<RepresentanteLegal, Long>, JpaSpecificationExecutor<RepresentanteLegal> {
    default Optional<RepresentanteLegal> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<RepresentanteLegal> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<RepresentanteLegal> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct representanteLegal from RepresentanteLegal representanteLegal left join fetch representanteLegal.tipoRepresentante",
        countQuery = "select count(distinct representanteLegal) from RepresentanteLegal representanteLegal"
    )
    Page<RepresentanteLegal> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select distinct representanteLegal from RepresentanteLegal representanteLegal left join fetch representanteLegal.tipoRepresentante"
    )
    List<RepresentanteLegal> findAllWithToOneRelationships();

    @Query(
        "select representanteLegal from RepresentanteLegal representanteLegal left join fetch representanteLegal.tipoRepresentante where representanteLegal.id =:id"
    )
    Optional<RepresentanteLegal> findOneWithToOneRelationships(@Param("id") Long id);
}
