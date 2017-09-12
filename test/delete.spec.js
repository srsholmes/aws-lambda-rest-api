import test from 'tape';
import sinon from 'sinon';
import del from '../src/delete';


test('delete', async t => {
  const mockDB = {
    delete: () => ({
      promise: () => Promise.resolve(),
    }),
    put: () => ({
      promise: () => Promise.resolve(),
    }),
  };

  const event = {
    body: JSON.stringify({}),
    pathParameters: {
      id: '1111',
    },
  };
  const spy = sinon.spy();
  await del(mockDB)(event, null, spy);
  const callArgs = spy.getCalls()[ 0 ].args;

  t.equals(callArgs[ 0 ], null, 'The function should call the callback with null as first argument');
  t.equals(callArgs[ 1 ].statusCode, 200, 'The function should respond with a 200 status code');
  t.equals(callArgs[ 1 ].body, '{}', 'The function should respond with an empty entry');
  t.end();
});


test('delete - Error ', async t => {
  const mockDB = {
    put: () => ({}),
  };
  const event = {
    body: JSON.stringify({}),
  };

  const spy = sinon.spy();
  await del(mockDB)(event, null, spy);
  const callArgs = spy.getCalls()[ 0 ].args;
  t.ok(callArgs[ 0 ] instanceof Error, 'The callback should be called with an Error.');
  t.end();
});

