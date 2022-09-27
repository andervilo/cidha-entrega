package org.cidha.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.BooleanFilter;
import tech.jhipster.service.filter.DoubleFilter;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.FloatFilter;
import tech.jhipster.service.filter.IntegerFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link org.cidha.domain.Conflito} entity. This class is used
 * in {@link org.cidha.web.rest.ConflitoResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /conflitos?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class ConflitoCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private LongFilter processoConflitoId;

    private Boolean distinct;

    public ConflitoCriteria() {}

    public ConflitoCriteria(ConflitoCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.processoConflitoId = other.processoConflitoId == null ? null : other.processoConflitoId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public ConflitoCriteria copy() {
        return new ConflitoCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public LongFilter id() {
        if (id == null) {
            id = new LongFilter();
        }
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public LongFilter getProcessoConflitoId() {
        return processoConflitoId;
    }

    public LongFilter processoConflitoId() {
        if (processoConflitoId == null) {
            processoConflitoId = new LongFilter();
        }
        return processoConflitoId;
    }

    public void setProcessoConflitoId(LongFilter processoConflitoId) {
        this.processoConflitoId = processoConflitoId;
    }

    public Boolean getDistinct() {
        return distinct;
    }

    public void setDistinct(Boolean distinct) {
        this.distinct = distinct;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final ConflitoCriteria that = (ConflitoCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(processoConflitoId, that.processoConflitoId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, processoConflitoId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ConflitoCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (processoConflitoId != null ? "processoConflitoId=" + processoConflitoId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
