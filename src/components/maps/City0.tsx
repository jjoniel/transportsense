"use client";

import * as React from "react";
import { useState } from "react";
import CongestionPopup from "../CongestionPopup";

const City0 = (props: React.SVGProps<SVGSVGElement>) => {
  const [showPopup, setShowPopup] = useState(true);

  //popup to show when user lands on the city view/chat page
  return (
    <>
      {showPopup && <CongestionPopup onClose={() => setShowPopup(false)} />}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="50 50 700 600"
    strokeLinecap="round"
    strokeLinejoin="round"
    baseProfile="tiny"
    {...props}
  >
    <clipPath id="a">
      <path d="M0 0h960v720H0V0z" />
    </clipPath>
    <g clipPath="url(#a)">
      <path fill="none" d="M0 0h960v720H0zM747.005 320.51h-45.858" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M747.005 320.51h-45.858"
      />
      <path fill="none" d="M635.465 320.51h-86.646" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M635.465 320.51h-86.646"
      />
      <path fill="none" d="m24.688 165.814 116.472.315" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="m24.688 165.814 116.472.315"
      />
      <path fill="none" d="M140.129 17.325v148" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M140.129 17.325v148"
      />
      <path fill="none" d="M324.966 431.538H24.367" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M324.966 431.538H24.367"
      />
      <path fill="none" d="M27.273 260.35h113.921" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M27.273 260.35h113.921"
      />
      <path fill="none" d="M140.638 165.606h114.645" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M140.638 165.606h114.645"
      />
      <path fill="none" d="M140.129 260.35H253.23" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M140.129 260.35H253.23"
      />
      <path fill="none" d="M139.88 165.094v95.245" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M139.88 165.094v95.245"
      />
      <path fill="none" d="M139.633 260.339V431.55" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M139.633 260.339V431.55"
      />
      <path fill="none" d="M139.633 431.538v121.48" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M139.633 431.538v121.48"
      />
      <path fill="none" d="M139.5 553.018v121.48" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M139.5 553.018v121.48"
      />
      <path fill="none" d="M24.625 553.018h115.307" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M24.625 553.018h115.307"
      />
      <path fill="none" d="M139.88 553.018h105.796" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M139.88 553.018h105.796"
      />
      <path
        fill="none"
        d="M245.034 553.33a7.244 7.244 0 1 1 14.488 0 7.244 7.244 0 0 1-14.488 0z"
      />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M245.034 553.33a7.244 7.244 0 1 1 14.488 0 7.244 7.244 0 0 1-14.488 0z"
      />
      <path fill="none" d="M259.521 553.018h125.858" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M259.521 553.018h125.858"
      />
      <path
        fill="none"
        d="M383.005 554.424c0-5.983 4.85-10.834 10.834-10.834a10.835 10.835 0 0 1 10.835 10.834c0 5.984-4.85 10.835-10.835 10.835-5.983 0-10.834-4.85-10.834-10.835z"
      />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M383.005 554.424c0-5.983 4.85-10.834 10.834-10.834a10.835 10.835 0 0 1 10.835 10.834c0 5.984-4.85 10.835-10.835 10.835-5.983 0-10.834-4.85-10.834-10.835z"
      />
      <path fill="none" d="M252.587 560.572v76.788" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M252.587 560.572v76.788"
      />
      <path fill="none" d="M255.848 639.333v36.63" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M255.848 639.333v36.63"
      />
      <path fill="none" d="m252.279 636.283 4.031 4.031" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="m252.279 636.283 4.031 4.031"
      />
      <path fill="none" d="M249.388 639.364v36.63" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M249.388 639.364v36.63"
      />
      <path fill="none" d="m252.957 636.314-4.031 4.032" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="m252.957 636.314-4.031 4.032"
      />
      <path
        fill="none"
        d="M464.205 459.616c-4.077-.849-16.731-4.5-24.46-5.094-7.728-.595-14.097.338-21.91 1.527-7.814 1.19-18.09 3.823-24.969 5.607-6.879 1.783-9.595 3.48-16.304 5.094-6.71 1.614-19.959 3.823-23.95 4.588"
      />
      <path
        stroke="#666"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={8}
        fill="none"
        d="M464.205 459.616c-4.077-.849-16.731-4.5-24.46-5.094-7.728-.595-14.097.338-21.91 1.527-7.814 1.19-18.09 3.823-24.969 5.607-6.879 1.783-9.595 3.48-16.304 5.094-6.71 1.614-19.959 3.823-23.95 4.588"
      />
      <path
        fill="none"
        d="m486.116 504.969-37.932-21.9c-10.683-6.169-19.918-9.32-26.168-15.108-6.25-5.79-7.903-10.611-11.33-19.625-3.428-9.014-7.695-22.58-9.234-34.457-1.54-11.877 0-30.673 0-36.808"
      />
      <path
        stroke="#666"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={8}
        fill="none"
        d="m486.116 504.969-37.932-21.9c-10.683-6.169-19.918-9.32-26.168-15.108-6.25-5.79-7.903-10.611-11.33-19.625-3.428-9.014-7.695-22.58-9.234-34.457-1.54-11.877 0-30.673 0-36.808"
      />
      <path fill="none" d="M26.644 676.43h49.543" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M26.644 676.43h49.543"
      />
      <path fill="none" d="M74.775 676.43h65.008" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M74.775 676.43h65.008"
      />
      <path fill="none" d="M139.94 676.43h65.008" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M139.94 676.43h65.008"
      />
      <path fill="none" d="M203.48 676.43h155.654" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M203.48 676.43h155.654"
      />
      <path fill="none" d="M359.134 676.43h40.662" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M359.134 676.43h40.662"
      />
      <path fill="none" d="M398.982 676.43h72.945" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M398.982 676.43h72.945"
      />
      <path fill="none" d="M470.392 676.43h153.984" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M470.392 676.43h153.984"
      />
      <path fill="none" d="M622.785 676.43h77.985" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M622.785 676.43h77.985"
      />
      <path fill="none" d="M698.182 676.43h47.496" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M698.182 676.43h47.496"
      />
      <path
        fill="none"
        d="M549.3 321.076c-8.648-.178-36.927-1.246-51.888-1.068-14.961.179-28.538.981-37.878 2.14-9.34 1.158-13.231 3.117-18.16 4.809-4.93 1.692-7.956 3.562-11.416 5.344-3.46 1.781-6.747 2.852-9.34 5.346-2.595 2.494-4.15 6.056-6.226 9.619-2.075 3.563-4.584 7.215-6.227 11.758-1.643 4.543-3.027 12.916-3.632 15.5"
      />
      <path
        stroke="#666"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={8}
        fill="none"
        d="M549.3 321.076c-8.648-.178-36.927-1.246-51.888-1.068-14.961.179-28.538.981-37.878 2.14-9.34 1.158-13.231 3.117-18.16 4.809-4.93 1.692-7.956 3.562-11.416 5.344-3.46 1.781-6.747 2.852-9.34 5.346-2.595 2.494-4.15 6.056-6.226 9.619-2.075 3.563-4.584 7.215-6.227 11.758-1.643 4.543-3.027 12.916-3.632 15.5"
      />
      <path fill="none" d="M393.84 677.7V565.26" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M393.84 677.7V565.26"
      />
      <path fill="none" d="M26.642 552.83v123.905" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M26.642 552.83v123.905"
      />
      <path fill="none" d="M252.74 16.816V165.1" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M252.74 16.816V165.1"
      />
      <path fill="none" d="M548.28 434.672h117.67" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M548.28 434.672h117.67"
      />
      <path fill="none" d="M252.74 166.614v92.22" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M252.74 166.614v92.22"
      />
      <path fill="none" d="M663.095 433.378h82.393" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M663.095 433.378h82.393"
      />
      <path fill="none" d="M252.739 256.966v173.26" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M252.739 256.966v173.26"
      />
      <path fill="none" d="M734.352 676.158 665.91 432.692" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M734.352 676.158 665.91 432.692"
      />
      <path fill="none" d="M666.667 435.588 634.352 321.32" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M666.667 435.588 634.352 321.32"
      />
      <path fill="none" d="m591.102 164.913 43.622 155.276" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="m591.102 164.913 43.622 155.276"
      />
      <path fill="none" d="M327.134 260.383v148.441" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M327.134 260.383v148.441"
      />
      <path fill="none" d="M429.438 434.882h117.67" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M429.438 434.882h117.67"
      />
      <path fill="none" d="M701.252 320.72h-66.898" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M701.252 320.72h-66.898"
      />
      <path
        fill="none"
        d="M324.966 260.702c2.041 0 8.246-.352 12.247 0 4.001.351 8.412.265 11.76 2.109 3.348 1.844 6.042 4.917 8.328 8.957 2.286 4.04 4 8.43 5.388 15.28s2.45 21.517 2.94 25.82"
      />
      <path
        stroke="#666"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M324.966 260.702c2.041 0 8.246-.352 12.247 0 4.001.351 8.412.265 11.76 2.109 3.348 1.844 6.042 4.917 8.328 8.957 2.286 4.04 4 8.43 5.388 15.28s2.45 21.517 2.94 25.82"
      />
      <path fill="none" d="M26.643 166.856v93.795" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M26.643 166.856v93.795"
      />
      <path fill="none" d="M26.3 260.65v130.111" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M26.3 260.65v130.111"
      />
      <path fill="none" d="M26.357 390.764v40.787" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M26.357 390.764v40.787"
      />
      <path fill="none" d="M25.663 390.75H139.08" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M25.663 390.75H139.08"
      />
      <path fill="none" d="m141.25 344.501 111.906 39.433" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="m141.25 344.501 111.906 39.433"
      />
      <path fill="none" d="m252.277 383.5 73.953 25.323" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="m252.277 383.5 73.953 25.323"
      />
      <path
        fill="none"
        d="M319.49 203.312c-.254 1.869-1.614 7.219-1.53 11.21.085 3.992 1.106 8.407 2.04 12.738.934 4.331 2.718 9.258 3.567 13.25.849 3.99 1.867 8.067 1.527 10.7-.34 2.633-1.613 3.82-3.566 5.094-1.954 1.274-6.794 2.124-8.153 2.549"
      />
      <path
        stroke="#666"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M319.49 203.312c-.254 1.869-1.614 7.219-1.53 11.21.085 3.992 1.106 8.407 2.04 12.738.934 4.331 2.718 9.258 3.567 13.25.849 3.99 1.867 8.067 1.527 10.7-.34 2.633-1.613 3.82-3.566 5.094-1.954 1.274-6.794 2.124-8.153 2.549"
      />
      <path fill="none" d="m327.042 408.433-2.016 23.685" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="m327.042 408.433-2.016 23.685"
      />
      <path fill="none" d="M137.828 319.83h115.307" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M137.828 319.83h115.307"
      />
      <path fill="none" d="M251.046 319.766h77.197" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M251.046 319.766h77.197"
      />
      <path fill="none" d="m548.28 166.115.505 511.591" />
      <path
        stroke="#666"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={8}
        fill="none"
        d="m548.28 166.115.505 511.591"
      />
      <path fill="none" d="M254.268 165.094h491.716" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M254.268 165.094h491.716"
      />
      <path
        fill="none"
        d="M296.05 18.853c.425 21.401-7.388 83.99 2.548 128.407 9.937 44.416 43.908 102.76 57.071 138.09 13.164 35.328 19.618 51.296 21.911 73.886 2.293 22.59-.679 44.586-8.152 61.656-7.473 17.07-15.966 31.847-36.688 40.764-20.722 8.917-34.906 10.445-87.646 12.738-52.739 2.293-190.658.85-228.79 1.02"
      />
      <path
        stroke="#666"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={8}
        fill="none"
        d="M296.05 18.853c.425 21.401-7.388 83.99 2.548 128.407 9.937 44.416 43.908 102.76 57.071 138.09 13.164 35.328 19.618 51.296 21.911 73.886 2.293 22.59-.679 44.586-8.152 61.656-7.473 17.07-15.966 31.847-36.688 40.764-20.722 8.917-34.906 10.445-87.646 12.738-52.739 2.293-190.658.85-228.79 1.02"
      />
      <path
        fill="none"
        d="M307.772 17.835c.509 16.05.677 70.147 3.055 96.304 2.378 26.157 2.635 37.878 11.212 60.638 8.578 22.76 27.601 50.106 40.255 75.924 12.654 25.817 29.552 56.306 35.667 78.981 6.114 22.675 3.653 39.234 1.02 57.069-2.632 17.834-7.219 35.5-16.816 49.937-9.596 14.437-20.211 27.685-40.763 36.687-20.552 9.002-28.621 14.778-82.549 17.326-53.928 2.547-200.849-1.7-241.018-2.04"
      />
      <path
        stroke="#666"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={8}
        fill="none"
        d="M307.772 17.835c.509 16.05.677 70.147 3.055 96.304 2.378 26.157 2.635 37.878 11.212 60.638 8.578 22.76 27.601 50.106 40.255 75.924 12.654 25.817 29.552 56.306 35.667 78.981 6.114 22.675 3.653 39.234 1.02 57.069-2.632 17.834-7.219 35.5-16.816 49.937-9.596 14.437-20.211 27.685-40.763 36.687-20.552 9.002-28.621 14.778-82.549 17.326-53.928 2.547-200.849-1.7-241.018-2.04"
      />
      <path
        fill="none"
        d="M375.54 342.42c1.36 6.115 4.843 18.174 8.156 36.688 3.312 18.514 2.207 53.759 11.719 74.396 9.511 20.637 24.288 34.139 45.349 49.425 21.061 15.287 63.099 28.026 81.018 42.294 17.92 14.268 22.082 36.094 26.499 43.312"
      />
      <path
        stroke="#666"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={8}
        fill="none"
        d="M375.54 342.42c1.36 6.115 4.843 18.174 8.156 36.688 3.312 18.514 2.207 53.759 11.719 74.396 9.511 20.637 24.288 34.139 45.349 49.425 21.061 15.287 63.099 28.026 81.018 42.294 17.92 14.268 22.082 36.094 26.499 43.312"
      />
      <path
        fill="none"
        d="M223.184 474.904c28.874.17 122.546-6.54 173.246 1.018s89.172 29.978 130.956 44.33c41.783 14.353 83.312 33.548 119.745 41.786 36.433 8.238 82.378 6.369 98.853 7.643"
      />
      <path
        stroke="#666"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={8}
        fill="none"
        d="M223.184 474.904c28.874.17 122.546-6.54 173.246 1.018s89.172 29.978 130.956 44.33c41.783 14.353 83.312 33.548 119.745 41.786 36.433 8.238 82.378 6.369 98.853 7.643"
      />
      <path
        fill="none"
        d="M231.184 490.904c28.874.17 122.546-6.54 173.246 1.018s89.172 29.978 130.956 44.33c41.783 14.353 83.312 33.548 119.745 41.786 36.433 8.238 82.378 6.369 98.853 7.643"
      />
      <path
        stroke="#666"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={8}
        fill="none"
        d="M231.184 490.904c28.874.17 122.546-6.54 173.246 1.018s89.172 29.978 130.956 44.33c41.783 14.353 83.312 33.548 119.745 41.786 36.433 8.238 82.378 6.369 98.853 7.643"
      />
      <path
        fill="none"
        d="M548.312 649.68c.685-5.472 1.97-21.973 4.111-32.828 2.142-10.856 7.282-21.105 8.739-32.308 1.456-11.203 2.141-22.405 0-34.91-2.142-12.506-5.997-28.225-12.85-40.123-6.853-11.898-18.16-23.884-28.267-31.266-10.108-7.382-23.04-9.9-32.376-13.025-9.337-3.127-16.362-2.78-23.643-5.733-7.28-2.953-13.446-6.166-20.042-11.984-6.596-5.819-14.906-16.935-19.531-22.927-4.626-5.993-5.396-6.254-8.223-13.028-2.826-6.774-6.337-17.368-8.736-27.616-2.398-10.247-4.712-28.224-5.654-33.869"
      />
      <path
        stroke="#666"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={8}
        fill="none"
        d="M548.312 649.68c.685-5.472 1.97-21.973 4.111-32.828 2.142-10.856 7.282-21.105 8.739-32.308 1.456-11.203 2.141-22.405 0-34.91-2.142-12.506-5.997-28.225-12.85-40.123-6.853-11.898-18.16-23.884-28.267-31.266-10.108-7.382-23.04-9.9-32.376-13.025-9.337-3.127-16.362-2.78-23.643-5.733-7.28-2.953-13.446-6.166-20.042-11.984-6.596-5.819-14.906-16.935-19.531-22.927-4.626-5.993-5.396-6.254-8.223-13.028-2.826-6.774-6.337-17.368-8.736-27.616-2.398-10.247-4.712-28.224-5.654-33.869"
      />
      <path fill="none" d="M745.873 260.55h-46.331" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M745.873 260.55h-46.331"
      />
      <path fill="none" d="M699.54 260.493H616.77" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M699.54 260.493H616.77"
      />
      <path fill="none" d="M699.681 261.926v-95.464" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M699.681 261.926v-95.464"
      />
      <path fill="none" d="M700.131 321.1v-60.536" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M700.131 321.1v-60.536"
      />
      <path fill="none" d="M700.131 433.486V318.052" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M700.131 433.486V318.052"
      />
      <path fill="none" d="M700.131 513.302V432.86" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M700.131 513.302V432.86"
      />
      <path fill="none" d="m700.522 510.472 46.614.536" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="m700.522 510.472 46.614.536"
      />
      <path fill="none" d="M26.58 167.25V16.886" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M26.58 167.25V16.886"
      />
      <path fill="none" d="M26.814 91.1H140.86" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M26.814 91.1H140.86"
      />
      <path fill="none" d="M142.025 91.192h108.819" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M142.025 91.192h108.819"
      />
      <path fill="none" d="M24.554 17.302h115.905" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M24.554 17.302h115.905"
      />
      <path fill="none" d="M139.318 17.302h115.401" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M139.318 17.302h115.401"
      />
      <path fill="none" d="M253.614 260.35h74.488" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M253.614 260.35h74.488"
      />
      <path fill="none" d="M404.674 554.424h95.717" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M404.674 554.424h95.717"
      />
      <path fill="none" d="M500.383 554.905v122.3" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M500.383 554.905v122.3"
      />
      <path fill="none" d="M591.59 14.67v148" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M591.59 14.67v148"
      />
      <path fill="none" d="M700.131 14.302v148.283" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M700.131 14.302v148.283"
      />
      <path fill="none" d="M478.042 164.593V14.231" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M478.042 164.593V14.231"
      />
      <path fill="none" d="M478.276 88.444h114.047" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M478.276 88.444h114.047"
      />
      <path fill="none" d="M593.487 88.535h108.819" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M593.487 88.535h108.819"
      />
      <path fill="none" d="M476.016 14.646H591.92" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M476.016 14.646H591.92"
      />
      <path fill="none" d="M590.78 14.646h110.362" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M590.78 14.646h110.362"
      />
      <path fill="none" d="M366.042 164.593V14.231" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M366.042 164.593V14.231"
      />
      <path fill="none" d="M366.276 88.444h114.047" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M366.276 88.444h114.047"
      />
      <path fill="none" d="M364.016 14.646H479.92" />
      <path
        stroke="var(--white)"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M364.016 14.646H479.92"
      />
    </g>
  </svg>
);
    </>
  );
};

export default City0;
