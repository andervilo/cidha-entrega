package org.cidha.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.cidha.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ConcessaoLiminarCassadaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ConcessaoLiminarCassada.class);
        ConcessaoLiminarCassada concessaoLiminarCassada1 = new ConcessaoLiminarCassada();
        concessaoLiminarCassada1.setId(1L);
        ConcessaoLiminarCassada concessaoLiminarCassada2 = new ConcessaoLiminarCassada();
        concessaoLiminarCassada2.setId(concessaoLiminarCassada1.getId());
        assertThat(concessaoLiminarCassada1).isEqualTo(concessaoLiminarCassada2);
        concessaoLiminarCassada2.setId(2L);
        assertThat(concessaoLiminarCassada1).isNotEqualTo(concessaoLiminarCassada2);
        concessaoLiminarCassada1.setId(null);
        assertThat(concessaoLiminarCassada1).isNotEqualTo(concessaoLiminarCassada2);
    }
}
