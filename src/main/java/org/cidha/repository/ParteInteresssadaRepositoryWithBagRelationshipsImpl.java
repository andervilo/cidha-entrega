package org.cidha.repository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.cidha.domain.ParteInteresssada;
import org.hibernate.annotations.QueryHints;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class ParteInteresssadaRepositoryWithBagRelationshipsImpl implements ParteInteresssadaRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<ParteInteresssada> fetchBagRelationships(Optional<ParteInteresssada> parteInteresssada) {
        return parteInteresssada.map(this::fetchRepresentanteLegals);
    }

    @Override
    public Page<ParteInteresssada> fetchBagRelationships(Page<ParteInteresssada> parteInteresssadas) {
        return new PageImpl<>(
            fetchBagRelationships(parteInteresssadas.getContent()),
            parteInteresssadas.getPageable(),
            parteInteresssadas.getTotalElements()
        );
    }

    @Override
    public List<ParteInteresssada> fetchBagRelationships(List<ParteInteresssada> parteInteresssadas) {
        return Optional.of(parteInteresssadas).map(this::fetchRepresentanteLegals).orElse(Collections.emptyList());
    }

    ParteInteresssada fetchRepresentanteLegals(ParteInteresssada result) {
        return entityManager
            .createQuery(
                "select parteInteresssada from ParteInteresssada parteInteresssada left join fetch parteInteresssada.representanteLegals where parteInteresssada is :parteInteresssada",
                ParteInteresssada.class
            )
            .setParameter("parteInteresssada", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<ParteInteresssada> fetchRepresentanteLegals(List<ParteInteresssada> parteInteresssadas) {
        return entityManager
            .createQuery(
                "select distinct parteInteresssada from ParteInteresssada parteInteresssada left join fetch parteInteresssada.representanteLegals where parteInteresssada in :parteInteresssadas",
                ParteInteresssada.class
            )
            .setParameter("parteInteresssadas", parteInteresssadas)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }
}
