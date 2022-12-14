package org.cidha.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.cidha.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ConcessaoLiminarTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ConcessaoLiminar.class);
        ConcessaoLiminar concessaoLiminar1 = new ConcessaoLiminar();
        concessaoLiminar1.setId(1L);
        ConcessaoLiminar concessaoLiminar2 = new ConcessaoLiminar();
        concessaoLiminar2.setId(concessaoLiminar1.getId());
        assertThat(concessaoLiminar1).isEqualTo(concessaoLiminar2);
        concessaoLiminar2.setId(2L);
        assertThat(concessaoLiminar1).isNotEqualTo(concessaoLiminar2);
        concessaoLiminar1.setId(null);
        assertThat(concessaoLiminar1).isNotEqualTo(concessaoLiminar2);
    }
}
