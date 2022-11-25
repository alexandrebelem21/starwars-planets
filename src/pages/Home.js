import { useEffect, useState } from 'react';

function Home() {
  const [planetRepos, setPlanetRepos] = useState([]);
  const [a, aa] = useState([]);

  useEffect(() => {
    const fetchPlanetList = async () => {
      try {
        const url = 'https://swapi.dev/api/planets';
        const response = await fetch(url);
        const repos = await response.json();
        const result = repos.results;
        result.map((del) => delete del.residents);
        const filtered = Object.keys(result[0]);
        aa(filtered);
        setPlanetRepos(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlanetList();
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            {a
              .map((tt) => (
                <th key={ tt }>
                  { tt }
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {
            planetRepos.map((repoa) => (
              <tr key={ repoa.name }>
                {
                  Object.values(repoa)
                    .map((tta) => (
                      <th key={ tta.name }>
                        { tta }
                      </th>
                    ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Home;
