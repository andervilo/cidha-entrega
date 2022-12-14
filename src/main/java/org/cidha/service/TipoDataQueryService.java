package org.cidha.service;

import java.util.List;
import javax.persistence.criteria.JoinType;
import org.cidha.domain.*; // for static metamodels
import org.cidha.domain.TipoData;
import org.cidha.repository.TipoDataRepository;
import org.cidha.service.criteria.TipoDataCriteria;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link TipoData} entities in the database.
 * The main input is a {@link TipoDataCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link TipoData} or a {@link Page} of {@link TipoData} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class TipoDataQueryService extends QueryService<TipoData> {

    private final Logger log = LoggerFactory.getLogger(TipoDataQueryService.class);

    private final TipoDataRepository tipoDataRepository;

    public TipoDataQueryService(TipoDataRepository tipoDataRepository) {
        this.tipoDataRepository = tipoDataRepository;
    }

    /**
     * Return a {@link List} of {@link TipoData} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<TipoData> findByCriteria(TipoDataCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<TipoData> specification = createSpecification(criteria);
        return tipoDataRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link TipoData} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<TipoData> findByCriteria(TipoDataCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<TipoData> specification = createSpecification(criteria);
        return tipoDataRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(TipoDataCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<TipoData> specification = createSpecification(criteria);
        return tipoDataRepository.count(specification);
    }

    /**
     * Function to convert {@link TipoDataCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<TipoData> createSpecification(TipoDataCriteria criteria) {
        Specification<TipoData> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), TipoData_.id));
            }
            if (criteria.getDescricao() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescricao(), TipoData_.descricao));
            }
        }
        return specification;
    }
}
