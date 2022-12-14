package org.cidha.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.cidha.domain.TerraIndigena;
import org.cidha.repository.TerraIndigenaRepository;
import org.cidha.service.TerraIndigenaQueryService;
import org.cidha.service.TerraIndigenaService;
import org.cidha.service.criteria.TerraIndigenaCriteria;
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
 * REST controller for managing {@link org.cidha.domain.TerraIndigena}.
 */
@RestController
@RequestMapping("/api")
public class TerraIndigenaResource {

    private final Logger log = LoggerFactory.getLogger(TerraIndigenaResource.class);

    private static final String ENTITY_NAME = "terraIndigena";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TerraIndigenaService terraIndigenaService;

    private final TerraIndigenaRepository terraIndigenaRepository;

    private final TerraIndigenaQueryService terraIndigenaQueryService;

    public TerraIndigenaResource(
        TerraIndigenaService terraIndigenaService,
        TerraIndigenaRepository terraIndigenaRepository,
        TerraIndigenaQueryService terraIndigenaQueryService
    ) {
        this.terraIndigenaService = terraIndigenaService;
        this.terraIndigenaRepository = terraIndigenaRepository;
        this.terraIndigenaQueryService = terraIndigenaQueryService;
    }

    /**
     * {@code POST  /terra-indigenas} : Create a new terraIndigena.
     *
     * @param terraIndigena the terraIndigena to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new terraIndigena, or with status {@code 400 (Bad Request)} if the terraIndigena has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/terra-indigenas")
    public ResponseEntity<TerraIndigena> createTerraIndigena(@RequestBody TerraIndigena terraIndigena) throws URISyntaxException {
        log.debug("REST request to save TerraIndigena : {}", terraIndigena);
        if (terraIndigena.getId() != null) {
            throw new BadRequestAlertException("A new terraIndigena cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TerraIndigena result = terraIndigenaService.save(terraIndigena);
        return ResponseEntity
            .created(new URI("/api/terra-indigenas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /terra-indigenas/:id} : Updates an existing terraIndigena.
     *
     * @param id the id of the terraIndigena to save.
     * @param terraIndigena the terraIndigena to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated terraIndigena,
     * or with status {@code 400 (Bad Request)} if the terraIndigena is not valid,
     * or with status {@code 500 (Internal Server Error)} if the terraIndigena couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/terra-indigenas/{id}")
    public ResponseEntity<TerraIndigena> updateTerraIndigena(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TerraIndigena terraIndigena
    ) throws URISyntaxException {
        log.debug("REST request to update TerraIndigena : {}, {}", id, terraIndigena);
        if (terraIndigena.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, terraIndigena.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!terraIndigenaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TerraIndigena result = terraIndigenaService.update(terraIndigena);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, terraIndigena.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /terra-indigenas/:id} : Partial updates given fields of an existing terraIndigena, field will ignore if it is null
     *
     * @param id the id of the terraIndigena to save.
     * @param terraIndigena the terraIndigena to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated terraIndigena,
     * or with status {@code 400 (Bad Request)} if the terraIndigena is not valid,
     * or with status {@code 404 (Not Found)} if the terraIndigena is not found,
     * or with status {@code 500 (Internal Server Error)} if the terraIndigena couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/terra-indigenas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TerraIndigena> partialUpdateTerraIndigena(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TerraIndigena terraIndigena
    ) throws URISyntaxException {
        log.debug("REST request to partial update TerraIndigena partially : {}, {}", id, terraIndigena);
        if (terraIndigena.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, terraIndigena.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!terraIndigenaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TerraIndigena> result = terraIndigenaService.partialUpdate(terraIndigena);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, terraIndigena.getId().toString())
        );
    }

    /**
     * {@code GET  /terra-indigenas} : get all the terraIndigenas.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of terraIndigenas in body.
     */
    @GetMapping("/terra-indigenas")
    public ResponseEntity<List<TerraIndigena>> getAllTerraIndigenas(
        TerraIndigenaCriteria criteria,
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get TerraIndigenas by criteria: {}", criteria);
        Page<TerraIndigena> page = terraIndigenaQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /terra-indigenas/count} : count all the terraIndigenas.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/terra-indigenas/count")
    public ResponseEntity<Long> countTerraIndigenas(TerraIndigenaCriteria criteria) {
        log.debug("REST request to count TerraIndigenas by criteria: {}", criteria);
        return ResponseEntity.ok().body(terraIndigenaQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /terra-indigenas/:id} : get the "id" terraIndigena.
     *
     * @param id the id of the terraIndigena to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the terraIndigena, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/terra-indigenas/{id}")
    public ResponseEntity<TerraIndigena> getTerraIndigena(@PathVariable Long id) {
        log.debug("REST request to get TerraIndigena : {}", id);
        Optional<TerraIndigena> terraIndigena = terraIndigenaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(terraIndigena);
    }

    /**
     * {@code DELETE  /terra-indigenas/:id} : delete the "id" terraIndigena.
     *
     * @param id the id of the terraIndigena to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/terra-indigenas/{id}")
    public ResponseEntity<Void> deleteTerraIndigena(@PathVariable Long id) {
        log.debug("REST request to delete TerraIndigena : {}", id);
        terraIndigenaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
