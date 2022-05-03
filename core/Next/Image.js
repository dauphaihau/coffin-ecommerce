import NextImage from "next/image";

const Image = ({classesSize, src, classes, alt, ...others}) => {
  return (
    <div className={`relative ${classesSize}`}>
      <NextImage
        src={src}
        className={classes}
        layout='fill'
        objectFit='contain'
        alt={alt}
        {...others}
      />
    </div>
  );
}

export default Image;