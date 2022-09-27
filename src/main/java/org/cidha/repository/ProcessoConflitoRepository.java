package org.cidha.repository;

import java.util.List;
import java.util.Optional;
import org.cidha.domain.ProcessoConflito;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ProcessoConflito entity.
 */
@Repository
public interface ProcessoConflitoRepository
    extends
        ProcessoConflitoRepositoryWithBagRelationships, JpaRepository<ProcessoConflito, Long>, JpaSpecificationExecutor<ProcessoConflito> {
    default Optional<ProcessoConflito> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findById(id));
    }

    default List<ProcessoConflito> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAll());
    }

    default Page<ProcessoConflito> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAll(pageable));
    }
}
