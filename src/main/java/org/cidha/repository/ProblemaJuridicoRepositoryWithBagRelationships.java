package org.cidha.repository;

import java.util.List;
import java.util.Optional;
import org.cidha.domain.ProblemaJuridico;
import org.springframework.data.domain.Page;

public interface ProblemaJuridicoRepositoryWithBagRelationships {
    Optional<ProblemaJuridico> fetchBagRelationships(Optional<ProblemaJuridico> problemaJuridico);

    List<ProblemaJuridico> fetchBagRelationships(List<ProblemaJuridico> problemaJuridicos);

    Page<ProblemaJuridico> fetchBagRelationships(Page<ProblemaJuridico> problemaJuridicos);
}
