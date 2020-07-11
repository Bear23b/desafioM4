import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const Grades = db.grades;

const create = async (req, res) => {
  const grades = new Grades ({
    name: req.body.name,
    subject: req.body.subject,
    type: req.body.type,
    value: req.body.value,
    lastModified: Date.now(),
  });
  try {

    const data = await grades.save(grades);

    res.send(data)
  
    logger.info(`POST /grade - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};
    
  try {
    const data = await Grades.find({});

    res.send(data);
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)+ ' estou aqui'}`);
  }
};

const findOne = async (req, res) => {
  const _id = req.params.id;

  console.log(`meu id: ${_id}\n\n`)

  try {
   
    const data = await Grades.findById({_id});

    res.send(data);
    logger.info(`GET /grade - ${_id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + _id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const _id = req.params.id;

  try {

    const data = await Grades.findByIdAndUpdate({_id}, req.body);

    res.send({ message: 'Grade atualizado com sucesso ' +req.body.name});

    logger.info(`PUT /grade - ${_d} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + _id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const _id = req.params.id;

  try {


    const data = await Grades.findByIdAndRemove({_id}, req.body);

    if(!data){
       res.status(404).send(`Dado ${_id} não encontrado `);
    }else{
      res.send({ message: 'Grade excluido com sucesso' });
    }
   

    logger.info(`DELETE /grade - ${_id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + _id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  const id = req.params.id;

  try {

    const data = await Grades.deleteMany({});
    res.send({
      message: `Grades excluidos`,
    });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
