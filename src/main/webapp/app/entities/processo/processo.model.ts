import { IConcessaoLiminar } from 'app/entities/concessao-liminar/concessao-liminar.model';
import { IConcessaoLiminarCassada } from 'app/entities/concessao-liminar-cassada/concessao-liminar-cassada.model';
import { IEmbargoDeclaracao } from 'app/entities/embargo-declaracao/embargo-declaracao.model';
import { IEmbargoDeclaracaoAgravo } from 'app/entities/embargo-declaracao-agravo/embargo-declaracao-agravo.model';
import { IEmbargoRecursoEspecial } from 'app/entities/embargo-recurso-especial/embargo-recurso-especial.model';
import { IEmbargoRespRe } from 'app/entities/embargo-resp-re/embargo-resp-re.model';
import { ITipoDecisao } from 'app/entities/tipo-decisao/tipo-decisao.model';
import { ITipoEmpreendimento } from 'app/entities/tipo-empreendimento/tipo-empreendimento.model';
import { ISecaoJudiciaria } from 'app/entities/secao-judiciaria/secao-judiciaria.model';
import { IComarca } from 'app/entities/comarca/comarca.model';
import { IMunicipio } from 'app/entities/municipio/municipio.model';
import { ITerritorio } from 'app/entities/territorio/territorio.model';
import { IAtividadeExploracaoIlegal } from 'app/entities/atividade-exploracao-ilegal/atividade-exploracao-ilegal.model';
import { IUnidadeConservacao } from 'app/entities/unidade-conservacao/unidade-conservacao.model';
import { IEnvolvidosConflitoLitigio } from 'app/entities/envolvidos-conflito-litigio/envolvidos-conflito-litigio.model';
import { ITerraIndigena } from 'app/entities/terra-indigena/terra-indigena.model';
import { IProcessoConflito } from 'app/entities/processo-conflito/processo-conflito.model';
import { IParteInteresssada } from 'app/entities/parte-interesssada/parte-interesssada.model';
import { IRelator } from 'app/entities/relator/relator.model';
import { IQuilombo } from 'app/entities/quilombo/quilombo.model';
import { IProblemaJuridico } from 'app/entities/problema-juridico/problema-juridico.model';
import { StatusProcesso } from 'app/entities/enumerations/status-processo.model';

