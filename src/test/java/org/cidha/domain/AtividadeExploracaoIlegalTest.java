package org.cidha.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.cidha.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AtividadeExploracaoIlegalTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AtividadeExploracaoIlegal.class);
        AtividadeExploracaoIlegal atividadeExploracaoIlegal1 = new AtividadeExploracaoIlegal();
        atividadeExploracaoIlegal1.setId(1L);
        AtividadeExploracaoIlegal atividadeExploracaoIlegal2 = new AtividadeExploracaoIlegal();
        atividadeExploracaoIlegal2.setId(atividadeExploracaoIlegal1.getId());
        assertThat(atividadeExploracaoIlegal1).isEqualTo(atividadeExploracaoIlegal2);
        atividadeExploracaoIlegal2.setId(2L);
        assertThat(atividadeExploracaoIlegal1).isNotEqualTo(atividadeExploracaoIlegal2);
        atividadeExploracaoIlegal1.setId(null);
        assertThat(atividadeExploracaoIlegal1).isNotEqualTo(atividadeExploracaoIlegal2);
    }
}
