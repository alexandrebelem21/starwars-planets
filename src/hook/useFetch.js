import { useEffect, useState } from 'react';

function useFetch() {
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

  return { planetList, tableList };
}

export default useFetch;
