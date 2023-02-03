function validation(form) {
  let errors = {
    name: '',
    difficulty: '',
    time: '',
    season: '',
    countries: '',
  };

  if (!form.name) {
    errors.name = 'Enter name of activity';
  } else if (/\d/.test(form.name) || /[^\w\s]/.test(form.name)) {
    // /\d/.test(form.name) valida si hay un numero entre 0 y 9 ||   /[^\w\s]/.test(form.name) carácter que no sea una letra (mayúscula o minúscula), número o un espacio en blanco
    errors.name = 'Name should not contain numbers or symbols';
  }

  if (!form.difficulty) {
    errors.difficulty = 'Select a difficulty';
  }

  if (!form.time) {
    errors.time = 'Enter time';
  } else if (
    !/^-?\d+(,|\.\d+)?$/.test(form.time) ||
    form.time < 0 ||
    form.time > 12
  ) {
    // !/^-?\d+(,|\.\d+)?$/  verifica que solo sea un número decimal flotante válido que contiene solo dígitos, puntos o comas
    ///[^\d]/.test(form.time) verifica que no contenga algún carácter que no sea un dígito decimal
    errors.time = 'Time should be a number between 0 and 12';
  }

  if (!form.season) {
    errors.season = 'Select a season';
  }

  if (!form.countries.length) {
    errors.countries = 'Countries must contain at least one country';
  }

  return errors;
}

export default validation;
