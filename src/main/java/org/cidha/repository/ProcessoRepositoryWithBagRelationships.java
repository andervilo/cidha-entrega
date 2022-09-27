package org.cidha.repository;

import java.util.List;
import java.util.Optional;
import org.cidha.domain.Processo;
import org.springframework.data.domain.Page;

public interface ProcessoRepositoryWithBagRelationships {
    Optional<Processo> fetchBagRelationships(Optional<Processo> processo);

    List<Processo> fetchBagRelationships(List<Processo> processos);

    Page<Processo> fetchBagRelationships(Page<Processo> processos);
}
