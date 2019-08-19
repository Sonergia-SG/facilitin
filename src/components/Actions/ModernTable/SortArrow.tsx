import React from 'react';
import { Sorted } from '../../../store/reducer/views/list/type';

interface Props {
  sorted?: Sorted;
}

const SortArrow = ({ sorted }: Props) => (
  <div style={{ float: 'right' }}>
    <div
      style={{
        color: sorted && sorted.desc === false ? '#7969fb' : undefined,
        opacity: sorted && sorted.desc === true ? 0.3 : 1,
        marginTop: -3,
      }}
    >
      <i className="fas fa-caret-up" />
    </div>
    <div
      style={{
        color: sorted && sorted.desc === true ? '#7969fb' : undefined,
        opacity: sorted && sorted.desc === false ? 0.3 : 1,
        marginTop: -12,
      }}
    >
      <i className="fas fa-caret-down" />
    </div>
  </div>
);

export default SortArrow;
