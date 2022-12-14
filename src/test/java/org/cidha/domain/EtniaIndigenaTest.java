package org.cidha.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.cidha.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EtniaIndigenaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EtniaIndigena.class);
        EtniaIndigena etniaIndigena1 = new EtniaIndigena();
        etniaIndigena1.setId(1L);
        EtniaIndigena etniaIndigena2 = new EtniaIndigena();
        etniaIndigena2.setId(etniaIndigena1.getId());
        assertThat(etniaIndigena1).isEqualTo(etniaIndigena2);
        etniaIndigena2.setId(2L);
        assertThat(etniaIndigena1).isNotEqualTo(etniaIndigena2);
        etniaIndigena1.setId(null);
        assertThat(etniaIndigena1).isNotEqualTo(etniaIndigena2);
    }
}
