package org.cidha.repository;

import java.util.List;
import java.util.Optional;
import org.cidha.domain.ParteInteresssada;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ParteInteresssada entity.
 */
@Repository
public interface ParteInteresssadaRepository
    extends
        ParteInteresssadaRepositoryWithBagRelationships,
        JpaRepository<ParteInteresssada, Long>,
        JpaSpecificationExecutor<ParteInteresssada> {
    default Optional<ParteInteresssada> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findById(id));
    }

    default List<ParteInteresssada> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAll());
    }

    default Page<ParteInteresssada> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAll(pageable));
    }
}