export interface IProcesso {
  id?: number;
  numeroProcesso?: string | null;
  oficio?: string | null;
  assunto?: string | null;
  linkUnico?: string | null;
  linkTrf?: string | null;
  turmaTrf1?: string | null;
  numeroProcessoAdministrativo?: string | null;
  numeroProcessoJudicialPrimeiraInstancia?: string | null;
  numeroProcessoJudicialPrimeiraInstanciaLink?: string | null;
  numeroProcessoJudicialPrimeiraInstanciaObservacoes?: string | null;
  parecer?: boolean | null;
  folhasProcessoConcessaoLiminar?: string | null;
  concessaoLiminarObservacoes?: string | null;
  folhasProcessoCassacao?: string | null;
  folhasParecer?: string | null;
  folhasEmbargo?: string | null;
  acordaoEmbargo?: string | null;
  folhasCienciaJulgEmbargos?: string | null;
  apelacao?: string | null;
  folhasApelacao?: string | null;
  acordaoApelacao?: string | null;
  folhasCienciaJulgApelacao?: string | null;
  embargoDeclaracao?: boolean | null;
  embargoRecursoExtraordinario?: boolean | null;
  folhasRecursoEspecial?: string | null;
  acordaoRecursoEspecial?: string | null;
  folhasCienciaJulgamentoRecursoEspecial?: string | null;
  embargoRecursoEspecial?: boolean | null;
  folhasCiencia?: string | null;
  agravoRespRe?: string | null;
  folhasRespRe?: string | null;
  acordaoAgravoRespRe?: string | null;
  folhasCienciaJulgamentoAgravoRespRe?: string | null;
  embargoRespRe?: string | null;
  agravoInterno?: string | null;
  folhasAgravoInterno?: string | null;
  embargoRecursoAgravo?: boolean | null;
  observacoes?: string | null;
  recursoSTJ?: boolean | null;
  linkRecursoSTJ?: string | null;
  folhasRecursoSTJ?: string | null;
  recursoSTF?: boolean | null;
  linkRecursoSTF?: string | null;
  folhasRecursoSTF?: string | null;
  folhasMemorialMPF?: string | null;
  execusaoProvisoria?: boolean | null;
  numeracaoExecusaoProvisoria?: string | null;
  recuperacaoEfetivaCumprimentoSentenca?: string | null;
  recuperacaoEfetivaCumprimentoSentencaObservacoes?: string | null;
  envolveEmpreendimento?: boolean | null;
  envolveExploracaoIlegal?: boolean | null;
  envolveTerraQuilombola?: boolean | null;
  envolveTerraComunidadeTradicional?: boolean | null;
  envolveTerraIndigena?: boolean | null;
  resumoFatos?: string | null;
  tamanhoArea?: number | null;
  valorArea?: number | null;
  tamanhoAreaObservacao?: string | null;
  dadosGeograficosLitigioConflito?: boolean | null;
  latitude?: string | null;
  longitude?: string | null;
  numeroProcessoMPF?: string | null;
  numeroEmbargo?: string | null;
  pautaApelacao?: string | null;
  numeroRecursoEspecial?: string | null;
  admissiblidade?: string | null;
  envolveGrandeProjeto?: boolean | null;
  envolveUnidadeConservacao?: boolean | null;
  linkReferencia?: string | null;
  statusProcesso?: StatusProcesso | null;
  concessaoLiminars?: IConcessaoLiminar[] | null;
  concessaoLiminarCassadas?: IConcessaoLiminarCassada[] | null;
  embargoDeclaracaos?: IEmbargoDeclaracao[] | null;
  embargoDeclaracaoAgravos?: IEmbargoDeclaracaoAgravo[] | null;
  embargoRecursoEspecials?: IEmbargoRecursoEspecial[] | null;
  embargoRespRes?: IEmbargoRespRe[] | null;
  tipoDecisao?: ITipoDecisao | null;
  tipoEmpreendimento?: ITipoEmpreendimento | null;
  secaoJudiciaria?: ISecaoJudiciaria | null;
  comarcas?: IComarca[] | null;
  municipios?: IMunicipio[] | null;
  territorios?: ITerritorio[] | null;
  atividadeExploracaoIlegals?: IAtividadeExploracaoIlegal[] | null;
  unidadeConservacaos?: IUnidadeConservacao[] | null;
  envolvidosConflitoLitigios?: IEnvolvidosConflitoLitigio[] | null;
  terraIndigenas?: ITerraIndigena[] | null;
  processoConflitos?: IProcessoConflito[] | null;
  parteInteresssadas?: IParteInteresssada[] | null;
  relators?: IRelator[] | null;
  quilombos?: IQuilombo[] | null;
  problemaJuridicos?: IProblemaJuridico[] | null;
}

