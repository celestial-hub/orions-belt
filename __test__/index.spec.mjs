import test from 'ava'

import { transpile_to } from '../index.js'

test('should transpile', (t) => {
  console.log(transpile_to("t0: i32 = 0"));
})
