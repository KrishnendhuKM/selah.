
function Background() {
  return (
    <div className="background" aria-hidden="true">
      <div className="glow glow-one" />
      <div className="glow glow-two" />

      {Array.from({ length: 18 }, (_, index) => (
        <span
          key={index}
          className="particle"
          style={{
            "--i": index,
            "--x": `${(index * 37 + 13) % 100}%`,
            "--delay": `${(index % 9) * -1.7}s`,
            "--duration": `${9 + (index % 7) * 2}s`
          }}
        />
      ))}
    </div>
  );
}

export default Background;
