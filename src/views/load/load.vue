<template>
    <svg xmlns="http://www.w3.org/2000/svg" height="128px" width="128px" viewBox="0 0 128 128" class="pl">
      <defs>
        <linearGradient y2="1" x2="0" y1="0" x1="0" id="pl-grad">
          <stop stop-color="hsl(193,90%,55%)" offset="0%"></stop>
          <stop stop-color="hsl(223,90%,55%)" offset="100%"></stop>
        </linearGradient>
      </defs>
      <circle stroke-linecap="round" stroke-width="16" stroke="hsla(0,10%,10%,0.1)" fill="none" cy="64" cx="64" r="56" class="pl__ring"></circle>
      <path stroke-dashoffset="10" stroke-dasharray="44 1111" stroke-linejoin="round" stroke-linecap="round" stroke-width="16" stroke="url(#pl-grad)" fill="none" d="M92,15.492S78.194,4.967,66.743,16.887c-17.231,17.938-28.26,96.974-28.26,96.974L119.85,59.892l-99-31.588,57.528,89.832L97.8,19.349,13.636,88.51l89.012,16.015S81.908,38.332,66.1,22.337C50.114,6.156,36,15.492,36,15.492a56,56,0,1,0,56,0Z" class="pl__worm"></path>
    </svg>
    </template>
    
    <script>
    export default {
      name: 'LoadAnimation',
    }
    </script>
    
    <style>
    .pl,
    .pl__worm {
     animation-duration: 4s;
     animation-iteration-count: infinite;
    }
    
    .pl {
     animation-name: bump5;
     animation-timing-function: linear;
     width: 5em;
     height: 5em;
    }
    
    .pl__ring {
     stroke: hsla(var(--hue),10%,10%,0.1);
     transition: stroke 0.3s;
     box-shadow: rgb(71, 195, 248) 0px 1px 15px 0px;

    }
    
    .pl__worm {
     animation-name: worm5;
     animation-timing-function: cubic-bezier(0.42,0.17,0.75,0.83);
    }
    
    @keyframes bump5 {
     from,
      42%,
      46%,
      51%,
      55%,
      59%,
      63%,
      67%,
      71%,
      74%,
      78%,
      81%,
      85%,
      88%,
      92%,
      to {
      transform: translate(0,0);
     }
    
     44% {
      transform: translate(1.33%,6.75%);
     }
    
     53% {
      transform: translate(-16.67%,-0.54%);
     }
    
     61% {
      transform: translate(3.66%,-2.46%);
     }
    
     69% {
      transform: translate(-0.59%,15.27%);
     }
    
     76% {
      transform: translate(-1.92%,-4.68%);
     }
    
     83% {
      transform: translate(9.38%,0.96%);
     }
    
     90% {
      transform: translate(-4.55%,1.98%);
     }
    }
    
    @keyframes worm5 {
     from {
      stroke-dashoffset: 10;
     }
    
     25% {
      stroke-dashoffset: 295;
     }
    
     to {
      stroke-dashoffset: 1165;
     }
    }
    </style>
    