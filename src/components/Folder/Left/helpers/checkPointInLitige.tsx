import { CheckPoint } from '../../../../store/reducer/entities/types';

const inLitige = (c: CheckPoint) => c.id_penalite === 2 && c.pivot.valide === 0;

export default inLitige;
