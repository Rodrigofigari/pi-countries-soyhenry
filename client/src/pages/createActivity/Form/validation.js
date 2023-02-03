function validation(form) {
  let errors = {
    name: "",
    difficulty: "",
    time: "",
    season: "",
    countries: "",
  };

  if (!form.name) {
    errors.name = "Enter name of activity";
  } else if (/\d/.test(form.name) || /[^\w\s]/.test(form.name)) {
    errors.name = "Name should not contain numbers or symbols";
  }

  if (!form.difficulty) {
    errors.difficulty = "Select a difficulty";
  }

  if (!form.time) {
    errors.time = "Enter time";
  } else if (/[^\d]/.test(form.time) || form.time < 0 || form.time > 12) {
    errors.time = "Time should be a number between 0 and 12";
  }

  if (!form.season) {
    errors.season = "Select a season";
  }

  if (!form.countries.length) {
    errors.countries = "Countries must contain at least one country";
  }

  return errors;
}

export default validation;
