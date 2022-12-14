package org.cidha.service;

import java.util.List;
import javax.persistence.criteria.JoinType;
import org.cidha.domain.*; // for static metamodels
import org.cidha.domain.EmbargoDeclaracao;
import org.cidha.repository.EmbargoDeclaracaoRepository;
import org.cidha.service.criteria.EmbargoDeclaracaoCriteria;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link EmbargoDeclaracao} entities in the database.
 * The main input is a {@link EmbargoDeclaracaoCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link EmbargoDeclaracao} or a {@link Page} of {@link EmbargoDeclaracao} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class EmbargoDeclaracaoQueryService extends QueryService<EmbargoDeclaracao> {

    private final Logger log = LoggerFactory.getLogger(EmbargoDeclaracaoQueryService.class);

    private final EmbargoDeclaracaoRepository embargoDeclaracaoRepository;

    public EmbargoDeclaracaoQueryService(EmbargoDeclaracaoRepository embargoDeclaracaoRepository) {
        this.embargoDeclaracaoRepository = embargoDeclaracaoRepository;
    }

    /**
     * Return a {@link List} of {@link EmbargoDeclaracao} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<EmbargoDeclaracao> findByCriteria(EmbargoDeclaracaoCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<EmbargoDeclaracao> specification = createSpecification(criteria);
        return embargoDeclaracaoRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link EmbargoDeclaracao} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<EmbargoDeclaracao> findByCriteria(EmbargoDeclaracaoCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<EmbargoDeclaracao> specification = createSpecification(criteria);
        return embargoDeclaracaoRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(EmbargoDeclaracaoCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<EmbargoDeclaracao> specification = createSpecification(criteria);
        return embargoDeclaracaoRepository.count(specification);
    }

    /**
     * Function to convert {@link EmbargoDeclaracaoCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<EmbargoDeclaracao> createSpecification(EmbargoDeclaracaoCriteria criteria) {
        Specification<EmbargoDeclaracao> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), EmbargoDeclaracao_.id));
            }
            if (criteria.getDescricao() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescricao(), EmbargoDeclaracao_.descricao));
            }
            if (criteria.getProcessoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getProcessoId(),
                            root -> root.join(EmbargoDeclaracao_.processo, JoinType.LEFT).get(Processo_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
