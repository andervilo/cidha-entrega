package org.cidha.config;

import java.time.Duration;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.*;
import tech.jhipster.config.JHipsterProperties;
import tech.jhipster.config.cache.PrefixedKeyGenerator;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration =
            Eh107Configuration.fromEhcacheCacheConfiguration(
                CacheConfigurationBuilder
                    .newCacheConfigurationBuilder(Object.class, Object.class, ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                    .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                    .build()
            );
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, org.cidha.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, org.cidha.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, org.cidha.domain.User.class.getName());
            createCache(cm, org.cidha.domain.Authority.class.getName());
            createCache(cm, org.cidha.domain.User.class.getName() + ".authorities");
            createCache(cm, org.cidha.domain.AtividadeExploracaoIlegal.class.getName());
            createCache(cm, org.cidha.domain.AtividadeExploracaoIlegal.class.getName() + ".processos");
            createCache(cm, org.cidha.domain.Comarca.class.getName());
            createCache(cm, org.cidha.domain.Comarca.class.getName() + ".processos");
            createCache(cm, org.cidha.domain.ConcessaoLiminar.class.getName());
            createCache(cm, org.cidha.domain.ConcessaoLiminarCassada.class.getName());
            createCache(cm, org.cidha.domain.Conflito.class.getName());
            createCache(cm, org.cidha.domain.Data.class.getName());
            createCache(cm, org.cidha.domain.Direito.class.getName());
            createCache(cm, org.cidha.domain.Direito.class.getName() + ".processoConflitos");
            createCache(cm, org.cidha.domain.EmbargoDeclaracao.class.getName());
            createCache(cm, org.cidha.domain.EmbargoDeclaracaoAgravo.class.getName());
            createCache(cm, org.cidha.domain.EmbargoRecursoEspecial.class.getName());
            createCache(cm, org.cidha.domain.EmbargoRespRe.class.getName());
            createCache(cm, org.cidha.domain.EnvolvidosConflitoLitigio.class.getName());
            createCache(cm, org.cidha.domain.EnvolvidosConflitoLitigio.class.getName() + ".processos");
            createCache(cm, org.cidha.domain.EtniaIndigena.class.getName());
            createCache(cm, org.cidha.domain.EtniaIndigena.class.getName() + ".terraIndigenas");
            createCache(cm, org.cidha.domain.FundamentacaoDoutrinaria.class.getName());
            createCache(cm, org.cidha.domain.FundamentacaoDoutrinaria.class.getName() + ".problemaJuridicos");
            createCache(cm, org.cidha.domain.FundamentacaoLegal.class.getName());
            createCache(cm, org.cidha.domain.FundamentacaoLegal.class.getName() + ".problemaJuridicos");
            createCache(cm, org.cidha.domain.InstrumentoInternacional.class.getName());
            createCache(cm, org.cidha.domain.InstrumentoInternacional.class.getName() + ".problemaJuridicos");
            createCache(cm, org.cidha.domain.Jurisprudencia.class.getName());
            createCache(cm, org.cidha.domain.Jurisprudencia.class.getName() + ".problemaJuridicos");
            createCache(cm, org.cidha.domain.Municipio.class.getName());
            createCache(cm, org.cidha.domain.Municipio.class.getName() + ".processos");
            createCache(cm, org.cidha.domain.OpcaoRecurso.class.getName());
            createCache(cm, org.cidha.domain.ParteInteresssada.class.getName());
            createCache(cm, org.cidha.domain.ParteInteresssada.class.getName() + ".representanteLegals");
            createCache(cm, org.cidha.domain.ParteInteresssada.class.getName() + ".processos");
            createCache(cm, org.cidha.domain.ProblemaJuridico.class.getName());
            createCache(cm, org.cidha.domain.ProblemaJuridico.class.getName() + ".fundamentacaoDoutrinarias");
            createCache(cm, org.cidha.domain.ProblemaJuridico.class.getName() + ".jurisprudencias");
            createCache(cm, org.cidha.domain.ProblemaJuridico.class.getName() + ".fundamentacaoLegals");
            createCache(cm, org.cidha.domain.ProblemaJuridico.class.getName() + ".instrumentoInternacionals");
            createCache(cm, org.cidha.domain.ProblemaJuridico.class.getName() + ".processos");
            createCache(cm, org.cidha.domain.SecaoJudiciaria.class.getName());
            createCache(cm, org.cidha.domain.SubsecaoJudiciaria.class.getName());
            createCache(cm, org.cidha.domain.Processo.class.getName());
            createCache(cm, org.cidha.domain.Processo.class.getName() + ".concessaoLiminars");
            createCache(cm, org.cidha.domain.Processo.class.getName() + ".concessaoLiminarCassadas");
            createCache(cm, org.cidha.domain.Processo.class.getName() + ".embargoDeclaracaos");
            createCache(cm, org.cidha.domain.Processo.class.getName() + ".embargoDeclaracaoAgravos");
            createCache(cm, org.cidha.domain.Processo.class.getName() + ".embargoRecursoEspecials");
            createCache(cm, org.cidha.domain.Processo.class.getName() + ".embargoRespRes");
            createCache(cm, org.cidha.domain.Processo.class.getName() + ".comarcas");
            createCache(cm, org.cidha.domain.Processo.class.getName() + ".municipios");
            createCache(cm, org.cidha.domain.Processo.class.getName() + ".territorios");
            createCache(cm, org.cidha.domain.Processo.class.getName() + ".atividadeExploracaoIlegals");
            createCache(cm, org.cidha.domain.Processo.class.getName() + ".unidadeConservacaos");
            createCache(cm, org.cidha.domain.Processo.class.getName() + ".envolvidosConflitoLitigios");
            createCache(cm, org.cidha.domain.Processo.class.getName() + ".terraIndigenas");
            createCache(cm, org.cidha.domain.Processo.class.getName() + ".processoConflitos");
            createCache(cm, org.cidha.domain.Processo.class.getName() + ".parteInteresssadas");
            createCache(cm, org.cidha.domain.Processo.class.getName() + ".relators");
            createCache(cm, org.cidha.domain.Processo.class.getName() + ".quilombos");
            createCache(cm, org.cidha.domain.Processo.class.getName() + ".problemaJuridicos");
            createCache(cm, org.cidha.domain.ProcessoConflito.class.getName());
            createCache(cm, org.cidha.domain.ProcessoConflito.class.getName() + ".conflitos");
            createCache(cm, org.cidha.domain.ProcessoConflito.class.getName() + ".direitos");
            createCache(cm, org.cidha.domain.ProcessoConflito.class.getName() + ".processos");
            createCache(cm, org.cidha.domain.Quilombo.class.getName());
            createCache(cm, org.cidha.domain.Quilombo.class.getName() + ".processos");
            createCache(cm, org.cidha.domain.Recurso.class.getName());
            createCache(cm, org.cidha.domain.Relator.class.getName());
            createCache(cm, org.cidha.domain.Relator.class.getName() + ".processos");
            createCache(cm, org.cidha.domain.RepresentanteLegal.class.getName());
            createCache(cm, org.cidha.domain.RepresentanteLegal.class.getName() + ".processoConflitos");
            createCache(cm, org.cidha.domain.TerraIndigena.class.getName());
            createCache(cm, org.cidha.domain.TerraIndigena.class.getName() + ".etnias");
            createCache(cm, org.cidha.domain.TerraIndigena.class.getName() + ".processos");
            createCache(cm, org.cidha.domain.Territorio.class.getName());
            createCache(cm, org.cidha.domain.Territorio.class.getName() + ".processos");
            createCache(cm, org.cidha.domain.TipoData.class.getName());
            createCache(cm, org.cidha.domain.TipoDecisao.class.getName());
            createCache(cm, org.cidha.domain.TipoEmpreendimento.class.getName());
            createCache(cm, org.cidha.domain.TipoRecurso.class.getName());
            createCache(cm, org.cidha.domain.TipoRepresentante.class.getName());
            createCache(cm, org.cidha.domain.UnidadeConservacao.class.getName());
            createCache(cm, org.cidha.domain.UnidadeConservacao.class.getName() + ".processos");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cache.clear();
        } else {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}
