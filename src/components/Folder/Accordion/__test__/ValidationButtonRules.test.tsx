import React from 'react';
import { shallow } from 'enzyme';
import { AccordionComponent as Accordion } from '../index';
import Validation from '../Validation';
import { FileFull, CheckPoint } from '../../../../store/reducer/entities/types';

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

const checkPoints: Array<CheckPoint> = [];

describe('document validation button', () => {
  it('must be hidden if file is incomplet', () => {
    const renderer = shallow(
      <Accordion
        file={file}
        checkPoints={checkPoints}
        numero={0}
        isSelected
        handleClick={() => {}}
        goNext={() => {}}
        folderId={2134}
        ending={() => {}}
        fileEnding={() => {}}
        locked={false}
        pending={undefined}
      />,
    );

    expect(renderer.find(Validation)).toHaveLength(0);
  });

  it('must be hidden if file is rejected', () => {
    const renderer = shallow(
      <Accordion
        file={{ ...file, statut: 10 }}
        checkPoints={checkPoints}
        numero={0}
        isSelected
        handleClick={() => {}}
        goNext={() => {}}
        folderId={2134}
        ending={() => {}}
        fileEnding={() => {}}
        locked={false}
        pending={undefined}
      />,
    );

    expect(renderer.find(Validation)).toHaveLength(0);
  });

  it('must be hidden if file is validated', () => {
    const renderer = shallow(
      <Accordion
        file={{ ...file, statut: 15 }}
        checkPoints={checkPoints}
        numero={0}
        isSelected
        handleClick={() => {}}
        goNext={() => {}}
        folderId={2134}
        ending={() => {}}
        fileEnding={() => {}}
        locked={false}
        pending={undefined}
      />,
    );

    expect(renderer.find(Validation)).toHaveLength(0);
  });

  it('must be visible if file is in progress', () => {
    const renderer = shallow(
      <Accordion
        file={{ ...file, statut: 0 }}
        checkPoints={checkPoints}
        numero={0}
        isSelected
        handleClick={() => {}}
        goNext={() => {}}
        folderId={2134}
        ending={() => {}}
        fileEnding={() => {}}
        locked={false}
        pending={undefined}
      />,
    );

    expect(renderer.find(Validation)).toHaveLength(1);
  });

  it('must be visible if file is missing', () => {
    const renderer = shallow(
      <Accordion
        file={{ ...file, statut: -1 }}
        checkPoints={checkPoints}
        numero={0}
        isSelected
        handleClick={() => {}}
        goNext={() => {}}
        folderId={2134}
        ending={() => {}}
        fileEnding={() => {}}
        locked={false}
        pending={undefined}
      />,
    );

    expect(renderer.find(Validation)).toHaveLength(1);
  });
});
