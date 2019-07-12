import React, { useEffect, useState, useRef } from 'react';
import { FileStatus } from '../../../store/reducer/entities/types';

const useOpenModalAfterLoading = (
  value: boolean,
  status: FileStatus,
  goNext: () => void,
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [displayModal, toggleModal] = useState(false);

  const prev = useRef(value);

  useEffect(() => {
    if (prev.current === true && value === false && status === 10) {
      if (status === 10) toggleModal(true);
      else goNext();
    }

    prev.current = value;
  }, [value]);

  return [displayModal, toggleModal];
};

export default useOpenModalAfterLoading;
