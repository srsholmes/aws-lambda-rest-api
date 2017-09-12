import test from 'tape';
import sinon from 'sinon';
import list from '../src/list';

test('list', async t => {

  const items = [
    {
      Item: 'My mock item 1',
    },
    {
      Item: 'My mock item 2',
    },
  ];

  const mockDB = {
    scan: () => ({
      promise: () => Promise.resolve(items),
    }),
  };

  const event = {
    body: JSON.stringify({}),
    pathParameters: {
      id: '1111',
    },
  };

  const spy = sinon.spy();
  await list(mockDB)(event, null, spy);
  const callArgs = spy.getCalls()[ 0 ].args;
  const res = JSON.parse(callArgs[ 1 ].body);

  t.equals(callArgs[ 0 ], null, 'The function should call the callback with null as first argument');
  t.equals(callArgs[ 1 ].statusCode, 200, 'The function should respond with a 200 status code');
  t.deepEquals(res, items, 'The function should respond with the correct entries');
  t.end();
});

test('list - Error ', async t => {

  const mockDB = {
    scan: () => ({
      promise: () => Promise.reject([]),
    }),
  };
  
  const event = {
    body: JSON.stringify({}),
  };

  const spy = sinon.spy();
  await list(mockDB)(event, null, spy);
  const callArgs = spy.getCalls()[ 0 ].args;
  t.ok(callArgs[ 0 ] instanceof Error, 'The callback should be called with an Error.');
  t.end();
});