export class Processo implements IProcesso {
  constructor(
    public id?: number,
    public numeroProcesso?: string | null,
    public oficio?: string | null,
    public assunto?: string | null,
    public linkUnico?: string | null,
    public linkTrf?: string | null,
    public turmaTrf1?: string | null,
    public numeroProcessoAdministrativo?: string | null,
    public numeroProcessoJudicialPrimeiraInstancia?: string | null,
    public numeroProcessoJudicialPrimeiraInstanciaLink?: string | null,
    public numeroProcessoJudicialPrimeiraInstanciaObservacoes?: string | null,
    public parecer?: boolean | null,
    public folhasProcessoConcessaoLiminar?: string | null,
    public concessaoLiminarObservacoes?: string | null,
    public folhasProcessoCassacao?: string | null,
    public folhasParecer?: string | null,
    public folhasEmbargo?: string | null,
    public acordaoEmbargo?: string | null,
    public folhasCienciaJulgEmbargos?: string | null,
    public apelacao?: string | null,
    public folhasApelacao?: string | null,
    public acordaoApelacao?: string | null,
    public folhasCienciaJulgApelacao?: string | null,
    public embargoDeclaracao?: boolean | null,
    public embargoRecursoExtraordinario?: boolean | null,
    public folhasRecursoEspecial?: string | null,
    public acordaoRecursoEspecial?: string | null,
    public folhasCienciaJulgamentoRecursoEspecial?: string | null,
    public embargoRecursoEspecial?: boolean | null,
    public folhasCiencia?: string | null,
    public agravoRespRe?: string | null,
    public folhasRespRe?: string | null,
    public acordaoAgravoRespRe?: string | null,
    public folhasCienciaJulgamentoAgravoRespRe?: string | null,
    public embargoRespRe?: string | null,
    public agravoInterno?: string | null,
    public folhasAgravoInterno?: string | null,
    public embargoRecursoAgravo?: boolean | null,
    public observacoes?: string | null,
    public recursoSTJ?: boolean | null,
    public linkRecursoSTJ?: string | null,
    public folhasRecursoSTJ?: string | null,
    public recursoSTF?: boolean | null,
    public linkRecursoSTF?: string | null,
    public folhasRecursoSTF?: string | null,
    public folhasMemorialMPF?: string | null,
    public execusaoProvisoria?: boolean | null,
    public numeracaoExecusaoProvisoria?: string | null,
    public recuperacaoEfetivaCumprimentoSentenca?: string | null,
    public recuperacaoEfetivaCumprimentoSentencaObservacoes?: string | null,
    public envolveEmpreendimento?: boolean | null,
    public envolveExploracaoIlegal?: boolean | null,
    public envolveTerraQuilombola?: boolean | null,
    public envolveTerraComunidadeTradicional?: boolean | null,
    public envolveTerraIndigena?: boolean | null,
    public resumoFatos?: string | null,
    public tamanhoArea?: number | null,
    public valorArea?: number | null,
    public tamanhoAreaObservacao?: string | null,
    public dadosGeograficosLitigioConflito?: boolean | null,
    public latitude?: string | null,
    public longitude?: string | null,
    public numeroProcessoMPF?: string | null,
    public numeroEmbargo?: string | null,
    public pautaApelacao?: string | null,
    public numeroRecursoEspecial?: string | null,
    public admissiblidade?: string | null,
    public envolveGrandeProjeto?: boolean | null,
    public envolveUnidadeConservacao?: boolean | null,
    public linkReferencia?: string | null,
    public statusProcesso?: StatusProcesso | null,
    public concessaoLiminars?: IConcessaoLiminar[] | null,
    public concessaoLiminarCassadas?: IConcessaoLiminarCassada[] | null,
    public embargoDeclaracaos?: IEmbargoDeclaracao[] | null,
    public embargoDeclaracaoAgravos?: IEmbargoDeclaracaoAgravo[] | null,
    public embargoRecursoEspecials?: IEmbargoRecursoEspecial[] | null,
    public embargoRespRes?: IEmbargoRespRe[] | null,
    public tipoDecisao?: ITipoDecisao | null,
    public tipoEmpreendimento?: ITipoEmpreendimento | null,
    public secaoJudiciaria?: ISecaoJudiciaria | null,
    public comarcas?: IComarca[] | null,
    public municipios?: IMunicipio[] | null,
    public territorios?: ITerritorio[] | null,
    public atividadeExploracaoIlegals?: IAtividadeExploracaoIlegal[] | null,
    public unidadeConservacaos?: IUnidadeConservacao[] | null,
    public envolvidosConflitoLitigios?: IEnvolvidosConflitoLitigio[] | null,
    public terraIndigenas?: ITerraIndigena[] | null,
    public processoConflitos?: IProcessoConflito[] | null,
    public parteInteresssadas?: IParteInteresssada[] | null,
    public relators?: IRelator[] | null,
    public quilombos?: IQuilombo[] | null,
    public problemaJuridicos?: IProblemaJuridico[] | null
  ) {
    this.parecer = this.parecer ?? false;
    this.embargoDeclaracao = this.embargoDeclaracao ?? false;
    this.embargoRecursoExtraordinario = this.embargoRecursoExtraordinario ?? false;
    this.embargoRecursoEspecial = this.embargoRecursoEspecial ?? false;
    this.embargoRecursoAgravo = this.embargoRecursoAgravo ?? false;
    this.recursoSTJ = this.recursoSTJ ?? false;
    this.recursoSTF = this.recursoSTF ?? false;
    this.execusaoProvisoria = this.execusaoProvisoria ?? false;
    this.envolveEmpreendimento = this.envolveEmpreendimento ?? false;
    this.envolveExploracaoIlegal = this.envolveExploracaoIlegal ?? false;
    this.envolveTerraQuilombola = this.envolveTerraQuilombola ?? false;
    this.envolveTerraComunidadeTradicional = this.envolveTerraComunidadeTradicional ?? false;
    this.envolveTerraIndigena = this.envolveTerraIndigena ?? false;
    this.dadosGeograficosLitigioConflito = this.dadosGeograficosLitigioConflito ?? false;
    this.envolveGrandeProjeto = this.envolveGrandeProjeto ?? false;
    this.envolveUnidadeConservacao = this.envolveUnidadeConservacao ?? false;
  }
}

export function getProcessoIdentifier(processo: IProcesso): number | undefined {
  return processo.id;
}
