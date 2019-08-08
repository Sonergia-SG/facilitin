type ResolveColorbyType = (type: 'dialog' | 'confirm' | 'alert') => string;

const resolveColorByType: ResolveColorbyType = (type) => {
  switch (type) {
    case 'alert':
      return 'is-danger';
    case 'confirm':
      return 'is-warning';
    case 'dialog':
    default:
      return 'is-success';
  }
};

export default resolveColorByType;
