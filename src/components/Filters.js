function Filters() {
  const selOne = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const selTwo = ['maior que', 'menor que', 'igual a'];

  return (
    <div>
      <div>
        <select
          data-testid="column-filter"
          onChange={ (e) => setSearch(e.target.value) }
        >
          {selOne
            .map((sel) => (
              <option key={ sel }>{ sel }</option>
            ))}
        </select>
      </div>
      <div>
        <select
          data-testid="comparison-filter"
          onChange={ (e) => console.log(e.target.value) }
        >
          {selTwo
            .map((sel) => (
              <option key={ sel }>{ sel }</option>
            ))}
        </select>
        <input
          type="number"
          onChange={ (e) => console.log(e.target.value) }
        />
      </div>
      <div>
        <button
          type="button"
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </div>
    </div>
  );
}

export default Filters;
