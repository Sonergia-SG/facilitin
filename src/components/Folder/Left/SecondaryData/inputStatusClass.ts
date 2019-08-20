const inputStatusClass = (edited: boolean, invalid: boolean) => {
  if (invalid) return ' is-danger';
  if (edited) return ' is-info';

  return '';
};

export default inputStatusClass;
