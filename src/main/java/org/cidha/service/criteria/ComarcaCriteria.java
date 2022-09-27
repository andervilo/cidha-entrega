package org.cidha.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.BigDecimalFilter;
import tech.jhipster.service.filter.BooleanFilter;
import tech.jhipster.service.filter.DoubleFilter;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.FloatFilter;
import tech.jhipster.service.filter.IntegerFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link org.cidha.domain.Comarca} entity. This class is used
 * in {@link org.cidha.web.rest.ComarcaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /comarcas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class ComarcaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter nome;

    private BigDecimalFilter codigoCnj;

    private LongFilter processoId;

    private Boolean distinct;

    public ComarcaCriteria() {}

    public ComarcaCriteria(ComarcaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.nome = other.nome == null ? null : other.nome.copy();
        this.codigoCnj = other.codigoCnj == null ? null : other.codigoCnj.copy();
        this.processoId = other.processoId == null ? null : other.processoId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public ComarcaCriteria copy() {
        return new ComarcaCriteria(this);
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

    public BigDecimalFilter getCodigoCnj() {
        return codigoCnj;
    }

    public BigDecimalFilter codigoCnj() {
        if (codigoCnj == null) {
            codigoCnj = new BigDecimalFilter();
        }
        return codigoCnj;
    }

    public void setCodigoCnj(BigDecimalFilter codigoCnj) {
        this.codigoCnj = codigoCnj;
    }

    public LongFilter getProcessoId() {
        return processoId;
    }

    public LongFilter processoId() {
        if (processoId == null) {
            processoId = new LongFilter();
        }
        return processoId;
    }

    public void setProcessoId(LongFilter processoId) {
        this.processoId = processoId;
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
        final ComarcaCriteria that = (ComarcaCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(nome, that.nome) &&
            Objects.equals(codigoCnj, that.codigoCnj) &&
            Objects.equals(processoId, that.processoId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nome, codigoCnj, processoId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ComarcaCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (nome != null ? "nome=" + nome + ", " : "") +
            (codigoCnj != null ? "codigoCnj=" + codigoCnj + ", " : "") +
            (processoId != null ? "processoId=" + processoId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
