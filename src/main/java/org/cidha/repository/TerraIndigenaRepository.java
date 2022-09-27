package org.cidha.repository;

import java.util.List;
import java.util.Optional;
import org.cidha.domain.TerraIndigena;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TerraIndigena entity.
 */
@Repository
public interface TerraIndigenaRepository
    extends TerraIndigenaRepositoryWithBagRelationships, JpaRepository<TerraIndigena, Long>, JpaSpecificationExecutor<TerraIndigena> {
    default Optional<TerraIndigena> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findById(id));
    }

    default List<TerraIndigena> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAll());
    }

    default Page<TerraIndigena> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAll(pageable));
    }
}
