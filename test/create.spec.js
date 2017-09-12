import test from 'tape';
import sinon from 'sinon';
import create from '../src/create';
import isUuid from './isUuid';

test('create', async t => {

  const mockDB = {
    put: () => ({
      promise: () => Promise.resolve(),
    }),
  };
  const body = {
    entry: 'test',
    domain: 'test-domain',
  };
  const event = {
    body: JSON.stringify(body),
  };
  const spy = sinon.spy();
  await create(mockDB)(event, null, spy);
  const callArgs = spy.getCalls()[ 0 ].args;
  const { id, entry, domain } = JSON.parse(callArgs[ 1 ].body);

  t.equals(callArgs[ 0 ], null, 'The function should call the callback with null as first argument');
  t.ok(isUuid(id), 'The function should respond with an entity with a uuid');
  t.ok(callArgs[ 1 ].statusCode, 200, 'The function should respond with an entity with a uuid');
  t.equals(entry, body.entry, 'The function should respond with the correct entry');
  t.equals(domain, body.domain, 'The function should respond with the correct domain');
  t.end();
});

test('create - Error ', async t => {

  const mockDB = {
    put: () => ({}),
  };

  const body = {
    entry: 'test',
    domain: 'test-domain',
  };

  const event = {
    body: JSON.stringify(body),
  };

  const spy = sinon.spy();
  await create(mockDB)(event, null, spy);
  const callArgs = spy.getCalls()[ 0 ].args;
  t.ok(callArgs[0] instanceof Error, 'The callback should be called with an Error.');
  t.end();
});
