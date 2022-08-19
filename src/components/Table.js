import React, { useContext, useState } from 'react';
import SWContext from '../context/SWContext';

function Table() {
  const {
    data,
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
  } = useContext(SWContext);
  //   console.log(data);

  const [filterParam, setFilterParam] = useState(
    {
      column: 'population',
      comparison: 'maior que',
      value: '0',
    },
  );

  const [btn, setBtn] = useState(false);

  const filtered = data
    .filter((search) => search.name.includes(filterByName))
    .filter((planet) => filterByNumericValues.every(({ column, comparison, value }) => {
      if (btn && comparison === 'menor que') {
        return Number(planet[column]) < Number(value);
      } if (btn && comparison === 'maior que') {
        return Number(planet[column]) > Number(value);
      } if (btn && comparison === 'igual a') {
        return Number(planet[column]) === Number(value);
      }
      return data;
    }));

  const handleBtn = () => {
    setBtn(true);
    setFilterByNumericValues([
      ...filterByNumericValues,
      filterParam,
    ]);
  };

  return (
    <div>
      <div className="filter-bar">
        <label htmlFor="name-filter">
          Filtre por nome:
          <input
            type="text"
            name="name-filter"
            value={ filterByName }
            data-testid="name-filter"
            onChange={ ({ target }) => setFilterByName(target.value) }
          />
        </label>

        <select
          data-testid="column-filter"
          value={ filterParam.column }
          onChange={ ({ target }) => setFilterParam({
            ...filterParam,
            column: target.value,
          }) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>

        <select
          data-testid="comparison-filter"
          value={ filterParam.comparison }
          onChange={ ({ target }) => setFilterParam({
            ...filterParam,
            comparison: target.value,
          }) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          type="text"
          data-testid="value-filter"
          value={ filterParam.value }
          onChange={ ({ target }) => setFilterParam({
            ...filterParam,
            value: Number(target.value),
          }) }
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleBtn }
        >
          Filtrar
        </button>
      </div>
      <table>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
        {
          filtered.map((a) => (
            <tbody key={ a.name }>
              <tr>
                <td>{ a.name }</td>
                <td>{ a.rotation_period }</td>
                <td>{ a.orbital_period }</td>
                <td>{ a.diameter }</td>
                <td>{ a.climate }</td>
                <td>{ a.gravity }</td>
                <td>{ a.terrain }</td>
                <td>{ a.surface_water }</td>
                <td>{ a.population }</td>
                <td>{ a.films }</td>
                <td>{ a.created }</td>
                <td>{ a.edited }</td>
                <td>{ a.url }</td>
              </tr>
            </tbody>
          ))

        }
      </table>
    </div>
  );
}

export default Table;
