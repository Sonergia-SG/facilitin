import React, { useEffect, useState, useRef } from 'react';

const useOpenModalAfterLoading = (
  value: boolean,
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [displayModal, toggleModal] = useState(false);

  const prev = useRef(value);

  useEffect(() => {
    if (prev.current === true && value === false) {
      toggleModal(true);
    }
    prev.current = value;
  }, [value]);

  return [displayModal, toggleModal];
};

export default useOpenModalAfterLoading;
