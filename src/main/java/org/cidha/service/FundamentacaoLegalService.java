package org.cidha.service;

import java.util.Optional;
import org.cidha.domain.FundamentacaoLegal;
import org.cidha.repository.FundamentacaoLegalRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link FundamentacaoLegal}.
 */
@Service
@Transactional
public class FundamentacaoLegalService {

    private final Logger log = LoggerFactory.getLogger(FundamentacaoLegalService.class);

    private final FundamentacaoLegalRepository fundamentacaoLegalRepository;

    public FundamentacaoLegalService(FundamentacaoLegalRepository fundamentacaoLegalRepository) {
        this.fundamentacaoLegalRepository = fundamentacaoLegalRepository;
    }

    /**
     * Save a fundamentacaoLegal.
     *
     * @param fundamentacaoLegal the entity to save.
     * @return the persisted entity.
     */
    public FundamentacaoLegal save(FundamentacaoLegal fundamentacaoLegal) {
        log.debug("Request to save FundamentacaoLegal : {}", fundamentacaoLegal);
        return fundamentacaoLegalRepository.save(fundamentacaoLegal);
    }

    /**
     * Update a fundamentacaoLegal.
     *
     * @param fundamentacaoLegal the entity to save.
     * @return the persisted entity.
     */
    public FundamentacaoLegal update(FundamentacaoLegal fundamentacaoLegal) {
        log.debug("Request to save FundamentacaoLegal : {}", fundamentacaoLegal);
        return fundamentacaoLegalRepository.save(fundamentacaoLegal);
    }

    /**
     * Partially update a fundamentacaoLegal.
     *
     * @param fundamentacaoLegal the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<FundamentacaoLegal> partialUpdate(FundamentacaoLegal fundamentacaoLegal) {
        log.debug("Request to partially update FundamentacaoLegal : {}", fundamentacaoLegal);

        return fundamentacaoLegalRepository
            .findById(fundamentacaoLegal.getId())
            .map(existingFundamentacaoLegal -> {
                if (fundamentacaoLegal.getFundamentacaoLegal() != null) {
                    existingFundamentacaoLegal.setFundamentacaoLegal(fundamentacaoLegal.getFundamentacaoLegal());
                }
                if (fundamentacaoLegal.getFolhasFundamentacaoLegal() != null) {
                    existingFundamentacaoLegal.setFolhasFundamentacaoLegal(fundamentacaoLegal.getFolhasFundamentacaoLegal());
                }
                if (fundamentacaoLegal.getFundamentacaoLegalSugerida() != null) {
                    existingFundamentacaoLegal.setFundamentacaoLegalSugerida(fundamentacaoLegal.getFundamentacaoLegalSugerida());
                }

                return existingFundamentacaoLegal;
            })
            .map(fundamentacaoLegalRepository::save);
    }

    /**
     * Get all the fundamentacaoLegals.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<FundamentacaoLegal> findAll(Pageable pageable) {
        log.debug("Request to get all FundamentacaoLegals");
        return fundamentacaoLegalRepository.findAll(pageable);
    }

    /**
     * Get one fundamentacaoLegal by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<FundamentacaoLegal> findOne(Long id) {
        log.debug("Request to get FundamentacaoLegal : {}", id);
        return fundamentacaoLegalRepository.findById(id);
    }

    /**
     * Delete the fundamentacaoLegal by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete FundamentacaoLegal : {}", id);
        fundamentacaoLegalRepository.deleteById(id);
    }
}
