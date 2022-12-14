package org.cidha.service;

import java.util.Optional;
import org.cidha.domain.Quilombo;
import org.cidha.repository.QuilomboRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Quilombo}.
 */
@Service
@Transactional
public class QuilomboService {

    private final Logger log = LoggerFactory.getLogger(QuilomboService.class);

    private final QuilomboRepository quilomboRepository;

    public QuilomboService(QuilomboRepository quilomboRepository) {
        this.quilomboRepository = quilomboRepository;
    }

    /**
     * Save a quilombo.
     *
     * @param quilombo the entity to save.
     * @return the persisted entity.
     */
    public Quilombo save(Quilombo quilombo) {
        log.debug("Request to save Quilombo : {}", quilombo);
        return quilomboRepository.save(quilombo);
    }

    /**
     * Update a quilombo.
     *
     * @param quilombo the entity to save.
     * @return the persisted entity.
     */
    public Quilombo update(Quilombo quilombo) {
        log.debug("Request to save Quilombo : {}", quilombo);
        return quilomboRepository.save(quilombo);
    }

    /**
     * Partially update a quilombo.
     *
     * @param quilombo the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Quilombo> partialUpdate(Quilombo quilombo) {
        log.debug("Request to partially update Quilombo : {}", quilombo);

        return quilomboRepository
            .findById(quilombo.getId())
            .map(existingQuilombo -> {
                if (quilombo.getNome() != null) {
                    existingQuilombo.setNome(quilombo.getNome());
                }
                if (quilombo.getTipoQuilombo() != null) {
                    existingQuilombo.setTipoQuilombo(quilombo.getTipoQuilombo());
                }

                return existingQuilombo;
            })
            .map(quilomboRepository::save);
    }

    /**
     * Get all the quilombos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Quilombo> findAll(Pageable pageable) {
        log.debug("Request to get all Quilombos");
        return quilomboRepository.findAll(pageable);
    }

    /**
     * Get one quilombo by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Quilombo> findOne(Long id) {
        log.debug("Request to get Quilombo : {}", id);
        return quilomboRepository.findById(id);
    }

    /**
     * Delete the quilombo by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Quilombo : {}", id);
        quilomboRepository.deleteById(id);
    }
}
