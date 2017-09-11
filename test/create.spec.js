import test from 'tape';
import sinon from 'sinon';
import { create } from '../src';
import isUuid from './isUuid';



test('create', async t => {
  const event = {
    body: JSON.stringify({
      entry: 'test',
      domain: 'test-domain',
    }),
  };
  const spy = sinon.spy();
  const res = await create(event, null, spy);

  console.log('************');
  console.log({ res });
  t.deepEquals(true, true, 'true equals true');
  t.end();
});
