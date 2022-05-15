import NextImage from "next/image";

interface Image {
  width?: number,
  height?: number,
  src: string,
  alt?: string,
  classes?: string,
  classesSize?: string,
}

const Image = (props: Image) => {
  const {classesSize, width, height, src, classes, alt, ...others} = props;

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