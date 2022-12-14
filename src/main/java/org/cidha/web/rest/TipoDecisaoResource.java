package org.cidha.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.cidha.domain.TipoDecisao;
import org.cidha.repository.TipoDecisaoRepository;
import org.cidha.service.TipoDecisaoQueryService;
import org.cidha.service.TipoDecisaoService;
import org.cidha.service.criteria.TipoDecisaoCriteria;
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
 * REST controller for managing {@link org.cidha.domain.TipoDecisao}.
 */
@RestController
@RequestMapping("/api")
public class TipoDecisaoResource {

    private final Logger log = LoggerFactory.getLogger(TipoDecisaoResource.class);

    private static final String ENTITY_NAME = "tipoDecisao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoDecisaoService tipoDecisaoService;

    private final TipoDecisaoRepository tipoDecisaoRepository;

    private final TipoDecisaoQueryService tipoDecisaoQueryService;

    public TipoDecisaoResource(
        TipoDecisaoService tipoDecisaoService,
        TipoDecisaoRepository tipoDecisaoRepository,
        TipoDecisaoQueryService tipoDecisaoQueryService
    ) {
        this.tipoDecisaoService = tipoDecisaoService;
        this.tipoDecisaoRepository = tipoDecisaoRepository;
        this.tipoDecisaoQueryService = tipoDecisaoQueryService;
    }

    /**
     * {@code POST  /tipo-decisaos} : Create a new tipoDecisao.
     *
     * @param tipoDecisao the tipoDecisao to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoDecisao, or with status {@code 400 (Bad Request)} if the tipoDecisao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-decisaos")
    public ResponseEntity<TipoDecisao> createTipoDecisao(@RequestBody TipoDecisao tipoDecisao) throws URISyntaxException {
        log.debug("REST request to save TipoDecisao : {}", tipoDecisao);
        if (tipoDecisao.getId() != null) {
            throw new BadRequestAlertException("A new tipoDecisao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoDecisao result = tipoDecisaoService.save(tipoDecisao);
        return ResponseEntity
            .created(new URI("/api/tipo-decisaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-decisaos/:id} : Updates an existing tipoDecisao.
     *
     * @param id the id of the tipoDecisao to save.
     * @param tipoDecisao the tipoDecisao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoDecisao,
     * or with status {@code 400 (Bad Request)} if the tipoDecisao is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoDecisao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-decisaos/{id}")
    public ResponseEntity<TipoDecisao> updateTipoDecisao(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TipoDecisao tipoDecisao
    ) throws URISyntaxException {
        log.debug("REST request to update TipoDecisao : {}, {}", id, tipoDecisao);
        if (tipoDecisao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoDecisao.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoDecisaoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TipoDecisao result = tipoDecisaoService.update(tipoDecisao);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tipoDecisao.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /tipo-decisaos/:id} : Partial updates given fields of an existing tipoDecisao, field will ignore if it is null
     *
     * @param id the id of the tipoDecisao to save.
     * @param tipoDecisao the tipoDecisao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoDecisao,
     * or with status {@code 400 (Bad Request)} if the tipoDecisao is not valid,
     * or with status {@code 404 (Not Found)} if the tipoDecisao is not found,
     * or with status {@code 500 (Internal Server Error)} if the tipoDecisao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/tipo-decisaos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TipoDecisao> partialUpdateTipoDecisao(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TipoDecisao tipoDecisao
    ) throws URISyntaxException {
        log.debug("REST request to partial update TipoDecisao partially : {}, {}", id, tipoDecisao);
        if (tipoDecisao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoDecisao.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoDecisaoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TipoDecisao> result = tipoDecisaoService.partialUpdate(tipoDecisao);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tipoDecisao.getId().toString())
        );
    }

    /**
     * {@code GET  /tipo-decisaos} : get all the tipoDecisaos.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoDecisaos in body.
     */
    @GetMapping("/tipo-decisaos")
    public ResponseEntity<List<TipoDecisao>> getAllTipoDecisaos(
        TipoDecisaoCriteria criteria,
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get TipoDecisaos by criteria: {}", criteria);
        Page<TipoDecisao> page = tipoDecisaoQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /tipo-decisaos/count} : count all the tipoDecisaos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/tipo-decisaos/count")
    public ResponseEntity<Long> countTipoDecisaos(TipoDecisaoCriteria criteria) {
        log.debug("REST request to count TipoDecisaos by criteria: {}", criteria);
        return ResponseEntity.ok().body(tipoDecisaoQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /tipo-decisaos/:id} : get the "id" tipoDecisao.
     *
     * @param id the id of the tipoDecisao to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoDecisao, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-decisaos/{id}")
    public ResponseEntity<TipoDecisao> getTipoDecisao(@PathVariable Long id) {
        log.debug("REST request to get TipoDecisao : {}", id);
        Optional<TipoDecisao> tipoDecisao = tipoDecisaoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoDecisao);
    }

    /**
     * {@code DELETE  /tipo-decisaos/:id} : delete the "id" tipoDecisao.
     *
     * @param id the id of the tipoDecisao to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-decisaos/{id}")
    public ResponseEntity<Void> deleteTipoDecisao(@PathVariable Long id) {
        log.debug("REST request to delete TipoDecisao : {}", id);
        tipoDecisaoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
