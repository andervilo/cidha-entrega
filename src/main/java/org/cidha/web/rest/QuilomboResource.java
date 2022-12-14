package org.cidha.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.cidha.domain.Quilombo;
import org.cidha.repository.QuilomboRepository;
import org.cidha.service.QuilomboQueryService;
import org.cidha.service.QuilomboService;
import org.cidha.service.criteria.QuilomboCriteria;
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
 * REST controller for managing {@link org.cidha.domain.Quilombo}.
 */
@RestController
@RequestMapping("/api")
public class QuilomboResource {

    private final Logger log = LoggerFactory.getLogger(QuilomboResource.class);

    private static final String ENTITY_NAME = "quilombo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final QuilomboService quilomboService;

    private final QuilomboRepository quilomboRepository;

    private final QuilomboQueryService quilomboQueryService;

    public QuilomboResource(
        QuilomboService quilomboService,
        QuilomboRepository quilomboRepository,
        QuilomboQueryService quilomboQueryService
    ) {
        this.quilomboService = quilomboService;
        this.quilomboRepository = quilomboRepository;
        this.quilomboQueryService = quilomboQueryService;
    }

    /**
     * {@code POST  /quilombos} : Create a new quilombo.
     *
     * @param quilombo the quilombo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new quilombo, or with status {@code 400 (Bad Request)} if the quilombo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/quilombos")
    public ResponseEntity<Quilombo> createQuilombo(@RequestBody Quilombo quilombo) throws URISyntaxException {
        log.debug("REST request to save Quilombo : {}", quilombo);
        if (quilombo.getId() != null) {
            throw new BadRequestAlertException("A new quilombo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Quilombo result = quilomboService.save(quilombo);
        return ResponseEntity
            .created(new URI("/api/quilombos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /quilombos/:id} : Updates an existing quilombo.
     *
     * @param id the id of the quilombo to save.
     * @param quilombo the quilombo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated quilombo,
     * or with status {@code 400 (Bad Request)} if the quilombo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the quilombo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/quilombos/{id}")
    public ResponseEntity<Quilombo> updateQuilombo(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Quilombo quilombo
    ) throws URISyntaxException {
        log.debug("REST request to update Quilombo : {}, {}", id, quilombo);
        if (quilombo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, quilombo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!quilomboRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Quilombo result = quilomboService.update(quilombo);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, quilombo.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /quilombos/:id} : Partial updates given fields of an existing quilombo, field will ignore if it is null
     *
     * @param id the id of the quilombo to save.
     * @param quilombo the quilombo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated quilombo,
     * or with status {@code 400 (Bad Request)} if the quilombo is not valid,
     * or with status {@code 404 (Not Found)} if the quilombo is not found,
     * or with status {@code 500 (Internal Server Error)} if the quilombo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/quilombos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Quilombo> partialUpdateQuilombo(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Quilombo quilombo
    ) throws URISyntaxException {
        log.debug("REST request to partial update Quilombo partially : {}, {}", id, quilombo);
        if (quilombo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, quilombo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!quilomboRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Quilombo> result = quilomboService.partialUpdate(quilombo);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, quilombo.getId().toString())
        );
    }

    /**
     * {@code GET  /quilombos} : get all the quilombos.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of quilombos in body.
     */
    @GetMapping("/quilombos")
    public ResponseEntity<List<Quilombo>> getAllQuilombos(
        QuilomboCriteria criteria,
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get Quilombos by criteria: {}", criteria);
        Page<Quilombo> page = quilomboQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /quilombos/count} : count all the quilombos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/quilombos/count")
    public ResponseEntity<Long> countQuilombos(QuilomboCriteria criteria) {
        log.debug("REST request to count Quilombos by criteria: {}", criteria);
        return ResponseEntity.ok().body(quilomboQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /quilombos/:id} : get the "id" quilombo.
     *
     * @param id the id of the quilombo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the quilombo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/quilombos/{id}")
    public ResponseEntity<Quilombo> getQuilombo(@PathVariable Long id) {
        log.debug("REST request to get Quilombo : {}", id);
        Optional<Quilombo> quilombo = quilomboService.findOne(id);
        return ResponseUtil.wrapOrNotFound(quilombo);
    }

    /**
     * {@code DELETE  /quilombos/:id} : delete the "id" quilombo.
     *
     * @param id the id of the quilombo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/quilombos/{id}")
    public ResponseEntity<Void> deleteQuilombo(@PathVariable Long id) {
        log.debug("REST request to delete Quilombo : {}", id);
        quilomboService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
