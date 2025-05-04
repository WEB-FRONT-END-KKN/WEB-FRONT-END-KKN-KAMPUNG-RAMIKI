import React from 'react'
import {HomeBanner, Location, Description} from '../components'

export default function home() {
  return (
    <div>
      <HomeBanner />
      <Description />
      <Location />
    </div>
  )
}
