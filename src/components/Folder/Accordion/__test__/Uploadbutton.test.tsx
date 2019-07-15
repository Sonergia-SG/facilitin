import React from 'react';
import { shallow } from 'enzyme';
import ReactDropzone from 'react-dropzone';

import { UploadButtonComponent as Uploadbutton } from '../UploadButton';
import { FileFull } from '../../../../store/reducer/entities/types';

const file: FileFull = {
  id_dp_file: 38580,
  id_file: 74326,
  id_dp_operation: 90184,
  id_dossierprime: 43887,
  is_devis: 1,
  is_aat: 0,
  is_facture: 0,
  is_lettre_engagement: 0,
  is_justif_preca: 0,
  is_autres: 0,
  is_aft: 0,
  is_contrat_distrib: 0,
  is_conv_tepcv: 0,
  is_conv_regroupement: 0,
  is_liste_depenses: 0,
  is_attestation_tepcv: 0,
  is_attestation_collectivite: 0,
  is_etat_recapitulatif: 0,
  is_ah: 0,
  is_horodatage: 0,
  is_subrogation: 0,
  statut: 5,
  filename: 'REGEX_note.txt',
  mimetype: 'text/plain',
};

describe('DropZone', () => {
  it('not disabled for file status -1', () => {
    const wrapper = shallow(
      <Uploadbutton
        file={{ ...file, statut: -1 }}
        idDpOperation={90184}
        upload={() => {}}
        loading={false}
      />,
    );

    expect(wrapper.find(ReactDropzone).props().disabled).toBe(false);
  });

  it('not disabled for file status 0', () => {
    const wrapper = shallow(
      <Uploadbutton
        file={{ ...file, statut: 0 }}
        idDpOperation={90184}
        upload={() => {}}
        loading={false}
      />,
    );

    expect(wrapper.find(ReactDropzone).props().disabled).toBe(false);
  });

  it('not disabled for file status 5', () => {
    const wrapper = shallow(
      <Uploadbutton
        file={{ ...file, statut: 5 }}
        idDpOperation={90184}
        upload={() => {}}
        loading={false}
      />,
    );

    expect(wrapper.find(ReactDropzone).props().disabled).toBe(false);
  });

  it('Disabled for file status 10', () => {
    const wrapper = shallow(
      <Uploadbutton
        file={{ ...file, statut: 10 }}
        idDpOperation={90184}
        upload={() => {}}
        loading={false}
      />,
    );

    expect(wrapper.find(ReactDropzone).props().disabled).toBe(true);
  });

  it('Disabled for file status 15', () => {
    const wrapper = shallow(
      <Uploadbutton
        file={{ ...file, statut: 15 }}
        idDpOperation={90184}
        upload={() => {}}
        loading={false}
      />,
    );

    expect(wrapper.find(ReactDropzone).props().disabled).toBe(true);
  });
});
