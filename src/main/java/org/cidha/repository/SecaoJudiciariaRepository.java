package org.cidha.repository;

import java.util.List;
import java.util.Optional;
import org.cidha.domain.SecaoJudiciaria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the SecaoJudiciaria entity.
 */
@Repository
public interface SecaoJudiciariaRepository extends JpaRepository<SecaoJudiciaria, Long> {
    default Optional<SecaoJudiciaria> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<SecaoJudiciaria> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<SecaoJudiciaria> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct secaoJudiciaria from SecaoJudiciaria secaoJudiciaria left join fetch secaoJudiciaria.subsecaoJudiciaria",
        countQuery = "select count(distinct secaoJudiciaria) from SecaoJudiciaria secaoJudiciaria"
    )
    Page<SecaoJudiciaria> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct secaoJudiciaria from SecaoJudiciaria secaoJudiciaria left join fetch secaoJudiciaria.subsecaoJudiciaria")
    List<SecaoJudiciaria> findAllWithToOneRelationships();

    @Query(
        "select secaoJudiciaria from SecaoJudiciaria secaoJudiciaria left join fetch secaoJudiciaria.subsecaoJudiciaria where secaoJudiciaria.id =:id"
    )
    Optional<SecaoJudiciaria> findOneWithToOneRelationships(@Param("id") Long id);
}
