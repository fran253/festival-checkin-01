import { PutItemCommand } from 'dynamodb-toolbox/entity/actions/put';
import { ScanCommand } from 'dynamodb-toolbox/table/actions/scan';
import { MODELO_PROYECTO, MODELO_EMPRESA, TABLA_PROYECTOS } from '../../models/empresa-proyecto.model.mjs';
 
export async function crearProyectoRepository(proyecto) {
  await MODELO_PROYECTO.build(PutItemCommand)
    .item(proyecto)
    .options({ condition: { attr: 'proyectoId', exists: false } })
    .send();
}
 
export async function listarProyectosRepository() {
  const { Items = [] } = await TABLA_PROYECTOS.build(ScanCommand)
    .entities(MODELO_PROYECTO)
    .options({ consistent: true })
    .send();
  return Items;
}