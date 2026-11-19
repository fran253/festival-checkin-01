import { UpdateItemCommand } from 'dynamodb-toolbox/entity/actions/update';
import { MODELO_PROYECTO, MODELO_EMPRESA, TABLA_PROYECTOS } from '../../models/empresa-proyecto.model.mjs';
 
export async function modificarHorasEstimadasRepository(proyectoId, horasEstimadas) {
  const { Attributes } = await MODELO_PROYECTO.build(UpdateItemCommand)
    .item({ proyectoId, horasEstimadas })
    .options({
      condition: { attr: 'proyectoId', exists: true },
      returnValues: 'ALL_NEW'
    })
    .send();
  return Attributes;
}