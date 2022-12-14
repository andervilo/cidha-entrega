package org.cidha.service;

import java.util.Optional;
import org.cidha.domain.ConcessaoLiminarCassada;
import org.cidha.repository.ConcessaoLiminarCassadaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ConcessaoLiminarCassada}.
 */
@Service
@Transactional
public class ConcessaoLiminarCassadaService {

    private final Logger log = LoggerFactory.getLogger(ConcessaoLiminarCassadaService.class);

    private final ConcessaoLiminarCassadaRepository concessaoLiminarCassadaRepository;

    public ConcessaoLiminarCassadaService(ConcessaoLiminarCassadaRepository concessaoLiminarCassadaRepository) {
        this.concessaoLiminarCassadaRepository = concessaoLiminarCassadaRepository;
    }

    /**
     * Save a concessaoLiminarCassada.
     *
     * @param concessaoLiminarCassada the entity to save.
     * @return the persisted entity.
     */
    public ConcessaoLiminarCassada save(ConcessaoLiminarCassada concessaoLiminarCassada) {
        log.debug("Request to save ConcessaoLiminarCassada : {}", concessaoLiminarCassada);
        return concessaoLiminarCassadaRepository.save(concessaoLiminarCassada);
    }

    /**
     * Update a concessaoLiminarCassada.
     *
     * @param concessaoLiminarCassada the entity to save.
     * @return the persisted entity.
     */
    public ConcessaoLiminarCassada update(ConcessaoLiminarCassada concessaoLiminarCassada) {
        log.debug("Request to save ConcessaoLiminarCassada : {}", concessaoLiminarCassada);
        return concessaoLiminarCassadaRepository.save(concessaoLiminarCassada);
    }

    /**
     * Partially update a concessaoLiminarCassada.
     *
     * @param concessaoLiminarCassada the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<ConcessaoLiminarCassada> partialUpdate(ConcessaoLiminarCassada concessaoLiminarCassada) {
        log.debug("Request to partially update ConcessaoLiminarCassada : {}", concessaoLiminarCassada);

        return concessaoLiminarCassadaRepository
            .findById(concessaoLiminarCassada.getId())
            .map(existingConcessaoLiminarCassada -> {
                if (concessaoLiminarCassada.getDescricao() != null) {
                    existingConcessaoLiminarCassada.setDescricao(concessaoLiminarCassada.getDescricao());
                }

                return existingConcessaoLiminarCassada;
            })
            .map(concessaoLiminarCassadaRepository::save);
    }

    /**
     * Get all the concessaoLiminarCassadas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<ConcessaoLiminarCassada> findAll(Pageable pageable) {
        log.debug("Request to get all ConcessaoLiminarCassadas");
        return concessaoLiminarCassadaRepository.findAll(pageable);
    }

    /**
     * Get one concessaoLiminarCassada by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ConcessaoLiminarCassada> findOne(Long id) {
        log.debug("Request to get ConcessaoLiminarCassada : {}", id);
        return concessaoLiminarCassadaRepository.findById(id);
    }

    /**
     * Delete the concessaoLiminarCassada by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete ConcessaoLiminarCassada : {}", id);
        concessaoLiminarCassadaRepository.deleteById(id);
    }
}
