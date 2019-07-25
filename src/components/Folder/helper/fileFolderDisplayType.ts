import { File } from '../../../store/reducer/entities/types';

const findDisplayType = (file: File) => {
  if (file.is_devis) return 'Devis';
  if (file.is_aat) return 'AAT';
  if (file.is_ah) return 'AH';
  if (file.is_facture) return 'Facture';
  if (file.is_lettre_engagement) return "Lettre d'engagement";
  if (file.is_justif_preca) return 'Justificatif de précarité';
  if (file.is_autres) return 'Autres';
  if (file.is_aft) return 'AFT';
  if (file.is_contrat_distrib) return 'Contrat de distribution';
  if (file.is_conv_tepcv) return 'Convention TEPCV';
  if (file.is_conv_regroupement) return 'Convention de regroupement';
  if (file.is_liste_depenses) return 'Liste de dépenses';
  if (file.is_attestation_tepcv) return 'Attestation TEPCV';
  if (file.is_attestation_collectivite) { return 'Attestation de collectivité'; }
  if (file.is_etat_recapitulatif) return 'Etat récapitulatif';
  if (file.is_horodatage) return 'Horodatage';
  if (file.is_subrogation) return 'Subrogation';

  return 'Autres';
};

export default findDisplayType;
