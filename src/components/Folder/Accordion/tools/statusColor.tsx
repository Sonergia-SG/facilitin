import captureException from '../../../../tools/errorReporting/captureException';
import { FileFull } from '../../../../store/reducer/entities/types';

const statusColor = (file: FileFull) => {
  switch (file.statut) {
    case -1:
      return '#aeaeae';
    case 0:
      return '#57c8f1';
    case 5:
      return '#e4ba00';
    case 10:
      return '#ec6459';
    case 15:
      return '#95b75d';
    default:
      captureException(new Error(`Missing status color for status : ${file.statut}`));
      return '#aeaeae';
  }
};

export default statusColor;
