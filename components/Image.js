import NextImage from "next/image";

const Image = ({classesSize, src, classes, alt}) => {
  return (
    <div className={`relative ${classesSize} `}>
      <NextImage
        src={src}
        className={classes}
        layout='fill'
        objectFit='contain'
        alt={alt}
      />
    </div>
  );
}

export default Image;