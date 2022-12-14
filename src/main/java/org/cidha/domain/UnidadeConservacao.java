package org.cidha.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A UnidadeConservacao.
 */
@Entity
@Table(name = "unidade_conservacao")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class UnidadeConservacao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @ManyToMany(mappedBy = "unidadeConservacaos")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(
        value = {
            "concessaoLiminars",
            "concessaoLiminarCassadas",
            "embargoDeclaracaos",
            "embargoDeclaracaoAgravos",
            "embargoRecursoEspecials",
            "embargoRespRes",
            "tipoDecisao",
            "tipoEmpreendimento",
            "secaoJudiciaria",
            "comarcas",
            "municipios",
            "territorios",
            "atividadeExploracaoIlegals",
            "unidadeConservacaos",
            "envolvidosConflitoLitigios",
            "terraIndigenas",
            "processoConflitos",
            "parteInteresssadas",
            "relators",
            "quilombos",
            "problemaJuridicos",
        },
        allowSetters = true
    )
    private Set<Processo> processos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public UnidadeConservacao id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public UnidadeConservacao descricao(String descricao) {
        this.setDescricao(descricao);
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<Processo> getProcessos() {
        return this.processos;
    }

    public void setProcessos(Set<Processo> processos) {
        if (this.processos != null) {
            this.processos.forEach(i -> i.removeUnidadeConservacao(this));
        }
        if (processos != null) {
            processos.forEach(i -> i.addUnidadeConservacao(this));
        }
        this.processos = processos;
    }

    public UnidadeConservacao processos(Set<Processo> processos) {
        this.setProcessos(processos);
        return this;
    }

    public UnidadeConservacao addProcesso(Processo processo) {
        this.processos.add(processo);
        processo.getUnidadeConservacaos().add(this);
        return this;
    }

    public UnidadeConservacao removeProcesso(Processo processo) {
        this.processos.remove(processo);
        processo.getUnidadeConservacaos().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UnidadeConservacao)) {
            return false;
        }
        return id != null && id.equals(((UnidadeConservacao) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UnidadeConservacao{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
