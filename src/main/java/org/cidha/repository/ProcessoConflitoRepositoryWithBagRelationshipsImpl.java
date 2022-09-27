package org.cidha.repository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.cidha.domain.ProcessoConflito;
import org.hibernate.annotations.QueryHints;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class ProcessoConflitoRepositoryWithBagRelationshipsImpl implements ProcessoConflitoRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<ProcessoConflito> fetchBagRelationships(Optional<ProcessoConflito> processoConflito) {
        return processoConflito.map(this::fetchDireitos);
    }

    @Override
    public Page<ProcessoConflito> fetchBagRelationships(Page<ProcessoConflito> processoConflitos) {
        return new PageImpl<>(
            fetchBagRelationships(processoConflitos.getContent()),
            processoConflitos.getPageable(),
            processoConflitos.getTotalElements()
        );
    }

    @Override
    public List<ProcessoConflito> fetchBagRelationships(List<ProcessoConflito> processoConflitos) {
        return Optional.of(processoConflitos).map(this::fetchDireitos).orElse(Collections.emptyList());
    }

    ProcessoConflito fetchDireitos(ProcessoConflito result) {
        return entityManager
            .createQuery(
                "select processoConflito from ProcessoConflito processoConflito left join fetch processoConflito.direitos where processoConflito is :processoConflito",
                ProcessoConflito.class
            )
            .setParameter("processoConflito", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<ProcessoConflito> fetchDireitos(List<ProcessoConflito> processoConflitos) {
        return entityManager
            .createQuery(
                "select distinct processoConflito from ProcessoConflito processoConflito left join fetch processoConflito.direitos where processoConflito in :processoConflitos",
                ProcessoConflito.class
            )
            .setParameter("processoConflitos", processoConflitos)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }
}
