package org.cidha.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

/**
 * A Direito.
 */
@Entity
@Table(name = "direito")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Direito implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "descricao")
    private String descricao;

    @ManyToMany(mappedBy = "direitos")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "conflitos", "direitos", "processos" }, allowSetters = true)
    private Set<ProcessoConflito> processoConflitos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Direito id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public Direito descricao(String descricao) {
        this.setDescricao(descricao);
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<ProcessoConflito> getProcessoConflitos() {
        return this.processoConflitos;
    }

    public void setProcessoConflitos(Set<ProcessoConflito> processoConflitos) {
        if (this.processoConflitos != null) {
            this.processoConflitos.forEach(i -> i.removeDireito(this));
        }
        if (processoConflitos != null) {
            processoConflitos.forEach(i -> i.addDireito(this));
        }
        this.processoConflitos = processoConflitos;
    }

    public Direito processoConflitos(Set<ProcessoConflito> processoConflitos) {
        this.setProcessoConflitos(processoConflitos);
        return this;
    }

    public Direito addProcessoConflito(ProcessoConflito processoConflito) {
        this.processoConflitos.add(processoConflito);
        processoConflito.getDireitos().add(this);
        return this;
    }

    public Direito removeProcessoConflito(ProcessoConflito processoConflito) {
        this.processoConflitos.remove(processoConflito);
        processoConflito.getDireitos().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Direito)) {
            return false;
        }
        return id != null && id.equals(((Direito) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Direito{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
