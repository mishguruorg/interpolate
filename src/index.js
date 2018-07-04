import { compose, map, mean, reduceRight, reduce, assoc } from 'ramda'

const interpolateSumX = (points) => interpolatePoints(points, true)

const interpolatePoints = (points, annotate = false) => {
  if (points.length === 1) {
    return {
      y: points[0].y,
      x: points[0].x
    }
  }

  const meanY = findMeanY(points)
  const annotatedPoints = annotate
    ? reduce(annotatePoint, { annotatedPoints: [], currentX: 0 }, points).annotatedPoints
    : points

  const { left, right } = findSuitablePair(meanY, annotatedPoints)
  const leftY = left.y
  const rightY = right.y

  if (rightY === meanY) {
    return right
  }

  if (leftY === meanY) {
    return left
  }

  const fraction = (meanY - leftY) / (rightY - leftY)

  return interpolate(left, right, fraction)
}

const findMeanY = compose(
  mean,
  map((p) => p.y)
)

const annotatePoint = (acc, point) => {
  const { annotatedPoints, currentX } = acc
  const updatedX = currentX + point.x
  return {
    currentX: updatedX,
    annotatedPoints: [...annotatedPoints, assoc('x', updatedX, point)]
  }
}

const findSuitablePair = (meanY, points) => {
  const testPair = (point, acc) => {
    const makeRight = assoc('right', point)
    const makeLeft = assoc('left', point)
    const { left, right } = acc

    if (left && right) {
      return acc
    }

    if (right === undefined) {
      return makeRight(acc)
    }

    if (inRange(point.y, right.y, meanY)) {
      return makeLeft(acc)
    }

    return makeRight(acc)
  }

  return reduceRight(testPair, {}, points)
}

const inRange = (a, b, testNumber) => {
  const min = Math.min(a, b)
  const max = Math.max(a, b)

  return (testNumber >= min && testNumber <= max)
}

const interpolate = ({ x: x1, y: y1 }, { x: x2, y: y2 }, fraction) => {
  const x = x1 + (x2 - x1) * fraction
  const y = y1 + (y2 - y1) * fraction
  return { x, y }
}

export {
  interpolate,
  interpolatePoints,
  interpolateSumX
}

export default interpolatePoints
