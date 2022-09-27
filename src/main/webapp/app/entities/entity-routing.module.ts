import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'atividade-exploracao-ilegal',
        data: { pageTitle: 'AtividadeExploracaoIlegals' },
        loadChildren: () =>
          import('./atividade-exploracao-ilegal/atividade-exploracao-ilegal.module').then(m => m.AtividadeExploracaoIlegalModule),
      },
      {
        path: 'comarca',
        data: { pageTitle: 'Comarcas' },
        loadChildren: () => import('./comarca/comarca.module').then(m => m.ComarcaModule),
      },
      {
        path: 'concessao-liminar',
        data: { pageTitle: 'ConcessaoLiminars' },
        loadChildren: () => import('./concessao-liminar/concessao-liminar.module').then(m => m.ConcessaoLiminarModule),
      },
      {
        path: 'concessao-liminar-cassada',
        data: { pageTitle: 'ConcessaoLiminarCassadas' },
        loadChildren: () =>
          import('./concessao-liminar-cassada/concessao-liminar-cassada.module').then(m => m.ConcessaoLiminarCassadaModule),
      },
      {
        path: 'conflito',
        data: { pageTitle: 'Conflitos' },
        loadChildren: () => import('./conflito/conflito.module').then(m => m.ConflitoModule),
      },
      {
        path: 'data',
        data: { pageTitle: 'Data' },
        loadChildren: () => import('./data/data.module').then(m => m.DataModule),
      },
      {
        path: 'direito',
        data: { pageTitle: 'Direitos' },
        loadChildren: () => import('./direito/direito.module').then(m => m.DireitoModule),
      },
      {
        path: 'embargo-declaracao',
        data: { pageTitle: 'EmbargoDeclaracaos' },
        loadChildren: () => import('./embargo-declaracao/embargo-declaracao.module').then(m => m.EmbargoDeclaracaoModule),
      },
      {
        path: 'embargo-declaracao-agravo',
        data: { pageTitle: 'EmbargoDeclaracaoAgravos' },
        loadChildren: () =>
          import('./embargo-declaracao-agravo/embargo-declaracao-agravo.module').then(m => m.EmbargoDeclaracaoAgravoModule),
      },
      {
        path: 'embargo-recurso-especial',
        data: { pageTitle: 'EmbargoRecursoEspecials' },
        loadChildren: () => import('./embargo-recurso-especial/embargo-recurso-especial.module').then(m => m.EmbargoRecursoEspecialModule),
      },
      {
        path: 'embargo-resp-re',
        data: { pageTitle: 'EmbargoRespRes' },
        loadChildren: () => import('./embargo-resp-re/embargo-resp-re.module').then(m => m.EmbargoRespReModule),
      },
      {
        path: 'envolvidos-conflito-litigio',
        data: { pageTitle: 'EnvolvidosConflitoLitigios' },
        loadChildren: () =>
          import('./envolvidos-conflito-litigio/envolvidos-conflito-litigio.module').then(m => m.EnvolvidosConflitoLitigioModule),
      },
      {
        path: 'etnia-indigena',
        data: { pageTitle: 'EtniaIndigenas' },
        loadChildren: () => import('./etnia-indigena/etnia-indigena.module').then(m => m.EtniaIndigenaModule),
      },
      {
        path: 'fundamentacao-doutrinaria',
        data: { pageTitle: 'FundamentacaoDoutrinarias' },
        loadChildren: () =>
          import('./fundamentacao-doutrinaria/fundamentacao-doutrinaria.module').then(m => m.FundamentacaoDoutrinariaModule),
      },
      {
        path: 'fundamentacao-legal',
        data: { pageTitle: 'FundamentacaoLegals' },
        loadChildren: () => import('./fundamentacao-legal/fundamentacao-legal.module').then(m => m.FundamentacaoLegalModule),
      },
      {
        path: 'instrumento-internacional',
        data: { pageTitle: 'InstrumentoInternacionals' },
        loadChildren: () =>
          import('./instrumento-internacional/instrumento-internacional.module').then(m => m.InstrumentoInternacionalModule),
      },
      {
        path: 'jurisprudencia',
        data: { pageTitle: 'Jurisprudencias' },
        loadChildren: () => import('./jurisprudencia/jurisprudencia.module').then(m => m.JurisprudenciaModule),
      },
      {
        path: 'municipio',
        data: { pageTitle: 'Municipios' },
        loadChildren: () => import('./municipio/municipio.module').then(m => m.MunicipioModule),
      },
      {
        path: 'opcao-recurso',
        data: { pageTitle: 'OpcaoRecursos' },
        loadChildren: () => import('./opcao-recurso/opcao-recurso.module').then(m => m.OpcaoRecursoModule),
      },
      {
        path: 'parte-interesssada',
        data: { pageTitle: 'ParteInteresssadas' },
        loadChildren: () => import('./parte-interesssada/parte-interesssada.module').then(m => m.ParteInteresssadaModule),
      },
      {
        path: 'problema-juridico',
        data: { pageTitle: 'ProblemaJuridicos' },
        loadChildren: () => import('./problema-juridico/problema-juridico.module').then(m => m.ProblemaJuridicoModule),
      },
      {
        path: 'secao-judiciaria',
        data: { pageTitle: 'SecaoJudiciarias' },
        loadChildren: () => import('./secao-judiciaria/secao-judiciaria.module').then(m => m.SecaoJudiciariaModule),
      },
      {
        path: 'subsecao-judiciaria',
        data: { pageTitle: 'SubsecaoJudiciarias' },
        loadChildren: () => import('./subsecao-judiciaria/subsecao-judiciaria.module').then(m => m.SubsecaoJudiciariaModule),
      },
      {
        path: 'processo',
        data: { pageTitle: 'Processos' },
        loadChildren: () => import('./processo/processo.module').then(m => m.ProcessoModule),
      },
      {
        path: 'processo-conflito',
        data: { pageTitle: 'ProcessoConflitos' },
        loadChildren: () => import('./processo-conflito/processo-conflito.module').then(m => m.ProcessoConflitoModule),
      },
      {
        path: 'quilombo',
        data: { pageTitle: 'Quilombos' },
        loadChildren: () => import('./quilombo/quilombo.module').then(m => m.QuilomboModule),
      },
      {
        path: 'recurso',
        data: { pageTitle: 'Recursos' },
        loadChildren: () => import('./recurso/recurso.module').then(m => m.RecursoModule),
      },
      {
        path: 'relator',
        data: { pageTitle: 'Relators' },
        loadChildren: () => import('./relator/relator.module').then(m => m.RelatorModule),
      },
      {
        path: 'representante-legal',
        data: { pageTitle: 'RepresentanteLegals' },
        loadChildren: () => import('./representante-legal/representante-legal.module').then(m => m.RepresentanteLegalModule),
      },
      {
        path: 'terra-indigena',
        data: { pageTitle: 'TerraIndigenas' },
        loadChildren: () => import('./terra-indigena/terra-indigena.module').then(m => m.TerraIndigenaModule),
      },
      {
        path: 'territorio',
        data: { pageTitle: 'Territorios' },
        loadChildren: () => import('./territorio/territorio.module').then(m => m.TerritorioModule),
      },
      {
        path: 'tipo-data',
        data: { pageTitle: 'TipoData' },
        loadChildren: () => import('./tipo-data/tipo-data.module').then(m => m.TipoDataModule),
      },
      {
        path: 'tipo-decisao',
        data: { pageTitle: 'TipoDecisaos' },
        loadChildren: () => import('./tipo-decisao/tipo-decisao.module').then(m => m.TipoDecisaoModule),
      },
      {
        path: 'tipo-empreendimento',
        data: { pageTitle: 'TipoEmpreendimentos' },
        loadChildren: () => import('./tipo-empreendimento/tipo-empreendimento.module').then(m => m.TipoEmpreendimentoModule),
      },
      {
        path: 'tipo-recurso',
        data: { pageTitle: 'TipoRecursos' },
        loadChildren: () => import('./tipo-recurso/tipo-recurso.module').then(m => m.TipoRecursoModule),
      },
      {
        path: 'tipo-representante',
        data: { pageTitle: 'TipoRepresentantes' },
        loadChildren: () => import('./tipo-representante/tipo-representante.module').then(m => m.TipoRepresentanteModule),
      },
      {
        path: 'unidade-conservacao',
        data: { pageTitle: 'UnidadeConservacaos' },
        loadChildren: () => import('./unidade-conservacao/unidade-conservacao.module').then(m => m.UnidadeConservacaoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
