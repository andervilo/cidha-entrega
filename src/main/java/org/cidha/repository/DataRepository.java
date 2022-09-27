package org.cidha.repository;

import java.util.List;
import java.util.Optional;
import org.cidha.domain.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Data entity.
 */
@Repository
public interface DataRepository extends JpaRepository<Data, Long>, JpaSpecificationExecutor<Data> {
    default Optional<Data> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Data> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Data> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct data from Data data left join fetch data.tipoData left join fetch data.processo",
        countQuery = "select count(distinct data) from Data data"
    )
    Page<Data> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct data from Data data left join fetch data.tipoData left join fetch data.processo")
    List<Data> findAllWithToOneRelationships();

    @Query("select data from Data data left join fetch data.tipoData left join fetch data.processo where data.id =:id")
    Optional<Data> findOneWithToOneRelationships(@Param("id") Long id);
}
