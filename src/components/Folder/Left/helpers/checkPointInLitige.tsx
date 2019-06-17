import { CheckPoint } from '../../../../store/reducer/entities/types';

const inLitige = (c: CheckPoint) => c.automatique === 1 && c.pivot.valide === 0;

export default inLitige;
