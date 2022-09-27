package org.cidha.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.cidha.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TipoRecursoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoRecurso.class);
        TipoRecurso tipoRecurso1 = new TipoRecurso();
        tipoRecurso1.setId(1L);
        TipoRecurso tipoRecurso2 = new TipoRecurso();
        tipoRecurso2.setId(tipoRecurso1.getId());
        assertThat(tipoRecurso1).isEqualTo(tipoRecurso2);
        tipoRecurso2.setId(2L);
        assertThat(tipoRecurso1).isNotEqualTo(tipoRecurso2);
        tipoRecurso1.setId(null);
        assertThat(tipoRecurso1).isNotEqualTo(tipoRecurso2);
    }
}
