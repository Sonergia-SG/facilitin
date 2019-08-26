// ? Inspired by : https://codes-sources.commentcamarche.net/source/16330-verification-de-la-validite-des-codes-siret-et-siren-algo-de-luhn

const isValidSiret = (siret: string) => {
  if (siret.length !== 14) return false;
  if (Number.isNaN(parseInt(siret, 10))) return false;

  const { somme } = siret.split('').reduce(
    (r, v, cpt) => {
      const char = parseInt(v, 10);

      if (cpt % 2 === 0) {
        const multiple = char * 2;
        const tmp = multiple > 9 ? multiple - 9 : multiple;
        return { somme: r.somme + tmp, tmp };
      }

      return { tmp: char, somme: r.somme + char };
    },
    { somme: 0, tmp: 0 },
  );

  return somme % 10 === 0;
};

export default {
  test: isValidSiret,
};
