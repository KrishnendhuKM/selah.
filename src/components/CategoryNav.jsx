
function CategoryNav({ categories, selected, onSelect }) {
  return (
    <nav className="categories" aria-label="Verse categories">
      {Object.keys(categories).map((category) => (
        <button
          key={category}
          className={`category ${
            selected === category ? "active" : ""
          }`}
          onClick={() => onSelect(category)}
          aria-pressed={selected === category}
        >
          {category}
        </button>
      ))}
    </nav>
  );
}

export default CategoryNav;
