package org.cidha.repository;

import java.util.List;
import java.util.Optional;
import org.cidha.domain.ParteInteresssada;
import org.springframework.data.domain.Page;

public interface ParteInteresssadaRepositoryWithBagRelationships {
    Optional<ParteInteresssada> fetchBagRelationships(Optional<ParteInteresssada> parteInteresssada);

    List<ParteInteresssada> fetchBagRelationships(List<ParteInteresssada> parteInteresssadas);

    Page<ParteInteresssada> fetchBagRelationships(Page<ParteInteresssada> parteInteresssadas);
}
