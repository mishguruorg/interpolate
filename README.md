# interpolate
Interpolate takes a list of points and finds the best guess of where data would lie given the mean of the Y value using a 'best guess' method.

Interpolate works by taking your points, parsing them from the right, and finding the first place where the average Y fits between two points. It is really only useful for very specific circumstances although Pull Requests are welcome if you would like to see this functionality extended. 

## Installation

`npm install @mishguru/interpolate`

## Usage

The best way to figure out how to use this library is to look at src/index.spec.js file.

```
import interpolate from '@mishguru/interpolate'

const points = [{ x: 1, y: 2 }, { x: 3, y: 4 }]
const result = interpolate(points)
result.x === 2 //true
result.y === 3
```
