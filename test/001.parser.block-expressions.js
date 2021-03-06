var assert = require('assert');
var fs = require('fs');
var peg = require('pegjs');
function load_parser()
{
	var grammar = fs.readFileSync(__dirname + '/../src/grammar.pegjs', { encoding: 'utf8' });
	return peg.buildParser(grammar);
}
function parse_block(expressions)
{
	expressions = expressions || [];
	var parser = load_parser();
	var source_code;
	if(expressions.length === 0)
	{
		source_code = '{}';
	}
	else
	{
		source_code = '{' + expressions.join(';') + ';}';
	}
	return parser.parse(source_code).code_block.expressions[0];
}
describe
(
	'Empty block expression', function()
	{
		it
		(
			"should produce an AST node of type \"Block\"", function()
			{
				var block = parse_block();
				assert.deepEqual(block.type, "Block");
			}
		);
		it
		(
			"should produce a Block with 0 child expressions", function()
			{
				var block = parse_block();
				assert.deepEqual(block.expressions.length, 0);
			}
		);
	}
);
describe
(
	'Block expression with children', function()
	{
		it
		(
			"should hold its children", function()
			{
				var block = parse_block(['true']);
				assert.deepEqual(block.expressions.length, 1);
				assert.deepEqual
				(
					block.expressions[0],
					{
						type: "Boolean Literal"
					}
				);
			}
		)
	}
);
