import { File } from '../../../store/reducer/entities/types';

const findDisplayType = (file: File) => {
  if (file.is_devis) return 'Devis';
  else if (file.is_aat) return 'AAT';
  else if (file.is_facture) return 'Facture';
  else if (file.is_lettre_engagement) return "Lettre d'engagement";
  else if (file.is_justif_preca) return 'Justificatif de précarité';
  else if (file.is_autres) return 'Autres';
  else if (file.is_aft) return 'AFT';
  else if (file.is_contrat_distrib) return 'Contrat de distribution';
  else if (file.is_conv_tepcv) return 'Convention TEPCV';
  else if (file.is_conv_regroupement) return 'Convention de regroupement';
  else if (file.is_liste_depenses) return 'Liste de dépenses';
  else if (file.is_attestation_tepcv) return 'Attestation TEPCV';
  else if (file.is_attestation_collectivite)
    return 'Attestation de collectivité';
  else if (file.is_etat_recapitulatif) return 'Etat récapitulatif';
  else if (file.is_horodatage) return 'Horodatage';
  else if (file.is_subrogation) return 'Subrogation';

  return 'Autres';
};

export default findDisplayType;
