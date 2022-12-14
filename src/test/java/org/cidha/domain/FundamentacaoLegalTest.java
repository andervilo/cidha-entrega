package org.cidha.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.cidha.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class FundamentacaoLegalTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FundamentacaoLegal.class);
        FundamentacaoLegal fundamentacaoLegal1 = new FundamentacaoLegal();
        fundamentacaoLegal1.setId(1L);
        FundamentacaoLegal fundamentacaoLegal2 = new FundamentacaoLegal();
        fundamentacaoLegal2.setId(fundamentacaoLegal1.getId());
        assertThat(fundamentacaoLegal1).isEqualTo(fundamentacaoLegal2);
        fundamentacaoLegal2.setId(2L);
        assertThat(fundamentacaoLegal1).isNotEqualTo(fundamentacaoLegal2);
        fundamentacaoLegal1.setId(null);
        assertThat(fundamentacaoLegal1).isNotEqualTo(fundamentacaoLegal2);
    }
}
