import test from 'tape';
import sinon from 'sinon';
import get from '../src/get';

test('get', async t => {

  const mockDB = {
    get: () => ({
      promise: () => Promise.resolve({
        Item: 'My mock item'
      }),
    }),
  };

  const event = {
    body: JSON.stringify({}),
    pathParameters: {
      id: '1111',
    },
  };

  const spy = sinon.spy();
  await get(mockDB)(event, null, spy);
  const callArgs = spy.getCalls()[ 0 ].args;
  const res = JSON.parse(callArgs[ 1 ].body);

  t.equals(callArgs[ 0 ], null, 'The function should call the callback with null as first argument');
  t.equals(callArgs[ 1 ].statusCode, 200, 'The function should respond with a 200 status code');
  t.equals(res, 'My mock item', 'The function should respond with the correct entry');
  t.end();
});

test('get - Error ', async t => {
  const event = {
    body: JSON.stringify({}),
  };

  const spy = sinon.spy();
  await get({})(event, null, spy);
  const callArgs = spy.getCalls()[ 0 ].args;
  t.ok(callArgs[0] instanceof Error, 'The callback should be called with an Error.');
  t.end();
});
