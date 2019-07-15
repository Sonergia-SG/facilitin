import lockedByStatus from '../tools/lockedByStatus';
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

describe('lockedByStatus', () => {
  it('locked for status -1 (MISSING)', () => {
    expect(lockedByStatus({ ...file, statut: -1 })).toBe(false);
  });

  it('locked for status 0 (INPROGRESS)', () => {
    expect(lockedByStatus({ ...file, statut: 0 })).toBe(false);
  });

  it('locked for status 5 (INCOMPLET)', () => {
    expect(lockedByStatus({ ...file, statut: 5 })).toBe(true);
  });

  it('locked for status 10 (REJECTED)', () => {
    expect(lockedByStatus({ ...file, statut: 10 })).toBe(true);
  });

  it('locked for status 15 (VALIDATED)', () => {
    expect(lockedByStatus({ ...file, statut: 15 })).toBe(true);
  });
});
