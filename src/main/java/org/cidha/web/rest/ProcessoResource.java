package org.cidha.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.cidha.domain.Processo;
import org.cidha.repository.ProcessoRepository;
import org.cidha.service.ProcessoQueryService;
import org.cidha.service.ProcessoService;
import org.cidha.service.criteria.ProcessoCriteria;
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
 * REST controller for managing {@link org.cidha.domain.Processo}.
 */
@RestController
@RequestMapping("/api")
public class ProcessoResource {

    private final Logger log = LoggerFactory.getLogger(ProcessoResource.class);

    private static final String ENTITY_NAME = "processo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProcessoService processoService;

    private final ProcessoRepository processoRepository;

    private final ProcessoQueryService processoQueryService;

    public ProcessoResource(
        ProcessoService processoService,
        ProcessoRepository processoRepository,
        ProcessoQueryService processoQueryService
    ) {
        this.processoService = processoService;
        this.processoRepository = processoRepository;
        this.processoQueryService = processoQueryService;
    }

    /**
     * {@code POST  /processos} : Create a new processo.
     *
     * @param processo the processo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new processo, or with status {@code 400 (Bad Request)} if the processo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/processos")
    public ResponseEntity<Processo> createProcesso(@RequestBody Processo processo) throws URISyntaxException {
        log.debug("REST request to save Processo : {}", processo);
        if (processo.getId() != null) {
            throw new BadRequestAlertException("A new processo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Processo result = processoService.save(processo);
        return ResponseEntity
            .created(new URI("/api/processos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /processos/:id} : Updates an existing processo.
     *
     * @param id the id of the processo to save.
     * @param processo the processo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated processo,
     * or with status {@code 400 (Bad Request)} if the processo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the processo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/processos/{id}")
    public ResponseEntity<Processo> updateProcesso(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Processo processo
    ) throws URISyntaxException {
        log.debug("REST request to update Processo : {}, {}", id, processo);
        if (processo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, processo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!processoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Processo result = processoService.update(processo);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, processo.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /processos/:id} : Partial updates given fields of an existing processo, field will ignore if it is null
     *
     * @param id the id of the processo to save.
     * @param processo the processo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated processo,
     * or with status {@code 400 (Bad Request)} if the processo is not valid,
     * or with status {@code 404 (Not Found)} if the processo is not found,
     * or with status {@code 500 (Internal Server Error)} if the processo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/processos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Processo> partialUpdateProcesso(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Processo processo
    ) throws URISyntaxException {
        log.debug("REST request to partial update Processo partially : {}, {}", id, processo);
        if (processo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, processo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!processoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Processo> result = processoService.partialUpdate(processo);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, processo.getId().toString())
        );
    }

    /**
     * {@code GET  /processos} : get all the processos.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of processos in body.
     */
    @GetMapping("/processos")
    public ResponseEntity<List<Processo>> getAllProcessos(
        ProcessoCriteria criteria,
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get Processos by criteria: {}", criteria);
        Page<Processo> page = processoQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /processos/count} : count all the processos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/processos/count")
    public ResponseEntity<Long> countProcessos(ProcessoCriteria criteria) {
        log.debug("REST request to count Processos by criteria: {}", criteria);
        return ResponseEntity.ok().body(processoQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /processos/:id} : get the "id" processo.
     *
     * @param id the id of the processo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the processo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/processos/{id}")
    public ResponseEntity<Processo> getProcesso(@PathVariable Long id) {
        log.debug("REST request to get Processo : {}", id);
        Optional<Processo> processo = processoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(processo);
    }

    /**
     * {@code DELETE  /processos/:id} : delete the "id" processo.
     *
     * @param id the id of the processo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/processos/{id}")
    public ResponseEntity<Void> deleteProcesso(@PathVariable Long id) {
        log.debug("REST request to delete Processo : {}", id);
        processoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
