import style from './form.module.css';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import validation from './validation';
import Flags from './cardsCA/flags';
import postDB from './post';

import { getCountries } from '../../../redux/actions/actions';

function Form() {
  const [form, setForm] = useState({
    name: '',
    difficulty: '',
    time: '',
    season: '',
    countries: [],
  });

  const [errors, setErrors] = useState({
    name: '',
    difficulty: '',
    time: '',
    season: '',
    countries: '',
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const dataDB = useSelector((state) => state.allCountries);
  const countries = dataDB.map((ele) => ({ name: ele.name, id: ele.id }));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => {
      if (name === 'countries') {
        return !prevForm.countries.includes(value)
          ? { ...prevForm, countries: [...prevForm.countries, value] }
          : prevForm;
      } else {
        return { ...prevForm, [name]: value };
      }
    });
    // setErrors((prevErrors)=>{
    //   return {
    //     ...prevErrors,
    //     [name]: validation(form)[name],
    //   }
    // })
  };

  useEffect(() => {
    setErrors(validation(form));
  }, [form]);

  const handlerSubmit = (event) => {
    const errorsValidation = validation(form);
    setErrors(errorsValidation);

    let hasErrors = false;
    for (let error in errorsValidation) {
      if (errorsValidation[error] !== '') {
        hasErrors = true;
        break;
      }
    }

    if (!hasErrors) {
      async function postData() {
        try {
          const result = await postDB(form);
          console.log('result', result);
          alert(result.data);
          setForm({
            name: '',
            difficulty: '',
            time: '',
            season: '',
            countries: [],
          });
        } catch (error) {
          alert(error.response.data);
        }
      }
      postData();
    }
    event.preventDefault();
  };

  const deleteCountry = (id) => {
    setForm({
      ...form,
      countries: form.countries.filter((ele) => ele !== id),
    });
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handlerSubmit}>
        <h1>Create Activity:</h1>
        <div>
          <label>Name: </label>
          <input
            className={style.clicks}
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <span className={style.span}> {errors.name}</span>}
        </div>

        <div>
          <label>Difficulty: </label>
          <select
            className={style.clicks}
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select...
            </option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          {errors.difficulty && (
            <span className={style.span}> {errors.difficulty}</span>
          )}
        </div>

        <div>
          <label>Time (12 Hrs max): </label>
          <input
            className={style.clicks}
            type="number"
            name="time"
            value={form.time}
            onChange={handleChange}
          />
          {errors.time && <span className={style.span}> {errors.time}</span>}
        </div>

        <div>
          <label>Season: </label>
          <select
            className={style.clicks}
            name="season"
            value={form.season}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select...
            </option>
            <option value="Summer">Summer</option>
            <option value="Winter">Winter</option>
            <option value="Spring">Spring</option>
            <option value="Autumn">Autumn</option>
          </select>
          {errors.season && (
            <span className={style.span}> {errors.season}</span>
          )}
        </div>

        <div>
          <label>
            Countries:
            <select
              className={style.clicks}
              multiple={false}
              name="countries"
              value={form.countries}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select...
              </option>

              {countries.map((element, index) => (
                <option value={element.id} key={index}>
                  {element.name}
                </option>
              ))}
            </select>
          </label>
          {errors.countries && (
            <span className={style.span}> {errors.countries}</span>
          )}
        </div>

        <Flags countries={form.countries} deleteCountry={deleteCountry} />
        <button className={style.submit} type="submit">
          Sumbit
        </button>
      </form>
    </div>
  );
}

export default Form;
