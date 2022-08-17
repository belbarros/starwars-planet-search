import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';

function SWProvider(props) {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const request = await fetch(endpoint).then((response) => response.json());
      setData(request.results);
    };
    getData();
  }, []);

  {
    const { Provider } = SWContext;
    const { children } = props;
    return (
      <Provider
        value={ {
          data,
        } }
      >
        {children}
      </Provider>
    );
  }
}

SWProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SWProvider;
