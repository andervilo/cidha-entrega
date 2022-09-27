package org.cidha.repository;

import java.util.List;
import java.util.Optional;
import org.cidha.domain.ProblemaJuridico;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ProblemaJuridico entity.
 */
@Repository
public interface ProblemaJuridicoRepository
    extends
        ProblemaJuridicoRepositoryWithBagRelationships, JpaRepository<ProblemaJuridico, Long>, JpaSpecificationExecutor<ProblemaJuridico> {
    default Optional<ProblemaJuridico> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findById(id));
    }

    default List<ProblemaJuridico> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAll());
    }

    default Page<ProblemaJuridico> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAll(pageable));
    }
}
