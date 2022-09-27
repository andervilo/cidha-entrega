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
 * Criteria class for the {@link org.cidha.domain.EtniaIndigena} entity. This class is used
 * in {@link org.cidha.web.rest.EtniaIndigenaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /etnia-indigenas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class EtniaIndigenaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter nome;

    private LongFilter terraIndigenaId;

    private Boolean distinct;

    public EtniaIndigenaCriteria() {}

    public EtniaIndigenaCriteria(EtniaIndigenaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.nome = other.nome == null ? null : other.nome.copy();
        this.terraIndigenaId = other.terraIndigenaId == null ? null : other.terraIndigenaId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public EtniaIndigenaCriteria copy() {
        return new EtniaIndigenaCriteria(this);
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

    public StringFilter getNome() {
        return nome;
    }

    public StringFilter nome() {
        if (nome == null) {
            nome = new StringFilter();
        }
        return nome;
    }

    public void setNome(StringFilter nome) {
        this.nome = nome;
    }

    public LongFilter getTerraIndigenaId() {
        return terraIndigenaId;
    }

    public LongFilter terraIndigenaId() {
        if (terraIndigenaId == null) {
            terraIndigenaId = new LongFilter();
        }
        return terraIndigenaId;
    }

    public void setTerraIndigenaId(LongFilter terraIndigenaId) {
        this.terraIndigenaId = terraIndigenaId;
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
        final EtniaIndigenaCriteria that = (EtniaIndigenaCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(nome, that.nome) &&
            Objects.equals(terraIndigenaId, that.terraIndigenaId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nome, terraIndigenaId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EtniaIndigenaCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (nome != null ? "nome=" + nome + ", " : "") +
            (terraIndigenaId != null ? "terraIndigenaId=" + terraIndigenaId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
