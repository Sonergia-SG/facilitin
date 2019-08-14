import { CheckPoint } from '../../../../store/reducer/entities/types';

const validated = (c: CheckPoint) => c.pivot.valide === 1;

export default validated;
