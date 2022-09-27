package org.cidha.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Relator.
 */
@Entity
@Table(name = "relator")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Relator implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @ManyToMany(mappedBy = "relators")
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

    public Relator id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public Relator nome(String nome) {
        this.setNome(nome);
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Processo> getProcessos() {
        return this.processos;
    }

    public void setProcessos(Set<Processo> processos) {
        if (this.processos != null) {
            this.processos.forEach(i -> i.removeRelator(this));
        }
        if (processos != null) {
            processos.forEach(i -> i.addRelator(this));
        }
        this.processos = processos;
    }

    public Relator processos(Set<Processo> processos) {
        this.setProcessos(processos);
        return this;
    }

    public Relator addProcesso(Processo processo) {
        this.processos.add(processo);
        processo.getRelators().add(this);
        return this;
    }

    public Relator removeProcesso(Processo processo) {
        this.processos.remove(processo);
        processo.getRelators().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Relator)) {
            return false;
        }
        return id != null && id.equals(((Relator) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Relator{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
