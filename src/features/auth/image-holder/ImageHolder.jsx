import "./image-holder.css";

function ImageHolder({illustrator}) {
  return (
    <aside aria-label="Illustration">
      <div className="blob-background"></div>
      <img src={illustrator} alt="login-illustrator" className="illustrator" />
    </aside>
  );
}

export default ImageHolder;
