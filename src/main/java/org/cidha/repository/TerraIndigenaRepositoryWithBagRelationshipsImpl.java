package org.cidha.repository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.cidha.domain.TerraIndigena;
import org.hibernate.annotations.QueryHints;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class TerraIndigenaRepositoryWithBagRelationshipsImpl implements TerraIndigenaRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<TerraIndigena> fetchBagRelationships(Optional<TerraIndigena> terraIndigena) {
        return terraIndigena.map(this::fetchEtnias);
    }

    @Override
    public Page<TerraIndigena> fetchBagRelationships(Page<TerraIndigena> terraIndigenas) {
        return new PageImpl<>(
            fetchBagRelationships(terraIndigenas.getContent()),
            terraIndigenas.getPageable(),
            terraIndigenas.getTotalElements()
        );
    }

    @Override
    public List<TerraIndigena> fetchBagRelationships(List<TerraIndigena> terraIndigenas) {
        return Optional.of(terraIndigenas).map(this::fetchEtnias).orElse(Collections.emptyList());
    }

    TerraIndigena fetchEtnias(TerraIndigena result) {
        return entityManager
            .createQuery(
                "select terraIndigena from TerraIndigena terraIndigena left join fetch terraIndigena.etnias where terraIndigena is :terraIndigena",
                TerraIndigena.class
            )
            .setParameter("terraIndigena", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<TerraIndigena> fetchEtnias(List<TerraIndigena> terraIndigenas) {
        return entityManager
            .createQuery(
                "select distinct terraIndigena from TerraIndigena terraIndigena left join fetch terraIndigena.etnias where terraIndigena in :terraIndigenas",
                TerraIndigena.class
            )
            .setParameter("terraIndigenas", terraIndigenas)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }
}
