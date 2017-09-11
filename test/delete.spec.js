import test from 'tape';
import sinon from 'sinon';
import del from '../src/delete';

const mockDB = {
  delete: () => ({
    promise: () => Promise.resolve(),
  }),
  put: () => ({
    promise: () => Promise.resolve(),
  }),
};

test('delete', async t => {
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
  t.ok(callArgs[ 1 ].statusCode, 200, 'The function should respond with an entity with a uuid');
  t.equals(callArgs[ 1 ].body, '{}', 'The function should respond with the correct entry');
  t.end();
});

