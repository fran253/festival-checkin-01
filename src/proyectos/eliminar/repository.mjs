import { DeleteItemCommand } from 'dynamodb-toolbox/entity/actions/delete';
import { MODELO_PROYECTO, MODELO_EMPRESA, TABLA_PROYECTOS } from '../../models/empresa-proyecto.model.mjs';
 
export async function eliminarProyectoRepository(proyectoId) {
  await MODELO_PROYECTO.build(DeleteItemCommand)
    .key({ proyectoId })
    .send();
}