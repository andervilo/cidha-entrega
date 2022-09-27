package org.cidha.service;

import java.util.List;
import javax.persistence.criteria.JoinType;
import org.cidha.domain.*; // for static metamodels
import org.cidha.domain.TipoRecurso;
import org.cidha.repository.TipoRecursoRepository;
import org.cidha.service.criteria.TipoRecursoCriteria;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link TipoRecurso} entities in the database.
 * The main input is a {@link TipoRecursoCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link TipoRecurso} or a {@link Page} of {@link TipoRecurso} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class TipoRecursoQueryService extends QueryService<TipoRecurso> {

    private final Logger log = LoggerFactory.getLogger(TipoRecursoQueryService.class);

    private final TipoRecursoRepository tipoRecursoRepository;

    public TipoRecursoQueryService(TipoRecursoRepository tipoRecursoRepository) {
        this.tipoRecursoRepository = tipoRecursoRepository;
    }

    /**
     * Return a {@link List} of {@link TipoRecurso} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<TipoRecurso> findByCriteria(TipoRecursoCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<TipoRecurso> specification = createSpecification(criteria);
        return tipoRecursoRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link TipoRecurso} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<TipoRecurso> findByCriteria(TipoRecursoCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<TipoRecurso> specification = createSpecification(criteria);
        return tipoRecursoRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(TipoRecursoCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<TipoRecurso> specification = createSpecification(criteria);
        return tipoRecursoRepository.count(specification);
    }

    /**
     * Function to convert {@link TipoRecursoCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<TipoRecurso> createSpecification(TipoRecursoCriteria criteria) {
        Specification<TipoRecurso> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), TipoRecurso_.id));
            }
            if (criteria.getDescricao() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescricao(), TipoRecurso_.descricao));
            }
        }
        return specification;
    }
}
