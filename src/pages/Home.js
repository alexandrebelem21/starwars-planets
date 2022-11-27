import { useEffect, useState } from 'react';
// import Filters from './components/Filters';
// import useFetch from '../hook/useFetch';

function Home() {
  // const { tableList, planetList } = useFetch();
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState('population');
  const [op, setOp] = useState('maior que');
  const [num, setNum] = useState('0');
  const [fil, setFil] = useState([]);
  const [selOne, setSelOne] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const selTwo = ['maior que', 'menor que', 'igual a'];

  const [listas, setListas] = useState([]); // Lista que controla tudo
  const [selFilter, setSelFilter] = useState([]);

  const [planetList, setPlanetList] = useState([]);
  const [tableList, setTableList] = useState([]);
  useEffect(() => {
    const fetchPlanetList = async () => {
      try {
        const url = 'https://swapi.dev/api/planets';
        const response = await fetch(url);
        const list = await response.json();
        const lists = list.results;
        lists.map((del) => delete del.residents);
        const filtered = Object.keys(lists[0]);
        setTableList(filtered);
        setPlanetList(lists);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlanetList();
  }, []);

  const data = fil.length === 0 ? planetList : fil;
  // console.log('data', data);
  // let filterByName = planetList.filter((el) => el.name.includes(search));
  // let filterByName = planetList;
  useEffect(() => {
    setListas(data.filter((el) => el.name.includes(search)));
    setSelect(selOne[0]);
  }, [search, data, selOne]);
  let dts = data;
  const click = () => {
    setSelFilter([...selFilter, { select, op, num }]);
    if (op === 'maior que') {
      dts = dts.filter((el) => +el[select] > num);
    } if (op === 'menor que') {
      dts = dts.filter((el) => +el[select] < num);
    } else if (op === 'igual a') {
      dts = dts.filter((el) => +el[select] === +num);
    }

    setSelOne(selOne.filter((del) => del !== select));
    setSelect(selOne[0]);
    setFil(dts);
    setListas(dts);
  };

  const rmvFilter = (e) => {
    if (selFilter.length === 1) {
      setSelFilter([]);
      setListas([]);
      setFil([]);
      setSelOne(['population', 'rotation_period',
        'orbital_period', 'surface_water', 'diameter']);
    } else {
      const a = selFilter.filter((del) => del.select !== e.target.id);
      setSelFilter(a);
      a.forEach((elem) => {
        if (elem.op === 'maior que') {
          setListas(planetList.filter((el) => +el[elem.select] > elem.num));
        } if (elem.op === 'menor que') {
          setListas(planetList.filter((el) => +el[elem.select] < elem.num));
        } else if (elem.op === 'igual a') {
          setListas(planetList.filter((el) => +el[elem.select] === +elem.num));
        }
      });
    }
  };

  const removeAllFilters = () => {
    setFil([]);
    setSelFilter([]);
    setSelOne(['population', 'rotation_period',
      'orbital_period', 'surface_water', 'diameter']);
    setListas([]);
  };

  return (
    <div>
      <div>
        {/* <Filters /> */}
        <div>
          <select
            data-testid="column-filter"
            onChange={ (e) => setSelect(e.target.value) }
          >
            {selOne
              .map((sel) => (
                <option key={ sel }>{ sel }</option>
              ))}
          </select>
          <select
            data-testid="comparison-filter"
            onChange={ (e) => setOp(e.target.value) }
          >
            {selTwo
              .map((sel) => (
                <option key={ sel }>{ sel }</option>
              ))}
          </select>
          <input
            type="number"
            data-testid="value-filter"
            onChange={ (e) => setNum(e.target.value) }
            value={ num }
          />
          <button
            type="button"
            data-testid="button-filter"
            onClick={ click }
          >
            Filtrar
          </button>
        </div>
        <div>
          {selFilter.map((el) => (
            <p
              key={ el.select }
              data-testid="filter"
            >
              { el.select }
              {' '}
              { el.op }
              {' '}
              { el.num }
              <button
                id={ el.select }
                type="button"
                onClick={ rmvFilter }
              >
                Remover Filtros
              </button>
            </p>
          ))}
          {/* <div>
            <select
              data-testid="column-sort"
              onChange={ (e) => setSelect(e.target.value) }
            >
              {selOne
                .map((sel) => (
                  <option key={ sel }>{ sel }</option>
                ))}
            </select>
            <div>
              <input
                type="radio"
                data-testid="column-sort-input-asc"
              />
            </div>
          </div> */}
        </div>
        {fil.length > 0 && (
          <button
            data-testid="button-remove-filters"
            type="button"
            onClick={ removeAllFilters }
          >
            Remover todas filtragens
          </button>)}
      </div>
      <div>
        <input
          type="text"
          data-testid="name-filter"
          value={ search }
          onChange={ (e) => setSearch(e.target.value) }
        />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              {tableList
                .map((el) => (
                  <th key={ el }>
                    { el }
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {
              listas.map((planets) => (
                <tr key={ planets.name }>
                  {
                    Object.values(planets)
                      .map((el) => (
                        <th key={ el.name }>
                          { el }
                        </th>
                      ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
