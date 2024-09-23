import React from "react";
import { randomInt } from "./utils";

const FISH_TYPES = 3;
const MOVEMENT_TIMEOUT = 3000;

export function AquariumFish({ handleRef, isAlive = true }) {
  const [type, _t] = React.useState(randomInt(1, FISH_TYPES));
  const [x, setX] = React.useState(randomInt(0, 100));
  const [y, setY] = React.useState(randomInt(0, 100));
  const [isFast, setIsFast] = React.useState(false);
  const [isFlipped, setIsFlipped] = React.useState(false);

  const [timeoutAdj, _ta] = React.useState(randomInt(0, 3) * 1000);
  const animationDelay = -(timeoutAdj % 3) * 500;
  const timeoutRef = React.useRef();

  const setRandomPosition = React.useCallback(
    (isFast) => {
      if (!isAlive) {
        return;
      }
      setX((x) => {
        const nextX = randomInt(0, 100);
        setIsFlipped(x < nextX);
        return nextX;
      });
      setY(randomInt(0, 100));
      setIsFast(isFast);
    },
    [setX, setY, setIsFast, setIsFlipped, isAlive]
  );

  React.useImperativeHandle(handleRef, () => ({ setRandomPosition }));

  React.useEffect(() => {
    if (!isAlive) {
      return;
    }

    function updatePosition() {
      timeoutRef.current = setTimeout(() => {
        setIsFast(false);
        setRandomPosition();
        updatePosition();
      }, MOVEMENT_TIMEOUT + timeoutAdj);
    }

    updatePosition();
    return () => {
      setIsFast(false);
      clearTimeout(timeoutRef.current);
    };
  }, [setRandomPosition, setIsFast, timeoutAdj, isAlive]);

  React.useEffect(() => {
    if (isAlive) {
      setRandomPosition();
    } else {
      setY(0);
    }
  }, [isAlive, setRandomPosition]);

  return (
    <div
      className={`fish-container ${isFast ? "fast" : ""}`}
      style={{ transform: `translateY(${y}%) translateX(${x}%)` }}
    >
      <div
        className={`fish type-${type}`}
        style={{ animationDelay: `${animationDelay}ms` }}
      >
        <SVGFish scale={[isFlipped ? -1 : 1, isAlive ? 1 : -1]} />
      </div>
    </div>
  );
}

function SVGFish({ scale }) {
  return (
    <svg version="1.1" style={{ transform: `scale(${scale[0]}, ${scale[1]})` }}>
      <g transform="matrix(0.210009,0,0,0.207598,-10.8866,-16.4151)">
        <path d="M106.583,84.109C111.61,84.109 122.853,77.987 127.866,79.241C131.496,80.148 122.124,89.272 120.879,90.661C120.846,90.698 136.315,91.978 151.161,88.766C154.59,88.024 165.971,86.714 166.112,90.458C166.322,96.056 162.05,94.872 160.157,98.869C158.754,101.832 161.602,102.443 159.961,107.088C159.125,109.455 155.856,111.125 155.408,113.514C154.94,116.014 156.003,117.119 154.832,120.23C153.818,122.924 152.299,121.953 150.696,124.656C149.672,126.383 149.613,129.743 148.63,131.894C147.367,134.66 145.229,136.079 144.451,136.363C136.964,139.094 133.062,130.284 129.206,124.662C120.472,111.928 102.06,108.703 101.814,108.925C99.788,110.762 104.184,118.061 101.647,118.061C97.813,118.061 94.096,110.022 90.851,108.896C88.413,108.051 72.185,107.681 62.19,102.182C58.45,100.124 50.968,96.918 51.922,92.325C52.658,88.777 62.449,85.51 65.663,84.932C81.247,82.126 97.672,84.109 106.583,84.109Z" />
      </g>
    </svg>
  );
}
