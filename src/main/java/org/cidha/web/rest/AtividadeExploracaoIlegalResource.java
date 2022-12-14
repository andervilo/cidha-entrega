package org.cidha.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.cidha.domain.AtividadeExploracaoIlegal;
import org.cidha.repository.AtividadeExploracaoIlegalRepository;
import org.cidha.service.AtividadeExploracaoIlegalQueryService;
import org.cidha.service.AtividadeExploracaoIlegalService;
import org.cidha.service.criteria.AtividadeExploracaoIlegalCriteria;
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
 * REST controller for managing {@link org.cidha.domain.AtividadeExploracaoIlegal}.
 */
@RestController
@RequestMapping("/api")
public class AtividadeExploracaoIlegalResource {

    private final Logger log = LoggerFactory.getLogger(AtividadeExploracaoIlegalResource.class);

    private static final String ENTITY_NAME = "atividadeExploracaoIlegal";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AtividadeExploracaoIlegalService atividadeExploracaoIlegalService;

    private final AtividadeExploracaoIlegalRepository atividadeExploracaoIlegalRepository;

    private final AtividadeExploracaoIlegalQueryService atividadeExploracaoIlegalQueryService;

    public AtividadeExploracaoIlegalResource(
        AtividadeExploracaoIlegalService atividadeExploracaoIlegalService,
        AtividadeExploracaoIlegalRepository atividadeExploracaoIlegalRepository,
        AtividadeExploracaoIlegalQueryService atividadeExploracaoIlegalQueryService
    ) {
        this.atividadeExploracaoIlegalService = atividadeExploracaoIlegalService;
        this.atividadeExploracaoIlegalRepository = atividadeExploracaoIlegalRepository;
        this.atividadeExploracaoIlegalQueryService = atividadeExploracaoIlegalQueryService;
    }

    /**
     * {@code POST  /atividade-exploracao-ilegals} : Create a new atividadeExploracaoIlegal.
     *
     * @param atividadeExploracaoIlegal the atividadeExploracaoIlegal to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new atividadeExploracaoIlegal, or with status {@code 400 (Bad Request)} if the atividadeExploracaoIlegal has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/atividade-exploracao-ilegals")
    public ResponseEntity<AtividadeExploracaoIlegal> createAtividadeExploracaoIlegal(
        @RequestBody AtividadeExploracaoIlegal atividadeExploracaoIlegal
    ) throws URISyntaxException {
        log.debug("REST request to save AtividadeExploracaoIlegal : {}", atividadeExploracaoIlegal);
        if (atividadeExploracaoIlegal.getId() != null) {
            throw new BadRequestAlertException("A new atividadeExploracaoIlegal cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AtividadeExploracaoIlegal result = atividadeExploracaoIlegalService.save(atividadeExploracaoIlegal);
        return ResponseEntity
            .created(new URI("/api/atividade-exploracao-ilegals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /atividade-exploracao-ilegals/:id} : Updates an existing atividadeExploracaoIlegal.
     *
     * @param id the id of the atividadeExploracaoIlegal to save.
     * @param atividadeExploracaoIlegal the atividadeExploracaoIlegal to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated atividadeExploracaoIlegal,
     * or with status {@code 400 (Bad Request)} if the atividadeExploracaoIlegal is not valid,
     * or with status {@code 500 (Internal Server Error)} if the atividadeExploracaoIlegal couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/atividade-exploracao-ilegals/{id}")
    public ResponseEntity<AtividadeExploracaoIlegal> updateAtividadeExploracaoIlegal(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AtividadeExploracaoIlegal atividadeExploracaoIlegal
    ) throws URISyntaxException {
        log.debug("REST request to update AtividadeExploracaoIlegal : {}, {}", id, atividadeExploracaoIlegal);
        if (atividadeExploracaoIlegal.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, atividadeExploracaoIlegal.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!atividadeExploracaoIlegalRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AtividadeExploracaoIlegal result = atividadeExploracaoIlegalService.update(atividadeExploracaoIlegal);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, atividadeExploracaoIlegal.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /atividade-exploracao-ilegals/:id} : Partial updates given fields of an existing atividadeExploracaoIlegal, field will ignore if it is null
     *
     * @param id the id of the atividadeExploracaoIlegal to save.
     * @param atividadeExploracaoIlegal the atividadeExploracaoIlegal to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated atividadeExploracaoIlegal,
     * or with status {@code 400 (Bad Request)} if the atividadeExploracaoIlegal is not valid,
     * or with status {@code 404 (Not Found)} if the atividadeExploracaoIlegal is not found,
     * or with status {@code 500 (Internal Server Error)} if the atividadeExploracaoIlegal couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/atividade-exploracao-ilegals/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AtividadeExploracaoIlegal> partialUpdateAtividadeExploracaoIlegal(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AtividadeExploracaoIlegal atividadeExploracaoIlegal
    ) throws URISyntaxException {
        log.debug("REST request to partial update AtividadeExploracaoIlegal partially : {}, {}", id, atividadeExploracaoIlegal);
        if (atividadeExploracaoIlegal.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, atividadeExploracaoIlegal.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!atividadeExploracaoIlegalRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AtividadeExploracaoIlegal> result = atividadeExploracaoIlegalService.partialUpdate(atividadeExploracaoIlegal);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, atividadeExploracaoIlegal.getId().toString())
        );
    }

    /**
     * {@code GET  /atividade-exploracao-ilegals} : get all the atividadeExploracaoIlegals.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of atividadeExploracaoIlegals in body.
     */
    @GetMapping("/atividade-exploracao-ilegals")
    public ResponseEntity<List<AtividadeExploracaoIlegal>> getAllAtividadeExploracaoIlegals(
        AtividadeExploracaoIlegalCriteria criteria,
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get AtividadeExploracaoIlegals by criteria: {}", criteria);
        Page<AtividadeExploracaoIlegal> page = atividadeExploracaoIlegalQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /atividade-exploracao-ilegals/count} : count all the atividadeExploracaoIlegals.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/atividade-exploracao-ilegals/count")
    public ResponseEntity<Long> countAtividadeExploracaoIlegals(AtividadeExploracaoIlegalCriteria criteria) {
        log.debug("REST request to count AtividadeExploracaoIlegals by criteria: {}", criteria);
        return ResponseEntity.ok().body(atividadeExploracaoIlegalQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /atividade-exploracao-ilegals/:id} : get the "id" atividadeExploracaoIlegal.
     *
     * @param id the id of the atividadeExploracaoIlegal to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the atividadeExploracaoIlegal, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/atividade-exploracao-ilegals/{id}")
    public ResponseEntity<AtividadeExploracaoIlegal> getAtividadeExploracaoIlegal(@PathVariable Long id) {
        log.debug("REST request to get AtividadeExploracaoIlegal : {}", id);
        Optional<AtividadeExploracaoIlegal> atividadeExploracaoIlegal = atividadeExploracaoIlegalService.findOne(id);
        return ResponseUtil.wrapOrNotFound(atividadeExploracaoIlegal);
    }

    /**
     * {@code DELETE  /atividade-exploracao-ilegals/:id} : delete the "id" atividadeExploracaoIlegal.
     *
     * @param id the id of the atividadeExploracaoIlegal to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/atividade-exploracao-ilegals/{id}")
    public ResponseEntity<Void> deleteAtividadeExploracaoIlegal(@PathVariable Long id) {
        log.debug("REST request to delete AtividadeExploracaoIlegal : {}", id);
        atividadeExploracaoIlegalService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
