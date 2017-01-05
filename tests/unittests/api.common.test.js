'use strict';

const methodConteiner = {};
methodConteiner.method = (obj) => {
  obj.field = 'value';
  return obj;
};

const config = {
  characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  secret: 'secret',
  length: 64
};

api.test.case({
  'api.common.falseness': [ [ [], false ] ],
  'api.common.trueness': [ [ [], true ] ],
  'api.common.emptyness': [ [ [], undefined ] ],
  'api.common.subst': [
    [ 'Hello, @name@',  { name: 'Ali' }, '', true,                   'Hello, Ali' ],
    [ 'Hello, @.name@', { person: { name: 'Ali' } }, 'person', true, 'Hello, Ali' ],
  ],
  'api.common.getByPath': [
    [ { item: { subitem: { value: 'Gagarin' } } }, 'item.subitem.value',            'Gagarin' ],
    [ { item: { subitem: { value: 123       } } }, 'item.subitem.value',                  123 ],
    [ { item: { subitem: { value: true      } } }, 'item.subitem.value',                 true ],
    [ { item: { subitem: { value: false     } } }, 'item.subitem.value',                false ],
    [ { item: { subitem: { value: 'Gagarin' } } }, 'item.subitem.none',             undefined ],
    [ { item: { subitem: { value: null      } } }, 'item.subitem.value',                 null ],
    [ { item: { subitem: { value: 'Gagarin' } } }, 'item.none.value',               undefined ],
    [ { item: { subitem: { value: 'Gagarin' } } }, 'item.subitem',       { value: 'Gagarin' } ],
  ],
  'api.common.setByPath': [
    [ { item: { subitem: { value: 'Gagarin' } } }, 'item.subitem.value', 'Gagarin',             true ],
    [ { item: { subitem: { value: 'Gagarin' } } }, 'item.subitem.none',  'Gagarin',             true ],
    [ { item: { subitem: { value: 123       } } }, 'item.subitem.value', 123,                   true ],
    [ { item: { subitem: { value: true      } } }, 'item.subitem.value', true,                  true ],
    [ { item: { subitem: { value: false     } } }, 'item.subitem.value', false,                 true ],
    [ { item: { subitem: { value: 'Gagarin' } } }, 'item.subitem.none',  undefined,             true ],
    [ { item: { subitem: { value: null      } } }, 'item.subitem.value', null,                  true ],
    [ { item: { subitem: { value: 'Gagarin' } } }, 'item.none.value',    undefined,             true ],
    [ { item: { subitem: { value: 'Gagarin' } } }, 'none.value',         123,                   true ],
    [ { item: { subitem: { value: 'Gagarin' } } }, 'item.subitem',       { value: 'Gagarin' },  true ],
  ],
  'api.common.deleteByPath': [
    [ { item: { surname: 'Gagarin', name: 'Yuri' } }, 'item.name',    true ],
    [ { item: { surname: 'Gagarin', name: 'Yuri' } }, 'item.noname', false ],
    [ { item: { surname: 'Gagarin', name: 'Yuri' } }, 'item',         true ],
    [ { item: { surname: 'Gagarin', name: 'Yuri' } }, 'unknown',     false ],
  ],
  'api.common.htmlEscape': [
    [ 'text',                         'text' ],
    [ '<tag>',                 '&lt;tag&gt;' ],
    [ 'You &amp; Me',     'You &amp;amp; Me' ],
    [ 'You & Me',             'You &amp; Me' ],
    [ '"Quotation"', '&quot;Quotation&quot;' ],
  ],
  'api.common.fileExt': [
    [ '/dir/dir/file.txt', 'txt' ],
    [ '/dir/dir/file.txt', 'txt' ],
    [ '\\dir\\file.txt',   'txt' ],
    [ '/dir/dir/file.txt', 'txt' ],
    [ '/dir/file.txt',     'txt' ],
    [ '/dir/file.TXt',     'txt' ],
    [ '//file.txt',        'txt' ],
    [ 'file.txt',          'txt' ],
    [ '/dir.ext/',         'ext' ],
    [ '/dir/',             ''    ],
    [ '/',                 ''    ],
    [ '.',                 ''    ],
    [ '',                  ''    ],
  ],
  'api.common.isTimeEqual': [
    [ '2014-01-01', '2014-01-01',  true ],
    [ '2014-01-01', '2014-01-02', false ],
    [ '1234-12-12', '1234-12-12',  true ],
    [ '1234-12-12', '4321-12-21', false ],
  ],
  'api.common.pad2': [
    [  0, '00' ],
    [  5, '05' ],
    [ 10, '10' ],
  ],
  'api.common.nowDate': [
    [ new Date('2014-12-12 12:30:15.150'), '2014-12-12' ],
    [ new Date('2014-12-12 12:30:15'),     '2014-12-12' ],
    [ new Date('2014-12-12 12:30'),        '2014-12-12' ],
    [ new Date('2014-12-12'),              '2014-12-12' ],
  ],
  'api.common.nowDateTime': [
    [ new Date('2014-12-12 12:30:15.150Z'), '2014-12-12 12:30' ],
    [ new Date('2014-12-12 12:30:15Z'),     '2014-12-12 12:30' ],
    [ new Date('2014-12-12 12:30Z'),        '2014-12-12 12:30' ],
    [ new Date('2014-12-12Z'),              '2014-12-12 00:00' ],
  ],
  'api.common.spinalToCamel': [
    [ 'hello-world',     'helloWorld' ],
    [ 'hello_world',     'helloWorld' ],
    [ 'one-two-three',  'oneTwoThree' ],
    [ 'one_two_three',  'oneTwoThree' ],
    [ 'OneTwoThree',    'OneTwoThree' ],
    [ 'oneTwoThree',    'oneTwoThree' ],
    [ 'hello',                'hello' ],
    [ 'h',                        'h' ],
    [ '-',                         '' ],
    [ '_',                         '' ],
    [ '',                          '' ],
  ],
  'api.common.duration': [
    [ '1d',             86400000 ],
    [ '10h',            36000000 ],
    [ '7m',               420000 ],
    [ '13s',               13000 ],
    [ '2d 43s',        172843000 ],
    [ '5d 17h 52m 1s', 496321000 ],
    [ '1s',                 1000 ],
    [ 500,                   500 ],
    [ 0,                       0 ],
    [ '',                      0 ],
    [ '15',                    0 ],
    [ '10q',                   0 ],
    [ null,                    0 ],
    [ undefined,               0 ],
  ],
  'api.common.ip2int': [
    [ '127.0.0.1',        2130706433 ],
    [ '10.0.0.1',          167772161 ],
    [ '192.168.1.10',    -1062731510 ],
    [ '165.225.133.150', -1511946858 ],
    [ '0.0.0.0',                   0 ],
    [ 'wrong-string',           null ],
    [ '',                          0 ],
  ],
  'api.net.isIP': [
    [ '127.0.0.1',         4 ],
    [ '10.0.0.1',          4 ],
    [ '192.168.1.10',      4 ],
    [ 'domain.com',        0 ],
    [ '127.0.0.com',       0 ],
    [ '',                  0 ],
  ],
  'api.common.escapeRegExp': [
    [ '/path/to/res?search=this.that&a=b', '\\\\/path\\\\/to\\\\/res\\\\?search=this\\\\.that&a=b' ],
    [ '/path/to/res?search=this.that',         '\\\\/path\\\\/to\\\\/res\\\\?search=this\\\\.that' ],
    [ '/path/to/res?search',                                 '\\\\/path\\\\/to\\\\/res\\\\?search' ],
    [ '/path/to/res',                                                   '\\\\/path\\\\/to\\\\/res' ],
    [ '/path',                                                                         '\\\\/path' ],
  ],
  'api.common.addTrailingSlash': [
    [ '/path',   '/path/' ],
    [ '/path/',  '/path/' ],
    [ '/',            '/' ],
    [ '',             '/' ],
  ],
  'api.common.stripTrailingSlash': [
    [ '/path',   '/path' ],
    [ '/path/',  '/path' ],
    [ '/',            '' ],
    [ '',             '' ],
  ],
  'api.common.dirname': [
    [ '/path/dir/',   '/path/' ],
    [ '/path/dir',    '/path/' ],
    [ '/path/',            '/' ],
    [ '/path',             '/' ],
    [ '/',                 '/' ],
    [ '',                 './' ],
  ],
  'api.common.bytesToSize': [
    [                         0, '0'      ],
    [                         1, '1'      ],
    [                       100, '100'    ],
    [                       999, '999'    ],
    [                      1000, '1 Kb'   ],
    [                      1023, '1 Kb'   ],
    [                      1024, '1 Kb'   ],
    [                      1025, '1 Kb'   ],
    [                      1111, '1 Kb'   ],
    [                      2222, '2 Kb'   ],
    [                     10000, '10 Kb'  ],
    [                   1000000, '1 Mb'   ],
    [                 100000000, '100 Mb' ],
    [               10000000000, '10 Gb'  ],
    [             1000000000000, '1 Tb'   ],
    [           100000000000000, '100 Tb' ],
    [         10000000000000000, '10 Pb'  ],
    [       1000000000000000000, '1 Eb'   ],
    [     100000000000000000000, '100 Eb' ],
    [   10000000000000000000000, '10 Zb'  ],
    [ 1000000000000000000000000, '1 Yb'   ],
  ],
  'api.common.sizeToBytes': [
    [        0,                         0 ],
    [      '0',                         0 ],
    [      '1',                         1 ],
    [      512,                       512 ],
    [    '100',                       100 ],
    [    '999',                       999 ],
    [   '1 Kb',                      1000 ],
    [   '2 Kb',                      2000 ],
    [  '10 Kb',                     10000 ],
    [   '1 Mb',                   1000000 ],
    [ '100 Mb',                 100000000 ],
    [  '10 Gb',               10000000000 ],
    [   '1 Tb',             1000000000000 ],
    [ '100 Tb',           100000000000000 ],
    [  '10 Pb',         10000000000000000 ],
    [   '1 Eb',       1000000000000000000 ],
    [ '100 Eb',     100000000000000000000 ],
    [  '10 Zb',   10000000000000000000000 ],
    [   '1 Yb', 1000000000000000000000000 ],
  ],
  'api.common.sizeToBytes.units': [
    [ (obj) => Object.keys(obj).length === 8 ],
  ],
  'api.common.random': [
    [  0, 10, (result) => (result >=  0 && result <= 10) ],
    [  1, 10, (result) => (result >=  1 && result <= 10) ],
    [ -1, 10, (result) => (result >= -1 && result <= 10) ],
    [ 10, 0,  (result) => (result >=  0 && result <= 10) ],
    [ 10, 10, 10 ],
  ],
  'api.common.shuffle': [
    [ [1, 2, 3],   (result) => (api.json.stringify(result.sort()) === '[1,2,3]')   ],
    [ ['a', 'b'],  (result) => (api.json.stringify(result.sort()) === '["a","b"]') ],
    [ [1, 'a', 3], (result) => (api.json.stringify(result.sort()) === '[1,3,"a"]') ],
    [ [],          (result) => (api.json.stringify(result.sort()) === '[]')        ],
  ],
  'api.common.clone': [
    [ {}, {} ],
    [ [], [] ],
    [ null, null ],
    [ { f1: 1 }, { f1: 1 } ],
    [ { f1: 1 }, { f2: 2 }, { f1: 1, f2: 2 } ],
    [ { f1: 1, sub: { f2: 2, a1: [1, 2] } }, { f1: 1, sub: { f2: 2, a1: [1, 2] } } ],
    [ { f1: 1, sub: { f2: 2, a1: [1, 2] } }, { f3: 3, a2: [3, 4] }, { f1: 1, sub: { f2: 2, a1: [1, 2] }, f3: 3, a2: [3, 4] } ],
  ],
  'api.common.capitalize': [
    [ 'abc', 'Abc' ],
    [ 'Abc', 'Abc' ],
    [ 'aBC', 'Abc' ],
    [ 'ABC', 'Abc' ],
    [ 'a',     'A' ],
    [ ' bc', ' Bc' ],
    [ ' ',     ' ' ],
    [ '',       '' ],
    [ '+',     '+' ],
  ],
  'api.common.between': [
    [ 'abcdefghijk', 'cd', 'h',     'efg' ],
    [ 'field="value"', '"', '"',  'value' ],
    [ 'field:"value"', '"', '"',  'value' ],
    [ 'field[value]', '[', ']',   'value' ],
    [ 'kjihgfedcba', 'cd', 'h',        '' ],
    [ 'kjihgfedcba', 'dc', 'h',        '' ],
    [ 'field="value"', '=', '=',       '' ],
    [ 'field[value]', '{', '}',        '' ],
    [ '{a:"b",c:"d"}', '"', '"',      'b' ],
  ],
  'api.common.isScalar': [
    [ 'value1', true  ],
    [ 50,       true  ],
    [ true,     true  ],
    [ null,     false ],
    [ [],       false ],
    [ {},       false ],
    [ '',       true  ],
  ],
  'api.common.merge': [
    [ ['a', 'b'], ['a', 'c'],       ['a', 'b', 'c'] ],
    [ ['a', 'b'], ['a', 'b'],            ['a', 'b'] ],
    [ ['b', 'c'], ['a', 'b'],       ['b', 'c', 'a'] ],
    [ ['a', 'b'], ['c', 'd'],  ['a', 'b', 'c', 'd'] ],
    [ [1, 2, 3],  [1, 2, 3],              [1, 2, 3] ],
    [ [1, 2, 3],  [4, 5, 1],        [1, 2, 3, 4, 5] ],
  ],
  'api.common.override': [
    [
      methodConteiner,
      function method(obj) {
        obj.data++;
        return method.inherited(obj);
      },
      undefined
    ]
  ],
  'api.common.range': [
    [ 1, 5,  [1, 2, 3, 4, 5] ],
    [ 8, 9,           [8, 9] ],
  ],
  'api.common.sequence': [
    [ [81, 82, 83],  [81, 82, 83] ],
    [ [81,, 83],      [81, 82, 83] ],
    [ [81, [3]],     [81, 82, 83] ],
    [ [81, [-2]], 5, [81, 82, 83] ],
  ],
  'api.common.localIPs': [
    [ [], (value) => Array.isArray(value) ],
  ],
  'api.common.generateSID': [
    [ config, (result) => (result.length === 64) ],
  ],
  'api.common.crcSID': [
    [
      config,
      api.common.generateKey(
        config.length - 4,
        config.characters
      ),
      (result)  => (result.length === 4)
    ]
  ],
  'api.common.validateSID': [
    [ config, 'XFHczfaqXaaUmIcKfHNF9YAY4BRaMX5Z4Bx99rsB5UA499mTjmewlrWTKTCp77bc', true  ],
    [ config, 'XFHczfaqXaaUmIcKfHNF9YAY4BRaMX5Z4Bx99rsB5UA499mTjmewlrWTKTCp77bK', false ],
    [ config, '2XpU8oAewXwKJJSQeY0MByY403AyXprFdhB96zPFbpJxlBqHA3GfBYeLxgHxBhhZ', false ],
    [ config, 'WRONG-STRING', false ],
    [ config, '',             false ],
  ],
  'api.common.parseHost': [
    [ '',                'no-host-name-in-http-headers' ],
    [ 'domain.com',      'domain.com' ],
    [ 'localhost',       'localhost'  ],
    [ 'domain.com:8080', 'domain.com' ],
  ],
  'api.common.removeBOM': [
    [ '\uBBBF\uFEFFabc', 'abc' ],
    [ '\uBBBF\uFEFF',    ''    ],
    [ '\uFEFFabc',       'abc' ],
    [ '\uBBBFabc',       'abc' ],
    [ '\uFEFF',          ''    ],
    [ '\uBBBF',          ''    ],
    [ 'abc',             'abc' ],
  ],
  'api.common.arrayRegExp': [
    [ ['*'],                  '^.*$' ],
    [ ['/css/*', '/folder*'], '^((\\/css\\/.*)|(\\/folder.*))$' ],
    [ ['/', '/js/*'],         '^((\\/)|(\\/js\\/.*))$' ],
    [ ['/css/*.css'],         '^\\/css\\/.*\\.css$' ],
    [ ['*/css/*'],            '^.*\\/css\\/.*$' ],
  ],
  'api.common.sortCompareConfig': [
    [ 'files.js', 'sandbox.js',       1 ],
    [ 'filestorage.js', 'routes.js', -1 ],
    [ 'unknown.js', 'sandbox.js',     1 ],
    [ 'log.js', 'sandbox.js',         1 ],
    [ 'sandbox.js', 'sandbox.js',     0 ],
    [ 'log.js', 'log.js',             0 ],
    [ 'tasks.js', 'application.js',  -1 ],
  ],
  'api.common.sortCompareDirectories': [
    [ { name: '/abc' },     { name: 'abc.ext' },  -1 ],
    [ { name: 'ABC.ext' },  { name: '/abc' },      1 ],
    [ { name: 'abc' },      { name: 'ABC.ext' },   1 ],
    [ { name: '/ABC' },     { name: '/abc.ext' }, -1 ],
    [ { name: '/abc.ext' }, { name: '/ABC' },      1 ],
    [ { name: '/abc.ext' }, { name: '/ABC' },      1 ],
    [ { name: '/ABC' },     { name: '/ABC' },      0 ],
    [ { name: 'abc.ext' },  { name: 'abc.ext' },   0 ],
    [ { name: 'abc.ext' },  { name: 'def.ext' },  -1 ],
    [ { name: 'def.ext' },  { name: 'abc.ext' },   1 ],
  ],
  'api.common.sortCompareByName': [
    [ { name: 'abc' }, { name: 'def' },  -1 ],
    [ { name: 'def' }, { name: 'abc' },   1 ],
    [ { name: 'abc' }, { name: 'abc' },   0 ],
    [ { name: 'def' }, { name: 'def' },   0 ],
    [ { name: 'abc' }, { name: 'a' },     1 ],
    [ { name: 'a' },   { name: 'abc' },  -1 ],
    [ { name: '123' }, { name: 'name' }, -1 ],
  ],
  'api.common.logApiMethod': [
    [ 'fs.stats', undefined ]
  ]
});
