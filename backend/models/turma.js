import db from '../db/dbconfig.js';

class Turma {
  /*
  constructor({
    id,
    organizacao,
    localizacao,
    esporte,
    dataDeFechamento,
    horarios,
    descricao
  }) {
    this.id = null || id;
    this.organizacao = organizacao;
    this.localizacao = localizacao;
    this.esporte = esporte;
    this.dataDeFechamento = dataDeFechamento;
    this.horarios = horarios;
    this.descricao = descricao;
  }

  static async pegarTurma() {
    return db.select('*').from('turmaSal');
  }

  static async pegarPeloId(id) {
    const resultado = await db.select('*').from('turmaSal').where({ id });
    return resultado[0];
  }

  async criar() {
    return db('turmaSal').insert(this)
      .then((registroCriado) => db('turmaSal')
        .where('id', registroCriado[0]))
      .then((registroSelecionado) => new Turma(registroSelecionado[0]));
  }

  async atualizar(id) {
    // o update retorna a quantidade de rows atualizados e não o objeto do registro atualizado
    await db('turmaSal')
      .where({ id })

    return db.select('*').from('turmaSal').where({ id });
  }

  static async excluir(id) {
    // o del retorna a quantidade de rows deletados
    await db('turmaSal')
      .where({ id })
      .del();
  }

  async salvar() {
    // verificar se o id existe no banco
    // se não existir é create
    // se existir é update
    if (this.id) {
      const resultado = await this.atualizar(this.id);
      return resultado;

    }
    const resultado = await this.criar();
    return resultado;

  }*/

    constructor({
      id,
    organizacao,
    localizacao,
    esporte,
    data_de_fechamento,
    horarios,
    descricao,
    created_at,
    updated_at ,
  }) {
    this.id = null || id;
    this.organizacao = organizacao;
    this.localizacao = localizacao;
    this.esporte = esporte;
    this.data_de_fechamento = data_de_fechamento;
    this.horarios = horarios;
    this.descricao = descricao;
    this.created_at = created_at || new Date().toISOString();
    this.updated_at = updated_at || new Date().toISOString();
  }
    static async pegarTurma() {
      return db.select('*').from('TurmaCerto');
    }
  
    static async pegarPeloId(id) {
      const resultado = await db.select('*').from('TurmaCerto').where({ id });
      return resultado[0];
    }
  
    async criar() {
      return db('TurmaCerto').insert(this)
        .then((registroCriado) => db('TurmaCerto')
          .where('id', registroCriado[0]))
        .then((registroSelecionado) => new Turma(registroSelecionado[0]));
    }
  
    async atualizar(id) {
      /*const nada = await db.select('*')
      .from('turmaSal')
      .where('id', id)
      .toString();
    return nada;*/
      // o update retorna a quantidade de rows atualizados e não o objeto do registro atualizado
    await db('TurmaCerto')
    .where({ id })
    .update({ ...this, updated_at: new Date().toISOString() });

  return db.select('*').from('TurmaCerto').where({ id });


}
      
    

    static async excluir(id) {
      // o del retorna a quantidade de rows deletados
      await db('TurmaCerto')
        .where({ id })
        .del();
    }
  
    async salvar() {
      // verificar se o id existe no banco
      // se não existir é create
      // se existir é update
      if (this.id) {
        return this.atualizar(this.id);
      }
      return this.criar();
    }
}



export default Turma;