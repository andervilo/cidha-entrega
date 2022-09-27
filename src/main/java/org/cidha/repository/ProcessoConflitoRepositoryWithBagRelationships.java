package org.cidha.repository;

import java.util.List;
import java.util.Optional;
import org.cidha.domain.ProcessoConflito;
import org.springframework.data.domain.Page;

public interface ProcessoConflitoRepositoryWithBagRelationships {
    Optional<ProcessoConflito> fetchBagRelationships(Optional<ProcessoConflito> processoConflito);

    List<ProcessoConflito> fetchBagRelationships(List<ProcessoConflito> processoConflitos);

    Page<ProcessoConflito> fetchBagRelationships(Page<ProcessoConflito> processoConflitos);
}
