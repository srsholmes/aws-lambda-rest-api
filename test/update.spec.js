import test from 'tape';
import sinon from 'sinon';
import update from '../src/update';

test('update', async t => {

  const items = Array.from({ length: 5 }).map((x, i) => ({ Item: `My Item ${i}` }));

  const mockDB = {
    update: () => ({
      promise: () => Promise.resolve(items),
    }),
  };

  const event = {
    body: JSON.stringify({
      entry: { one: 'one', two: 'two' },
      domain: 'www.update.com',
    }),
    pathParameters: {
      id: '1111',
    },
  };

  const spy = sinon.spy();
  await update(mockDB)(event, null, spy);
  const callArgs = spy.getCalls()[ 0 ].args;
  const res = JSON.parse(callArgs[ 1 ].body);

  t.equals(callArgs[ 0 ], null, 'The function should call the callback with null as first argument');
  t.equals(callArgs[ 1 ].statusCode, 200, 'The function should respond with a 200 status code');
  t.deepEquals(res, items, 'The function should respond with the correct entries');
  t.end();
});

test('update - No Domain', async t => {

  const items = Array.from({ length: 5 }).map((x, i) => ({ Item: `My Item ${i}` }));

  const mockDB = {
    update: () => ({
      promise: () => Promise.resolve(items),
    }),
  };

  const event = {
    body: JSON.stringify({
      entry: { one: 'one', two: 'two' }
    }),
    pathParameters: {
      id: '1111',
    },
  };

  const spy = sinon.spy();
  await update(mockDB)(event, null, spy);
  const callArgs = spy.getCalls()[ 0 ].args;
  const res = JSON.parse(callArgs[ 1 ].body);

  t.equals(callArgs[ 0 ], null, 'The function should call the callback with null as first argument');
  t.equals(callArgs[ 1 ].statusCode, 200, 'The function should respond with a 200 status code');
  t.deepEquals(res, items, 'The function should respond with the correct entries');
  t.end();
});

test('update - Error ', async t => {
  const event = {
    body: JSON.stringify({}),
  };
  const spy = sinon.spy();
  await update({})(event, null, spy);
  const callArgs = spy.getCalls()[ 0 ].args;
  t.ok(callArgs[ 0 ] instanceof Error, 'The callback should be called with an Error.');
  t.end();
});
