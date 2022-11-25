import { useState } from 'react';
import useFetch from '../hook/useFetch';

function Home() {
  const { tableList, planetList } = useFetch();
  const [search, setSearch] = useState('');

  const filterByName = planetList.filter((el) => el.name.includes(search));

  return (
    <div>
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
