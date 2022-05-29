import React from 'react'
import {Col} from "../../../../../core/Layout";
import {Text} from "../../../../../core";

interface numProp {
  num: string | number,
  unit: string,
}

export const NumberBox = ({num, unit}: numProp) => {
  return (
    <Col align='center' classes="px-1">
      <Col
        align='center' justify='center'
        classes="bg-black rounded-lg w-[32px] h-[32px] ipad:w-[40px] ipad:h-[40px]">
        <Text classes="absolute text-white z-10 text-xs ipad:text-sm">
          {num}
        </Text>
      </Col>
      <Text transforms='uppercase' classes="text-xs mt-2 md:text-sm dark:text-black">
        {unit}
      </Text>
    </Col>
  )
}
