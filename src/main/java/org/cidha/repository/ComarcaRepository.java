package org.cidha.repository;

import org.cidha.domain.Comarca;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Comarca entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComarcaRepository extends JpaRepository<Comarca, Long>, JpaSpecificationExecutor<Comarca> {}
