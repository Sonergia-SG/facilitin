import { FileFull } from '../../../../store/reducer/entities/types';

const lockedByStatus = (file: FileFull) => !(file.statut === -1 || file.statut === 0);

export default lockedByStatus;
