import React, { useEffect, useState, useRef } from 'react';
import { FileStatus } from '../../../store/reducer/entities/types';

const useOpenModalAfterLoading = (
  status: FileStatus,
  goNext: () => void,
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [displayModal, toggleModal] = useState(false);

  const prev = useRef(status);

  useEffect(() => {
    if (prev.current !== status) {
      if (prev.current !== 10 && status === 10) toggleModal(true);
      if (status === 15) goNext();
    }

    prev.current = status;
  }, [status]);

  return [displayModal, toggleModal];
};

export default useOpenModalAfterLoading;
