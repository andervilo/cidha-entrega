package org.cidha.repository;

import java.util.List;
import java.util.Optional;
import org.cidha.domain.TerraIndigena;
import org.springframework.data.domain.Page;

public interface TerraIndigenaRepositoryWithBagRelationships {
    Optional<TerraIndigena> fetchBagRelationships(Optional<TerraIndigena> terraIndigena);

    List<TerraIndigena> fetchBagRelationships(List<TerraIndigena> terraIndigenas);

    Page<TerraIndigena> fetchBagRelationships(Page<TerraIndigena> terraIndigenas);
}
