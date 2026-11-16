
function Background() {
  const orbs = [
    { x: "12%", y: "18%", size: "95px", duration: "18s", delay: "-3s", drift: "35px" },
    { x: "75%", y: "12%", size: "125px", duration: "23s", delay: "-8s", drift: "-40px" },
    { x: "42%", y: "38%", size: "75px", duration: "16s", delay: "-5s", drift: "28px" },
    { x: "88%", y: "55%", size: "110px", duration: "25s", delay: "-12s", drift: "-30px" },
    { x: "20%", y: "70%", size: "130px", duration: "21s", delay: "-7s", drift: "45px" },
    { x: "58%", y: "82%", size: "85px", duration: "19s", delay: "-10s", drift: "-35px" },
    { x: "5%", y: "45%", size: "70px", duration: "22s", delay: "-4s", drift: "25px" },
    { x: "68%", y: "62%", size: "100px", duration: "26s", delay: "-15s", drift: "-45px" },
    { x: "35%", y: "8%", size: "65px", duration: "17s", delay: "-9s", drift: "30px" }
  ];

  return (
    <div className="background" aria-hidden="true">
      <div className="glow glow-one" />
      <div className="glow glow-two" />

      {orbs.map((orb, index) => (
        <span
          key={index}
          className="light-orb"
          style={{
            "--x": orb.x,
            "--y": orb.y,
            "--size": orb.size,
            "--duration": orb.duration,
            "--delay": orb.delay,
            "--drift": orb.drift
          }}
        />
      ))}

      {Array.from({ length: 24 }, (_, index) => (
        <span
          key={`particle-${index}`}
          className="particle"
          style={{
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
