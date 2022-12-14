package org.cidha.service;

import java.util.List;
import javax.persistence.criteria.JoinType;
import org.cidha.domain.*; // for static metamodels
import org.cidha.domain.Quilombo;
import org.cidha.repository.QuilomboRepository;
import org.cidha.service.criteria.QuilomboCriteria;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link Quilombo} entities in the database.
 * The main input is a {@link QuilomboCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Quilombo} or a {@link Page} of {@link Quilombo} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class QuilomboQueryService extends QueryService<Quilombo> {

    private final Logger log = LoggerFactory.getLogger(QuilomboQueryService.class);

    private final QuilomboRepository quilomboRepository;

    public QuilomboQueryService(QuilomboRepository quilomboRepository) {
        this.quilomboRepository = quilomboRepository;
    }

    /**
     * Return a {@link List} of {@link Quilombo} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Quilombo> findByCriteria(QuilomboCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Quilombo> specification = createSpecification(criteria);
        return quilomboRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Quilombo} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Quilombo> findByCriteria(QuilomboCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Quilombo> specification = createSpecification(criteria);
        return quilomboRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(QuilomboCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Quilombo> specification = createSpecification(criteria);
        return quilomboRepository.count(specification);
    }

    /**
     * Function to convert {@link QuilomboCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Quilombo> createSpecification(QuilomboCriteria criteria) {
        Specification<Quilombo> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Quilombo_.id));
            }
            if (criteria.getNome() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNome(), Quilombo_.nome));
            }
            if (criteria.getTipoQuilombo() != null) {
                specification = specification.and(buildSpecification(criteria.getTipoQuilombo(), Quilombo_.tipoQuilombo));
            }
            if (criteria.getProcessoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getProcessoId(),
                            root -> root.join(Quilombo_.processos, JoinType.LEFT).get(Processo_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
