import React from 'react';
import { HomeBanner, Location, Description, DescriptionMobile } from '../components';

export default function Home() {
  return (
    <div>
      <HomeBanner />
      <div id='description' className="hidden lg:block">
        <Description />
      </div>
      <div id='description' className="block lg:hidden">
        <DescriptionMobile />
      </div>
      <Location />
    </div>
  );
}