import React from 'react';

import Input from './Input';
import Section from '../../../../Common/Section';

import { GenericForms } from './types';
import { FolderFull } from '../../../../store/reducer/entities/types';
import { FolderPendingItem } from '../../../../store/reducer/views/folder/types';
import {
  folderUpdateMoaValue,
  folderUpdateMoeValue,
  folderUpdateSiteValue,
} from '../../../../store/actions';

interface Props {
  def: GenericForms;
  idDpOperation: number;
  formKey: 'moa' | 'moe' | 'site';
  dossierprime: FolderFull;
  pending?: FolderPendingItem;
  edit: boolean;
  locked: boolean;
  loading: boolean;
  updater: typeof folderUpdateMoaValue | typeof folderUpdateMoeValue | typeof folderUpdateSiteValue;
}

const Form = ({
  def, idDpOperation, dossierprime, pending, updater, formKey, edit, locked, loading,
}: Props) => (
  <>
    {def.map((d) => {
      if (d.type === 'section') {
        return (
          <Section key={`${formKey}_section_${d.label}`} title={d.label} style={{ maxWidth: 250 }}>
            <Form
              def={d.fields}
              dossierprime={dossierprime}
              edit={edit}
              formKey={formKey}
              idDpOperation={idDpOperation}
              loading={loading}
              locked={locked}
              pending={pending}
              updater={updater}
            />
          </Section>
        );
      }

      const disabledInput = !edit || loading || locked;


      if (d.type === 'text' || d.type === 'date') {
        return (
          <Input
            key={d.key}
            label={`${d.label} :`}
            valueKey={d.key}
            value={d.value}
            type={d.type}
            idDpOperation={idDpOperation}
            disabled={disabledInput}
            dossierprime={dossierprime}
            pending={pending}
            pendingKey={formKey}
            update={updater}
          />
        );
      }

      return <div />;
    })}
  </>
);

export default Form;
