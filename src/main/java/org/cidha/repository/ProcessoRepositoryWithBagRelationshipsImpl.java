package org.cidha.repository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.cidha.domain.Processo;
import org.hibernate.annotations.QueryHints;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class ProcessoRepositoryWithBagRelationshipsImpl implements ProcessoRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Processo> fetchBagRelationships(Optional<Processo> processo) {
        return processo
            .map(this::fetchComarcas)
            .map(this::fetchMunicipios)
            .map(this::fetchTerritorios)
            .map(this::fetchAtividadeExploracaoIlegals)
            .map(this::fetchUnidadeConservacaos)
            .map(this::fetchEnvolvidosConflitoLitigios)
            .map(this::fetchTerraIndigenas)
            .map(this::fetchProcessoConflitos)
            .map(this::fetchParteInteresssadas)
            .map(this::fetchRelators)
            .map(this::fetchQuilombos);
    }

    @Override
    public Page<Processo> fetchBagRelationships(Page<Processo> processos) {
        return new PageImpl<>(fetchBagRelationships(processos.getContent()), processos.getPageable(), processos.getTotalElements());
    }

    @Override
    public List<Processo> fetchBagRelationships(List<Processo> processos) {
        return Optional
            .of(processos)
            .map(this::fetchComarcas)
            .map(this::fetchMunicipios)
            .map(this::fetchTerritorios)
            .map(this::fetchAtividadeExploracaoIlegals)
            .map(this::fetchUnidadeConservacaos)
            .map(this::fetchEnvolvidosConflitoLitigios)
            .map(this::fetchTerraIndigenas)
            .map(this::fetchProcessoConflitos)
            .map(this::fetchParteInteresssadas)
            .map(this::fetchRelators)
            .map(this::fetchQuilombos)
            .orElse(Collections.emptyList());
    }

    Processo fetchComarcas(Processo result) {
        return entityManager
            .createQuery(
                "select processo from Processo processo left join fetch processo.comarcas where processo is :processo",
                Processo.class
            )
            .setParameter("processo", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Processo> fetchComarcas(List<Processo> processos) {
        return entityManager
            .createQuery(
                "select distinct processo from Processo processo left join fetch processo.comarcas where processo in :processos",
                Processo.class
            )
            .setParameter("processos", processos)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }

    Processo fetchMunicipios(Processo result) {
        return entityManager
            .createQuery(
                "select processo from Processo processo left join fetch processo.municipios where processo is :processo",
                Processo.class
            )
            .setParameter("processo", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Processo> fetchMunicipios(List<Processo> processos) {
        return entityManager
            .createQuery(
                "select distinct processo from Processo processo left join fetch processo.municipios where processo in :processos",
                Processo.class
            )
            .setParameter("processos", processos)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }

    Processo fetchTerritorios(Processo result) {
        return entityManager
            .createQuery(
                "select processo from Processo processo left join fetch processo.territorios where processo is :processo",
                Processo.class
            )
            .setParameter("processo", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Processo> fetchTerritorios(List<Processo> processos) {
        return entityManager
            .createQuery(
                "select distinct processo from Processo processo left join fetch processo.territorios where processo in :processos",
                Processo.class
            )
            .setParameter("processos", processos)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }

    Processo fetchAtividadeExploracaoIlegals(Processo result) {
        return entityManager
            .createQuery(
                "select processo from Processo processo left join fetch processo.atividadeExploracaoIlegals where processo is :processo",
                Processo.class
            )
            .setParameter("processo", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Processo> fetchAtividadeExploracaoIlegals(List<Processo> processos) {
        return entityManager
            .createQuery(
                "select distinct processo from Processo processo left join fetch processo.atividadeExploracaoIlegals where processo in :processos",
                Processo.class
            )
            .setParameter("processos", processos)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }

    Processo fetchUnidadeConservacaos(Processo result) {
        return entityManager
            .createQuery(
                "select processo from Processo processo left join fetch processo.unidadeConservacaos where processo is :processo",
                Processo.class
            )
            .setParameter("processo", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Processo> fetchUnidadeConservacaos(List<Processo> processos) {
        return entityManager
            .createQuery(
                "select distinct processo from Processo processo left join fetch processo.unidadeConservacaos where processo in :processos",
                Processo.class
            )
            .setParameter("processos", processos)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }

    Processo fetchEnvolvidosConflitoLitigios(Processo result) {
        return entityManager
            .createQuery(
                "select processo from Processo processo left join fetch processo.envolvidosConflitoLitigios where processo is :processo",
                Processo.class
            )
            .setParameter("processo", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Processo> fetchEnvolvidosConflitoLitigios(List<Processo> processos) {
        return entityManager
            .createQuery(
                "select distinct processo from Processo processo left join fetch processo.envolvidosConflitoLitigios where processo in :processos",
                Processo.class
            )
            .setParameter("processos", processos)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }

    Processo fetchTerraIndigenas(Processo result) {
        return entityManager
            .createQuery(
                "select processo from Processo processo left join fetch processo.terraIndigenas where processo is :processo",
                Processo.class
            )
            .setParameter("processo", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Processo> fetchTerraIndigenas(List<Processo> processos) {
        return entityManager
            .createQuery(
                "select distinct processo from Processo processo left join fetch processo.terraIndigenas where processo in :processos",
                Processo.class
            )
            .setParameter("processos", processos)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }

    Processo fetchProcessoConflitos(Processo result) {
        return entityManager
            .createQuery(
                "select processo from Processo processo left join fetch processo.processoConflitos where processo is :processo",
                Processo.class
            )
            .setParameter("processo", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Processo> fetchProcessoConflitos(List<Processo> processos) {
        return entityManager
            .createQuery(
                "select distinct processo from Processo processo left join fetch processo.processoConflitos where processo in :processos",
                Processo.class
            )
            .setParameter("processos", processos)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }

    Processo fetchParteInteresssadas(Processo result) {
        return entityManager
            .createQuery(
                "select processo from Processo processo left join fetch processo.parteInteresssadas where processo is :processo",
                Processo.class
            )
            .setParameter("processo", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Processo> fetchParteInteresssadas(List<Processo> processos) {
        return entityManager
            .createQuery(
                "select distinct processo from Processo processo left join fetch processo.parteInteresssadas where processo in :processos",
                Processo.class
            )
            .setParameter("processos", processos)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }

    Processo fetchRelators(Processo result) {
        return entityManager
            .createQuery(
                "select processo from Processo processo left join fetch processo.relators where processo is :processo",
                Processo.class
            )
            .setParameter("processo", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Processo> fetchRelators(List<Processo> processos) {
        return entityManager
            .createQuery(
                "select distinct processo from Processo processo left join fetch processo.relators where processo in :processos",
                Processo.class
            )
            .setParameter("processos", processos)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }

    Processo fetchQuilombos(Processo result) {
        return entityManager
            .createQuery(
                "select processo from Processo processo left join fetch processo.quilombos where processo is :processo",
                Processo.class
            )
            .setParameter("processo", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Processo> fetchQuilombos(List<Processo> processos) {
        return entityManager
            .createQuery(
                "select distinct processo from Processo processo left join fetch processo.quilombos where processo in :processos",
                Processo.class
            )
            .setParameter("processos", processos)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }
}
