import { FormDef } from '../../../../components/Folder/Left/SecondaryData/types';

type PopulateValues = (
  values: Array<FormDef>,
  pending: {
    [index: string]: string | null;
  }
) => Array<FormDef>;

const populateValues: PopulateValues = (values, pending) => {
  const updatedKeys = Object.keys(pending);

  return values.map((v) => {
    if (v.type !== 'section' && pending && updatedKeys.includes(v.key)) {
      return {
        ...v,
        value: pending[v.key],
      };
    }

    return v;
  });
};

export default populateValues;
