package org.cidha.service;

import java.util.List;
import javax.persistence.criteria.JoinType;
import org.cidha.domain.*; // for static metamodels
import org.cidha.domain.EmbargoRecursoEspecial;
import org.cidha.repository.EmbargoRecursoEspecialRepository;
import org.cidha.service.criteria.EmbargoRecursoEspecialCriteria;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link EmbargoRecursoEspecial} entities in the database.
 * The main input is a {@link EmbargoRecursoEspecialCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link EmbargoRecursoEspecial} or a {@link Page} of {@link EmbargoRecursoEspecial} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class EmbargoRecursoEspecialQueryService extends QueryService<EmbargoRecursoEspecial> {

    private final Logger log = LoggerFactory.getLogger(EmbargoRecursoEspecialQueryService.class);

    private final EmbargoRecursoEspecialRepository embargoRecursoEspecialRepository;

    public EmbargoRecursoEspecialQueryService(EmbargoRecursoEspecialRepository embargoRecursoEspecialRepository) {
        this.embargoRecursoEspecialRepository = embargoRecursoEspecialRepository;
    }

    /**
     * Return a {@link List} of {@link EmbargoRecursoEspecial} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<EmbargoRecursoEspecial> findByCriteria(EmbargoRecursoEspecialCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<EmbargoRecursoEspecial> specification = createSpecification(criteria);
        return embargoRecursoEspecialRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link EmbargoRecursoEspecial} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<EmbargoRecursoEspecial> findByCriteria(EmbargoRecursoEspecialCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<EmbargoRecursoEspecial> specification = createSpecification(criteria);
        return embargoRecursoEspecialRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(EmbargoRecursoEspecialCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<EmbargoRecursoEspecial> specification = createSpecification(criteria);
        return embargoRecursoEspecialRepository.count(specification);
    }

    /**
     * Function to convert {@link EmbargoRecursoEspecialCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<EmbargoRecursoEspecial> createSpecification(EmbargoRecursoEspecialCriteria criteria) {
        Specification<EmbargoRecursoEspecial> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), EmbargoRecursoEspecial_.id));
            }
            if (criteria.getDescricao() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescricao(), EmbargoRecursoEspecial_.descricao));
            }
            if (criteria.getProcessoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getProcessoId(),
                            root -> root.join(EmbargoRecursoEspecial_.processo, JoinType.LEFT).get(Processo_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
