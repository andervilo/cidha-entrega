package org.cidha.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import org.cidha.domain.enumeration.TipoQuilombo;
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
 * Criteria class for the {@link org.cidha.domain.Quilombo} entity. This class is used
 * in {@link org.cidha.web.rest.QuilomboResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /quilombos?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class QuilomboCriteria implements Serializable, Criteria {

    /**
     * Class for filtering TipoQuilombo
     */
    public static class TipoQuilomboFilter extends Filter<TipoQuilombo> {

        public TipoQuilomboFilter() {}

        public TipoQuilomboFilter(TipoQuilomboFilter filter) {
            super(filter);
        }

        @Override
        public TipoQuilomboFilter copy() {
            return new TipoQuilomboFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter nome;

    private TipoQuilomboFilter tipoQuilombo;

    private LongFilter processoId;

    private Boolean distinct;

    public QuilomboCriteria() {}

    public QuilomboCriteria(QuilomboCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.nome = other.nome == null ? null : other.nome.copy();
        this.tipoQuilombo = other.tipoQuilombo == null ? null : other.tipoQuilombo.copy();
        this.processoId = other.processoId == null ? null : other.processoId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public QuilomboCriteria copy() {
        return new QuilomboCriteria(this);
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

    public TipoQuilomboFilter getTipoQuilombo() {
        return tipoQuilombo;
    }

    public TipoQuilomboFilter tipoQuilombo() {
        if (tipoQuilombo == null) {
            tipoQuilombo = new TipoQuilomboFilter();
        }
        return tipoQuilombo;
    }

    public void setTipoQuilombo(TipoQuilomboFilter tipoQuilombo) {
        this.tipoQuilombo = tipoQuilombo;
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
        final QuilomboCriteria that = (QuilomboCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(nome, that.nome) &&
            Objects.equals(tipoQuilombo, that.tipoQuilombo) &&
            Objects.equals(processoId, that.processoId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nome, tipoQuilombo, processoId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "QuilomboCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (nome != null ? "nome=" + nome + ", " : "") +
            (tipoQuilombo != null ? "tipoQuilombo=" + tipoQuilombo + ", " : "") +
            (processoId != null ? "processoId=" + processoId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
