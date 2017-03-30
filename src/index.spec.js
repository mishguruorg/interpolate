import test from 'ava'
import { map } from 'ramda'

import { interpolate, interpolatePoints } from './'

test('Interpolate should give us a fractional value between two points', (t) => {
  const point1 = {
    y: 10,
    x: 4
  }

  const point2 = {
    y: 20,
    x: 6
  }
  const normalRes = interpolate(point1, point2, 0.5)
  const oppositeRes = interpolate(point2, point1, 0.5)
  const zeroFraction = interpolate(point2, point1, 0)
  const oneFraction = interpolate(point2, point1, 1)
  const craaaazyFraction = interpolate(point2, point1, 0.683745298347502)

  t.is(normalRes.y, 15)
  t.is(oppositeRes.y, 15)
  t.is(normalRes.x, 5)
  t.is(oppositeRes.x, 5)

  t.is(zeroFraction.x, point2.x)
  t.is(oneFraction.x, point1.x)
  t.is(craaaazyFraction.x, 4.632509403304996)
})

test('interpolateViewsForProgress should take a list of points and tell us, on average how far the average views lie in the list', t => {
  const easyInfo = [[2, 2], [2, 4], [2, 6], [2, 8], [2, 10]]
  checkInterpolateViewsForProgress(t, easyInfo, 6, 6)

  const allTheSameInfo = [[2, 8], [9, 8], [1, 8], [7, 8], [1, 8]]
  checkInterpolateViewsForProgress(t, allTheSameInfo, 8, 20)

  const taperedOff = [[2, 4], [2, 5], [2, 5], [2, 5], [2, 6]]
  checkInterpolateViewsForProgress(t, taperedOff, 5, 8)

  const downwardTrend = [[2, 10], [2, 9], [2, 8], [2, 7]]
  checkInterpolateViewsForProgress(t, downwardTrend, 8.5, 5)

  const thatsNumberwang = [[2, 10]]
  checkInterpolateViewsForProgress(t, thatsNumberwang, 10, 2)

  const doubleNumberwang = [[2, 20], [7, 10]]
  checkInterpolateViewsForProgress(t, doubleNumberwang, 15, 5.5)
})

const checkInterpolateViewsForProgress = (t, pairs, expectedy, expectedx) => {
  const result = interpolatePoints(convertPairsToPoints(pairs), true)

  t.is(result.y, expectedy)
  t.is(result.x, expectedx)
}

const convertPairsToPoints = map(([x, y]) => ({ x, y }))

