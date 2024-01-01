import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import altAvatar from "../assets/altAvatar.jpg";
import { CircularProgress, Box } from "@mui/material";

function ImageComponent({ src, alt }) {
  // let imgRef = useRef();
  let [img, setImg] = useState(null);
  let [loaded, setLoaded] = useState(false);
  let [error, setError] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };
  useEffect(() => {
    setImg(src);
  }, [src, img]);
  return (
    <>
      <img
        src={error ? altAvatar : img}
        // src={img}
        height="100%"
        alt={alt}
        className="h-full object-contain"
        onLoad={handleLoad}
        onError={handleError}
      />
      {!loaded && (
        <Box className="flex justify-center items-center">
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

ImageComponent.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};
export default ImageComponent;
