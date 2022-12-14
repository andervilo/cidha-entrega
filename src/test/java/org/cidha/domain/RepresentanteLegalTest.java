package org.cidha.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.cidha.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class RepresentanteLegalTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RepresentanteLegal.class);
        RepresentanteLegal representanteLegal1 = new RepresentanteLegal();
        representanteLegal1.setId(1L);
        RepresentanteLegal representanteLegal2 = new RepresentanteLegal();
        representanteLegal2.setId(representanteLegal1.getId());
        assertThat(representanteLegal1).isEqualTo(representanteLegal2);
        representanteLegal2.setId(2L);
        assertThat(representanteLegal1).isNotEqualTo(representanteLegal2);
        representanteLegal1.setId(null);
        assertThat(representanteLegal1).isNotEqualTo(representanteLegal2);
    }
}
