import { GetItemCommand } from 'dynamodb-toolbox/entity/actions/get';
import { QueryCommand } from 'dynamodb-toolbox/table/actions/query';
import { MODELO_PROYECTO, MODELO_EMPRESA, TABLA_PROYECTOS } from '../../models/empresa-proyecto.model.mjs';
 
export async function buscarEmpresaRepository(empresaId) {
  const { Item } = await MODELO_EMPRESA.build(GetItemCommand)
    .key({ empresaId }).options({ consistent: true }).send();
  return Item ?? null;
}
 
export async function consultarEmpresaRepository(empresaId, minimo) {
  const { Items = [] } = await TABLA_PROYECTOS.build(QueryCommand)
    .entities(MODELO_PROYECTO)
    .query({ index: 'PorEmpresa', partition: empresaId })
    .options({ filters: { Proyecto: { attr: 'horasEstimadas', gte: minimo } } })
    .send();
  return Items;
}