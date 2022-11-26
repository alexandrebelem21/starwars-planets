import { useEffect, useState } from 'react';
// import Filters from '../components/Filters';
// import useFetch from '../hook/useFetch';

function Home() {
  // const { tableList, planetList } = useFetch();
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState('population');
  const [op, setOp] = useState('maior que');
  const [num, setNum] = useState('0');
  // const [um, setUm] = useState([]);

  // console.log(tt);

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

  let filterByName = planetList.filter((el) => el.name.includes(search));
  useEffect(() => {
    // filterByName = planetList.filter((el) => el.name.includes(search));
    setPlanetList(filterByName);
  }, []);

  const click = () => {
    if (op === 'maior que') {
      filterByName = planetList
        // .filter((el) => el.name.includes(search))
        .filter((el) => parseInt(el[select], 10) > num);
    } if (op === 'menor que') {
      filterByName = planetList
        // .filter((el) => el.name.includes(search))
        .filter((el) => parseInt(el[select], 10) < num);
    } if (op === 'igual a') {
      filterByName = planetList
        // .filter((el) => el.name.includes(search))
        .filter((el) => parseInt(el[select], 10) === parseInt(num, 10));
    }
    setPlanetList(filterByName);
    console.log('ola', planetList);
  };

  console.log(filterByName);
  const selTwo = ['maior que', 'menor que', 'igual a'];
  const selOne = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

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
              filterByName.map((planets) => (
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
