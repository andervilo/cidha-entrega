package org.cidha.repository;

import java.util.List;
import java.util.Optional;
import org.cidha.domain.Recurso;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Recurso entity.
 */
@Repository
public interface RecursoRepository extends JpaRepository<Recurso, Long>, JpaSpecificationExecutor<Recurso> {
    default Optional<Recurso> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Recurso> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Recurso> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct recurso from Recurso recurso left join fetch recurso.tipoRecurso left join fetch recurso.opcaoRecurso left join fetch recurso.processo",
        countQuery = "select count(distinct recurso) from Recurso recurso"
    )
    Page<Recurso> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select distinct recurso from Recurso recurso left join fetch recurso.tipoRecurso left join fetch recurso.opcaoRecurso left join fetch recurso.processo"
    )
    List<Recurso> findAllWithToOneRelationships();

    @Query(
        "select recurso from Recurso recurso left join fetch recurso.tipoRecurso left join fetch recurso.opcaoRecurso left join fetch recurso.processo where recurso.id =:id"
    )
    Optional<Recurso> findOneWithToOneRelationships(@Param("id") Long id);
}
