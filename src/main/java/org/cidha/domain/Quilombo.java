package org.cidha.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.cidha.domain.enumeration.TipoQuilombo;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Quilombo.
 */
@Entity
@Table(name = "quilombo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Quilombo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_quilombo")
    private TipoQuilombo tipoQuilombo;

    @ManyToMany(mappedBy = "quilombos")
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

    public Quilombo id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public Quilombo nome(String nome) {
        this.setNome(nome);
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public TipoQuilombo getTipoQuilombo() {
        return this.tipoQuilombo;
    }

    public Quilombo tipoQuilombo(TipoQuilombo tipoQuilombo) {
        this.setTipoQuilombo(tipoQuilombo);
        return this;
    }

    public void setTipoQuilombo(TipoQuilombo tipoQuilombo) {
        this.tipoQuilombo = tipoQuilombo;
    }

    public Set<Processo> getProcessos() {
        return this.processos;
    }

    public void setProcessos(Set<Processo> processos) {
        if (this.processos != null) {
            this.processos.forEach(i -> i.removeQuilombo(this));
        }
        if (processos != null) {
            processos.forEach(i -> i.addQuilombo(this));
        }
        this.processos = processos;
    }

    public Quilombo processos(Set<Processo> processos) {
        this.setProcessos(processos);
        return this;
    }

    public Quilombo addProcesso(Processo processo) {
        this.processos.add(processo);
        processo.getQuilombos().add(this);
        return this;
    }

    public Quilombo removeProcesso(Processo processo) {
        this.processos.remove(processo);
        processo.getQuilombos().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Quilombo)) {
            return false;
        }
        return id != null && id.equals(((Quilombo) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Quilombo{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", tipoQuilombo='" + getTipoQuilombo() + "'" +
            "}";
    }
}
