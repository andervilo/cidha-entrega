package org.cidha.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.cidha.domain.Comarca;
import org.cidha.repository.ComarcaRepository;
import org.cidha.service.ComarcaQueryService;
import org.cidha.service.ComarcaService;
import org.cidha.service.criteria.ComarcaCriteria;
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
 * REST controller for managing {@link org.cidha.domain.Comarca}.
 */
@RestController
@RequestMapping("/api")
public class ComarcaResource {

    private final Logger log = LoggerFactory.getLogger(ComarcaResource.class);

    private static final String ENTITY_NAME = "comarca";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ComarcaService comarcaService;

    private final ComarcaRepository comarcaRepository;

    private final ComarcaQueryService comarcaQueryService;

    public ComarcaResource(ComarcaService comarcaService, ComarcaRepository comarcaRepository, ComarcaQueryService comarcaQueryService) {
        this.comarcaService = comarcaService;
        this.comarcaRepository = comarcaRepository;
        this.comarcaQueryService = comarcaQueryService;
    }

    /**
     * {@code POST  /comarcas} : Create a new comarca.
     *
     * @param comarca the comarca to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new comarca, or with status {@code 400 (Bad Request)} if the comarca has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/comarcas")
    public ResponseEntity<Comarca> createComarca(@RequestBody Comarca comarca) throws URISyntaxException {
        log.debug("REST request to save Comarca : {}", comarca);
        if (comarca.getId() != null) {
            throw new BadRequestAlertException("A new comarca cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Comarca result = comarcaService.save(comarca);
        return ResponseEntity
            .created(new URI("/api/comarcas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /comarcas/:id} : Updates an existing comarca.
     *
     * @param id the id of the comarca to save.
     * @param comarca the comarca to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated comarca,
     * or with status {@code 400 (Bad Request)} if the comarca is not valid,
     * or with status {@code 500 (Internal Server Error)} if the comarca couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/comarcas/{id}")
    public ResponseEntity<Comarca> updateComarca(@PathVariable(value = "id", required = false) final Long id, @RequestBody Comarca comarca)
        throws URISyntaxException {
        log.debug("REST request to update Comarca : {}, {}", id, comarca);
        if (comarca.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, comarca.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!comarcaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Comarca result = comarcaService.update(comarca);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, comarca.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /comarcas/:id} : Partial updates given fields of an existing comarca, field will ignore if it is null
     *
     * @param id the id of the comarca to save.
     * @param comarca the comarca to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated comarca,
     * or with status {@code 400 (Bad Request)} if the comarca is not valid,
     * or with status {@code 404 (Not Found)} if the comarca is not found,
     * or with status {@code 500 (Internal Server Error)} if the comarca couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/comarcas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Comarca> partialUpdateComarca(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Comarca comarca
    ) throws URISyntaxException {
        log.debug("REST request to partial update Comarca partially : {}, {}", id, comarca);
        if (comarca.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, comarca.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!comarcaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Comarca> result = comarcaService.partialUpdate(comarca);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, comarca.getId().toString())
        );
    }

    /**
     * {@code GET  /comarcas} : get all the comarcas.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of comarcas in body.
     */
    @GetMapping("/comarcas")
    public ResponseEntity<List<Comarca>> getAllComarcas(
        ComarcaCriteria criteria,
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get Comarcas by criteria: {}", criteria);
        Page<Comarca> page = comarcaQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /comarcas/count} : count all the comarcas.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/comarcas/count")
    public ResponseEntity<Long> countComarcas(ComarcaCriteria criteria) {
        log.debug("REST request to count Comarcas by criteria: {}", criteria);
        return ResponseEntity.ok().body(comarcaQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /comarcas/:id} : get the "id" comarca.
     *
     * @param id the id of the comarca to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the comarca, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/comarcas/{id}")
    public ResponseEntity<Comarca> getComarca(@PathVariable Long id) {
        log.debug("REST request to get Comarca : {}", id);
        Optional<Comarca> comarca = comarcaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(comarca);
    }

    /**
     * {@code DELETE  /comarcas/:id} : delete the "id" comarca.
     *
     * @param id the id of the comarca to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/comarcas/{id}")
    public ResponseEntity<Void> deleteComarca(@PathVariable Long id) {
        log.debug("REST request to delete Comarca : {}", id);
        comarcaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
