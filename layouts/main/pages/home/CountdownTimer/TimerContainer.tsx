import React from 'react'
import {Grid} from '../../../../../core/Layout';
import {NumberBox} from './NumberBox'

interface timeProps {
  days: number | string,
  hours: number | string,
  minutes: number | string,
  seconds: number | string,
}

export const TimerContainer = ({days, hours, minutes, seconds}: timeProps) => {

  if (days < 10) {
    days = "0" + days
  }

  if (hours < 10) {
    hours = "0" + hours
  }

  if (minutes < 10) {
    minutes = "0" + minutes
  }

  if (seconds < 10) {
    seconds = "0" + seconds
  }

  return (
    <Grid sx={4} gap={1}>
      <NumberBox num={days} unit="Days"/>
      <NumberBox num={hours} unit="Hours"/>
      <NumberBox num={minutes} unit="Mins"/>
      <NumberBox num={seconds} unit="Secs"/>
    </Grid>
  )
}
