package org.cidha.repository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.cidha.domain.ProblemaJuridico;
import org.hibernate.annotations.QueryHints;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class ProblemaJuridicoRepositoryWithBagRelationshipsImpl implements ProblemaJuridicoRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<ProblemaJuridico> fetchBagRelationships(Optional<ProblemaJuridico> problemaJuridico) {
        return problemaJuridico
            .map(this::fetchFundamentacaoDoutrinarias)
            .map(this::fetchJurisprudencias)
            .map(this::fetchFundamentacaoLegals)
            .map(this::fetchInstrumentoInternacionals)
            .map(this::fetchProcessos);
    }

    @Override
    public Page<ProblemaJuridico> fetchBagRelationships(Page<ProblemaJuridico> problemaJuridicos) {
        return new PageImpl<>(
            fetchBagRelationships(problemaJuridicos.getContent()),
            problemaJuridicos.getPageable(),
            problemaJuridicos.getTotalElements()
        );
    }

    @Override
    public List<ProblemaJuridico> fetchBagRelationships(List<ProblemaJuridico> problemaJuridicos) {
        return Optional
            .of(problemaJuridicos)
            .map(this::fetchFundamentacaoDoutrinarias)
            .map(this::fetchJurisprudencias)
            .map(this::fetchFundamentacaoLegals)
            .map(this::fetchInstrumentoInternacionals)
            .map(this::fetchProcessos)
            .orElse(Collections.emptyList());
    }

    ProblemaJuridico fetchFundamentacaoDoutrinarias(ProblemaJuridico result) {
        return entityManager
            .createQuery(
                "select problemaJuridico from ProblemaJuridico problemaJuridico left join fetch problemaJuridico.fundamentacaoDoutrinarias where problemaJuridico is :problemaJuridico",
                ProblemaJuridico.class
            )
            .setParameter("problemaJuridico", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<ProblemaJuridico> fetchFundamentacaoDoutrinarias(List<ProblemaJuridico> problemaJuridicos) {
        return entityManager
            .createQuery(
                "select distinct problemaJuridico from ProblemaJuridico problemaJuridico left join fetch problemaJuridico.fundamentacaoDoutrinarias where problemaJuridico in :problemaJuridicos",
                ProblemaJuridico.class
            )
            .setParameter("problemaJuridicos", problemaJuridicos)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }

    ProblemaJuridico fetchJurisprudencias(ProblemaJuridico result) {
        return entityManager
            .createQuery(
                "select problemaJuridico from ProblemaJuridico problemaJuridico left join fetch problemaJuridico.jurisprudencias where problemaJuridico is :problemaJuridico",
                ProblemaJuridico.class
            )
            .setParameter("problemaJuridico", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<ProblemaJuridico> fetchJurisprudencias(List<ProblemaJuridico> problemaJuridicos) {
        return entityManager
            .createQuery(
                "select distinct problemaJuridico from ProblemaJuridico problemaJuridico left join fetch problemaJuridico.jurisprudencias where problemaJuridico in :problemaJuridicos",
                ProblemaJuridico.class
            )
            .setParameter("problemaJuridicos", problemaJuridicos)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }

    ProblemaJuridico fetchFundamentacaoLegals(ProblemaJuridico result) {
        return entityManager
            .createQuery(
                "select problemaJuridico from ProblemaJuridico problemaJuridico left join fetch problemaJuridico.fundamentacaoLegals where problemaJuridico is :problemaJuridico",
                ProblemaJuridico.class
            )
            .setParameter("problemaJuridico", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<ProblemaJuridico> fetchFundamentacaoLegals(List<ProblemaJuridico> problemaJuridicos) {
        return entityManager
            .createQuery(
                "select distinct problemaJuridico from ProblemaJuridico problemaJuridico left join fetch problemaJuridico.fundamentacaoLegals where problemaJuridico in :problemaJuridicos",
                ProblemaJuridico.class
            )
            .setParameter("problemaJuridicos", problemaJuridicos)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }

    ProblemaJuridico fetchInstrumentoInternacionals(ProblemaJuridico result) {
        return entityManager
            .createQuery(
                "select problemaJuridico from ProblemaJuridico problemaJuridico left join fetch problemaJuridico.instrumentoInternacionals where problemaJuridico is :problemaJuridico",
                ProblemaJuridico.class
            )
            .setParameter("problemaJuridico", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<ProblemaJuridico> fetchInstrumentoInternacionals(List<ProblemaJuridico> problemaJuridicos) {
        return entityManager
            .createQuery(
                "select distinct problemaJuridico from ProblemaJuridico problemaJuridico left join fetch problemaJuridico.instrumentoInternacionals where problemaJuridico in :problemaJuridicos",
                ProblemaJuridico.class
            )
            .setParameter("problemaJuridicos", problemaJuridicos)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }

    ProblemaJuridico fetchProcessos(ProblemaJuridico result) {
        return entityManager
            .createQuery(
                "select problemaJuridico from ProblemaJuridico problemaJuridico left join fetch problemaJuridico.processos where problemaJuridico is :problemaJuridico",
                ProblemaJuridico.class
            )
            .setParameter("problemaJuridico", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<ProblemaJuridico> fetchProcessos(List<ProblemaJuridico> problemaJuridicos) {
        return entityManager
            .createQuery(
                "select distinct problemaJuridico from ProblemaJuridico problemaJuridico left join fetch problemaJuridico.processos where problemaJuridico in :problemaJuridicos",
                ProblemaJuridico.class
            )
            .setParameter("problemaJuridicos", problemaJuridicos)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }
}
