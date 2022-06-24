import NextImage from "next/image";
import {Box} from "../Layout";

interface Image {
  width?: number,
  height?: number,
  src: string,
  alt?: string,
  classes?: string,
  classesSize?: string,
  normalTag?: boolean,
}

const Image = (props: Image) => {
  const {classesSize, width, normalTag, height, src, classes, alt, ...others} = props;

  return (
    <Box classes={`relative ${classesSize}`}>
      {
        normalTag ?
          <img
            className={classes}
            src={src}
            alt={alt}
          /> :
          <NextImage
            src={src}
            className={classes}
            layout='fill'
            objectFit='contain'
            alt={alt}
            {...others}
          />
      }
    </Box>
  );
}

export default Image;