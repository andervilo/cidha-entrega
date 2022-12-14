package org.cidha.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.cidha.domain.ProblemaJuridico;
import org.cidha.repository.ProblemaJuridicoRepository;
import org.cidha.service.ProblemaJuridicoQueryService;
import org.cidha.service.ProblemaJuridicoService;
import org.cidha.service.criteria.ProblemaJuridicoCriteria;
import org.cidha.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link org.cidha.domain.ProblemaJuridico}.
 */
@RestController
@RequestMapping("/api")
public class ProblemaJuridicoResource {

    private final Logger log = LoggerFactory.getLogger(ProblemaJuridicoResource.class);

    private static final String ENTITY_NAME = "problemaJuridico";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProblemaJuridicoService problemaJuridicoService;

    private final ProblemaJuridicoRepository problemaJuridicoRepository;

    private final ProblemaJuridicoQueryService problemaJuridicoQueryService;

    public ProblemaJuridicoResource(
        ProblemaJuridicoService problemaJuridicoService,
        ProblemaJuridicoRepository problemaJuridicoRepository,
        ProblemaJuridicoQueryService problemaJuridicoQueryService
    ) {
        this.problemaJuridicoService = problemaJuridicoService;
        this.problemaJuridicoRepository = problemaJuridicoRepository;
        this.problemaJuridicoQueryService = problemaJuridicoQueryService;
    }

    /**
     * {@code POST  /problema-juridicos} : Create a new problemaJuridico.
     *
     * @param problemaJuridico the problemaJuridico to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new problemaJuridico, or with status {@code 400 (Bad Request)} if the problemaJuridico has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/problema-juridicos")
    public ResponseEntity<ProblemaJuridico> createProblemaJuridico(@RequestBody ProblemaJuridico problemaJuridico)
        throws URISyntaxException {
        log.debug("REST request to save ProblemaJuridico : {}", problemaJuridico);
        if (problemaJuridico.getId() != null) {
            throw new BadRequestAlertException("A new problemaJuridico cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProblemaJuridico result = problemaJuridicoService.save(problemaJuridico);
        return ResponseEntity
            .created(new URI("/api/problema-juridicos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /problema-juridicos/:id} : Updates an existing problemaJuridico.
     *
     * @param id the id of the problemaJuridico to save.
     * @param problemaJuridico the problemaJuridico to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated problemaJuridico,
     * or with status {@code 400 (Bad Request)} if the problemaJuridico is not valid,
     * or with status {@code 500 (Internal Server Error)} if the problemaJuridico couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/problema-juridicos/{id}")
    public ResponseEntity<ProblemaJuridico> updateProblemaJuridico(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ProblemaJuridico problemaJuridico
    ) throws URISyntaxException {
        log.debug("REST request to update ProblemaJuridico : {}, {}", id, problemaJuridico);
        if (problemaJuridico.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, problemaJuridico.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!problemaJuridicoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ProblemaJuridico result = problemaJuridicoService.update(problemaJuridico);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, problemaJuridico.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /problema-juridicos/:id} : Partial updates given fields of an existing problemaJuridico, field will ignore if it is null
     *
     * @param id the id of the problemaJuridico to save.
     * @param problemaJuridico the problemaJuridico to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated problemaJuridico,
     * or with status {@code 400 (Bad Request)} if the problemaJuridico is not valid,
     * or with status {@code 404 (Not Found)} if the problemaJuridico is not found,
     * or with status {@code 500 (Internal Server Error)} if the problemaJuridico couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/problema-juridicos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ProblemaJuridico> partialUpdateProblemaJuridico(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ProblemaJuridico problemaJuridico
    ) throws URISyntaxException {
        log.debug("REST request to partial update ProblemaJuridico partially : {}, {}", id, problemaJuridico);
        if (problemaJuridico.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, problemaJuridico.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!problemaJuridicoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ProblemaJuridico> result = problemaJuridicoService.partialUpdate(problemaJuridico);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, problemaJuridico.getId().toString())
        );
    }

    /**
     * {@code GET  /problema-juridicos} : get all the problemaJuridicos.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of problemaJuridicos in body.
     */
    @GetMapping("/problema-juridicos")
    public ResponseEntity<List<ProblemaJuridico>> getAllProblemaJuridicos(
        ProblemaJuridicoCriteria criteria,
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get ProblemaJuridicos by criteria: {}", criteria);
        Page<ProblemaJuridico> page = problemaJuridicoQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /problema-juridicos/count} : count all the problemaJuridicos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/problema-juridicos/count")
    public ResponseEntity<Long> countProblemaJuridicos(ProblemaJuridicoCriteria criteria) {
        log.debug("REST request to count ProblemaJuridicos by criteria: {}", criteria);
        return ResponseEntity.ok().body(problemaJuridicoQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /problema-juridicos/:id} : get the "id" problemaJuridico.
     *
     * @param id the id of the problemaJuridico to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the problemaJuridico, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/problema-juridicos/{id}")
    public ResponseEntity<ProblemaJuridico> getProblemaJuridico(@PathVariable Long id) {
        log.debug("REST request to get ProblemaJuridico : {}", id);
        Optional<ProblemaJuridico> problemaJuridico = problemaJuridicoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(problemaJuridico);
    }

    /**
     * {@code DELETE  /problema-juridicos/:id} : delete the "id" problemaJuridico.
     *
     * @param id the id of the problemaJuridico to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/problema-juridicos/{id}")
    public ResponseEntity<Void> deleteProblemaJuridico(@PathVariable Long id) {
        log.debug("REST request to delete ProblemaJuridico : {}", id);
        problemaJuridicoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
