package org.cidha.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.cidha.domain.Data;
import org.cidha.repository.DataRepository;
import org.cidha.service.DataQueryService;
import org.cidha.service.DataService;
import org.cidha.service.criteria.DataCriteria;
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
 * REST controller for managing {@link org.cidha.domain.Data}.
 */
@RestController
@RequestMapping("/api")
public class DataResource {

    private final Logger log = LoggerFactory.getLogger(DataResource.class);

    private static final String ENTITY_NAME = "data";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DataService dataService;

    private final DataRepository dataRepository;

    private final DataQueryService dataQueryService;

    public DataResource(DataService dataService, DataRepository dataRepository, DataQueryService dataQueryService) {
        this.dataService = dataService;
        this.dataRepository = dataRepository;
        this.dataQueryService = dataQueryService;
    }

    /**
     * {@code POST  /data} : Create a new data.
     *
     * @param data the data to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new data, or with status {@code 400 (Bad Request)} if the data has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/data")
    public ResponseEntity<Data> createData(@RequestBody Data data) throws URISyntaxException {
        log.debug("REST request to save Data : {}", data);
        if (data.getId() != null) {
            throw new BadRequestAlertException("A new data cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Data result = dataService.save(data);
        return ResponseEntity
            .created(new URI("/api/data/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /data/:id} : Updates an existing data.
     *
     * @param id the id of the data to save.
     * @param data the data to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated data,
     * or with status {@code 400 (Bad Request)} if the data is not valid,
     * or with status {@code 500 (Internal Server Error)} if the data couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/data/{id}")
    public ResponseEntity<Data> updateData(@PathVariable(value = "id", required = false) final Long id, @RequestBody Data data)
        throws URISyntaxException {
        log.debug("REST request to update Data : {}, {}", id, data);
        if (data.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, data.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dataRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Data result = dataService.update(data);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, data.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /data/:id} : Partial updates given fields of an existing data, field will ignore if it is null
     *
     * @param id the id of the data to save.
     * @param data the data to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated data,
     * or with status {@code 400 (Bad Request)} if the data is not valid,
     * or with status {@code 404 (Not Found)} if the data is not found,
     * or with status {@code 500 (Internal Server Error)} if the data couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/data/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Data> partialUpdateData(@PathVariable(value = "id", required = false) final Long id, @RequestBody Data data)
        throws URISyntaxException {
        log.debug("REST request to partial update Data partially : {}, {}", id, data);
        if (data.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, data.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dataRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Data> result = dataService.partialUpdate(data);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, data.getId().toString())
        );
    }

    /**
     * {@code GET  /data} : get all the data.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of data in body.
     */
    @GetMapping("/data")
    public ResponseEntity<List<Data>> getAllData(DataCriteria criteria, @org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get Data by criteria: {}", criteria);
        Page<Data> page = dataQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /data/count} : count all the data.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/data/count")
    public ResponseEntity<Long> countData(DataCriteria criteria) {
        log.debug("REST request to count Data by criteria: {}", criteria);
        return ResponseEntity.ok().body(dataQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /data/:id} : get the "id" data.
     *
     * @param id the id of the data to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the data, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/data/{id}")
    public ResponseEntity<Data> getData(@PathVariable Long id) {
        log.debug("REST request to get Data : {}", id);
        Optional<Data> data = dataService.findOne(id);
        return ResponseUtil.wrapOrNotFound(data);
    }

    /**
     * {@code DELETE  /data/:id} : delete the "id" data.
     *
     * @param id the id of the data to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/data/{id}")
    public ResponseEntity<Void> deleteData(@PathVariable Long id) {
        log.debug("REST request to delete Data : {}", id);
        dataService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
