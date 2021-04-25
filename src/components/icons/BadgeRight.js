import React from 'react';

export default function BadgeRight({ size, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 174 166"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: '0 0.375rem 0 0' }}
    >
      <path d="M0.5 0.5H173.5V165.5L0.5 0.5Z" fill="#89B53D" />
      <path
        d="M95.9201 25.5138L112.22 11.7583L117.038 17.4676C118.707 19.4454 119.592 21.2667 119.694 22.9316C119.803 24.5901 119.126 26.0367 117.663 27.2711C116.865 27.9451 115.986 28.335 115.028 28.441C114.077 28.5407 113.151 28.3445 112.25 27.8525C112.747 28.8647 112.879 29.8773 112.648 30.8903C112.423 31.9108 111.852 32.8083 110.934 33.583C109.366 34.9057 107.758 35.4071 106.108 35.0872C104.458 34.7674 102.844 33.6883 101.267 31.8501L95.9201 25.5138ZM105.852 22.8826L101.452 26.5954L103.88 29.4725C104.548 30.2636 105.254 30.7218 105.999 30.8472C106.757 30.9738 107.469 30.7568 108.133 30.1963C109.626 28.9366 109.731 27.5249 108.45 25.9611L105.852 22.8826ZM108.225 20.8797L110.322 23.3649C111.782 25.0339 113.172 25.3109 114.493 24.1961C115.232 23.5726 115.579 22.909 115.535 22.2053C115.504 21.5028 115.099 20.6888 114.318 19.7634L112.334 17.4125L108.225 20.8797ZM123.907 44.3457L118.466 37.8975L114.1 41.582L120.486 49.1497L117.788 51.4265L108.568 40.5004L124.867 26.7449L134.069 37.6486L131.349 39.9443L124.981 32.3991L121.097 35.6774L126.538 42.1255L123.907 44.3457ZM131.151 58.5838C131.785 58.0484 132.081 57.4151 132.039 56.6839C132.004 55.9464 131.682 54.8381 131.073 53.3589C130.471 51.8734 130.066 50.6368 129.859 49.6491C129.297 46.9542 129.863 44.8919 131.557 43.4622C132.438 42.719 133.429 42.304 134.532 42.2171C135.648 42.1314 136.79 42.3875 137.959 42.9854C139.135 43.5908 140.211 44.4719 141.187 45.6287C142.169 46.7929 142.832 48.0098 143.175 49.2793C143.526 50.5425 143.528 51.7485 143.181 52.8973C142.84 54.0535 142.181 55.0441 141.204 55.8692L138.369 52.5108C139.116 51.881 139.496 51.1578 139.509 50.3412C139.531 49.5183 139.182 48.6815 138.464 47.8307C137.771 47.0097 137.057 46.5196 136.322 46.3604C135.595 46.1949 134.948 46.3514 134.38 46.8301C133.851 47.2773 133.63 47.917 133.719 48.7492C133.814 49.5888 134.143 50.6596 134.705 51.9615C135.743 54.3571 136.204 56.3504 136.091 57.9416C135.977 59.5328 135.285 60.8638 134.017 61.9345C132.606 63.1249 131.047 63.5266 129.341 63.1396C127.642 62.7462 126.03 61.6465 124.506 59.8405C123.448 58.5866 122.712 57.2527 122.298 55.8386C121.891 54.4182 121.857 53.0986 122.196 51.8799C122.541 50.6686 123.24 49.6189 124.292 48.7309L127.136 52.1005C125.337 53.6184 125.345 55.452 127.159 57.6014C127.833 58.4 128.519 58.8877 129.218 59.0647C129.924 59.2354 130.568 59.075 131.151 58.5838ZM155.869 68.9996L151.655 64.0068L138.076 75.4665L135.242 72.1081L148.821 60.6483L144.664 55.7227L147.385 53.4269L158.589 66.7039L155.869 68.9996Z"
        fill="white"
      />
      <path
        d="M91.6422 40.7431C92.0228 40.4219 92.2005 40.042 92.1753 39.6032C92.1545 39.1607 91.9613 38.4957 91.5957 37.6082C91.2345 36.7169 90.9917 35.975 90.8673 35.3823C90.5301 33.7654 90.8698 32.528 91.8863 31.6702C92.4146 31.2243 93.0095 30.9753 93.6709 30.9231C94.3405 30.8717 95.0261 31.0254 95.7275 31.3841C96.4328 31.7474 97.0782 32.276 97.664 32.9701C98.2535 33.6686 98.6512 34.3988 98.857 35.1605C99.0672 35.9184 99.0684 36.642 98.8603 37.3312C98.6561 38.025 98.2606 38.6194 97.674 39.1144L95.9735 37.0994C96.4213 36.7215 96.6493 36.2875 96.6575 35.7976C96.6702 35.3039 96.4611 34.8017 96.0303 34.2913C95.6146 33.7987 95.1863 33.5046 94.7453 33.4091C94.3088 33.3098 93.9204 33.4037 93.5801 33.6909C93.2622 33.9592 93.1299 34.3431 93.1832 34.8424C93.2404 35.3462 93.4376 35.9887 93.7748 36.7698C94.3974 38.2071 94.6745 39.4031 94.6062 40.3579C94.5379 41.3126 94.1231 42.1111 93.3618 42.7536C92.5155 43.4678 91.5803 43.7088 90.5563 43.4766C89.5368 43.2406 88.5698 42.5808 87.6553 41.4972C87.0204 40.7449 86.5788 39.9445 86.3304 39.096C86.0866 38.2438 86.0663 37.452 86.2695 36.7208C86.4766 35.994 86.8958 35.3642 87.5272 34.8314L89.2334 36.8532C88.1542 37.7639 88.1588 38.8641 89.2472 40.1537C89.6515 40.6329 90.0633 40.9255 90.4826 41.0317C90.9064 41.1341 91.2929 41.0379 91.6422 40.7431ZM101.317 48.814L98.0519 44.9451L95.4324 47.1558L99.2643 51.6964L97.6455 53.0625L92.1131 46.5069L101.893 38.2535L107.414 44.7957L105.782 46.1732L101.961 41.646L99.6304 43.613L102.895 47.4819L101.317 48.814ZM102.137 55.0999L105.747 59.3786L104.129 60.7447L98.8173 54.451L108.597 46.1977L110.298 48.2127L102.137 55.0999ZM108.603 62.762L112.214 67.0406L110.595 68.4067L105.283 62.113L115.063 53.8597L116.764 55.8748L108.603 62.762ZM120.954 72.0822L117.688 68.2133L115.069 70.424L118.901 74.9646L117.282 76.3307L111.75 69.7751L121.529 61.5218L127.05 68.064L125.418 69.4414L121.598 64.9143L119.267 66.8812L122.532 70.7501L120.954 72.0822ZM125.089 78.3183L123.734 76.713L120.154 79.7343L118.454 77.7192L128.234 69.4659L131.3 73.0997C132.275 74.255 132.77 75.3634 132.784 76.4249C132.798 77.4864 132.335 78.4139 131.394 79.2075C130.727 79.7706 130.047 80.0955 129.353 80.1824C128.668 80.2699 127.946 80.1318 127.187 79.7682L124.976 85.2567L124.882 85.3361L123.057 83.1733L125.089 78.3183ZM125.367 75.3355L126.738 76.961C127.165 77.467 127.624 77.7511 128.113 77.8133C128.607 77.8718 129.08 77.7102 129.533 77.3285C129.994 76.9393 130.245 76.5011 130.286 76.0139C130.331 75.5312 130.125 75.019 129.668 74.4771L128.302 72.8584L125.367 75.3355Z"
        fill="white"
      />
    </svg>
  );
}
