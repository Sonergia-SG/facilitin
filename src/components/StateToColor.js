/**
 * Created by stephane.mallaroni on 15/04/2019.
 */

const pointManuelNonCoche = (pointControle) => {
  let nonCoche = true;
  for (let i = 0; i < pointControle.length; i++) {
    if (pointControle[i].controle_valide === 1) {
      nonCoche = false;
    }
  }
  return nonCoche;
};

function StateToColor(str) {
  let colour = '';

  const manuelIsEmpty = pointManuelNonCoche(str.point_controle);

  if (str.nb_bad_controle_auto > 0) {
    colour = 'accordion_bad_controle';
  } else if (str.litige === 1) {
    colour = 'accordion_litige';
  } else if (manuelIsEmpty) {
    colour = 'accordion_empty';
  } else {
    colour = 'accordion_ok';
  }

  return colour;
}

export default StateToColor;
