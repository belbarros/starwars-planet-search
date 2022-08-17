import React, { useContext } from 'react';
import SWContext from '../context/SWContext';

function Table() {
  const { data } = useContext(SWContext);
  console.log(data);
  //   const tableHeadNames = data[0];
  //   const tableHead = Object.keys(tableHeadNames).filter((e) => e !== 'residents');

  return (
    <div>

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
          data.map((a) => (
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
