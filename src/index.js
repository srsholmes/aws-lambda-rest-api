import create from './create';
import get from './get';
import list from './list';
import update from './update';
import del from './delete';

const db = require('./dynamodb');

exports.create = create(db);
exports.get = get(db);
exports.list = list(db);
exports.update = update(db);
exports.del = del(db);
