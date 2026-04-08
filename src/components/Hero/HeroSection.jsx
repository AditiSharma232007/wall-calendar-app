export default function HeroSection({ month, year, image }) {
  return (
    <div style={container}>
      
      {/*  BLURRED BACKGROUND */}
      <div
        style={{
          ...backgroundImage,
          backgroundImage: `url(${image})`
        }}
      ></div>

      /*  MAIN IMAGE */
      <img src={image} alt={month} style={mainImage} />

      /* OVERLAY */
      <div style={overlay}></div>

      /* TEXT */
      <div style={textContainer}>
        <h1 style={title}>{month}</h1>
        <p style={subtitle}>{year}</p>
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const container = {
  position: "relative",
  height: 300,
  borderRadius: 16,
  overflow: "hidden"
};

const backgroundImage = {
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "blur(20px)",
  transform: "scale(1.2)"
};

const mainImage = {
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "contain", 
  zIndex: 1
};

const overlay = {
  position: "absolute",
  width: "100%",
  height: "100%",
  background:
    "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
  zIndex: 2
};

const textContainer = {
  position: "absolute",
  bottom: 20,
  left: 20,
  color: "white",
  zIndex: 3
};

const title = {
  margin: 0,
  fontSize: 28,
  fontWeight: "bold"
};

const subtitle = {
  margin: 0,
  fontSize: 16
};