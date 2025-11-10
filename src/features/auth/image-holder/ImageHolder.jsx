import "./image-holder.css";

function ImageHolder({ illustrator }) {
  return (
    <aside className="image-holder" aria-label="Illustration">
      <div className="image-holder__blob"></div>
      <img 
        src={illustrator} 
        alt="Login illustration" 
        className="image-holder__illustrator" 
      />
    </aside>
  );
}

export default ImageHolder;