function IntroContent() {
  return (
    <div className="intro">
      <h2>Bienvenido a SpaceBoard</h2>
      <p>
        SpaceBoard es un espacio para los amantes del universo, donde puedes compartir tus anecdotas, conocimientos y cualquier cosa sobre el espacio.
      </p>
      <div className="videos">
        <iframe
          width="300"
          height="200"
          src="https://www.youtube.com/embed/EJXTZ5jpSmk"
          title="Cómo se ve la Tierra desde el espacio"
          frameBorder="0"
          allowFullScreen
        ></iframe>
        <iframe
          width="300"
          height="200"
          src="https://www.youtube.com/embed/pSHVbLPWA28"
          title="El universo explicado"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default IntroContent;
