/**
 * Created by stephane.mallaroni on 15/04/2019.
 */

function StateToColor(str) {
  let colour = '';

  const manuel_is_empty = pointManuelNonCoche(str.point_controle);

  if (str.nb_bad_controle_auto > 0) {
    colour = 'accordion_bad_controle';
  } else if (str.litige === 1) {
    colour = 'accordion_litige';
  } else if (manuel_is_empty) {
    colour = 'accordion_empty';
  } else {
    colour = 'accordion_ok';
  }

  return colour;
}

function pointManuelNonCoche(point_controle) {
  let nonCoche = true;
  for (let i = 0; i < point_controle.length; i++) {
    if (point_controle[i].controle_valide === 1) {
      nonCoche = false;
    }
  }
  return nonCoche;
}

export default StateToColor;
