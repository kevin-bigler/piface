var common = common || {};

common.log = function(output) {
  var outputString = '';

  if (common.isString(output))
    outputString = output;
  else if (common.isNumber(output))
    outputString = output + '';
  else if (common.isObject(output) || common.isArray(output))
    outputString = JSON.stringify(output);
  else if (output === null)
    outputString = 'null';
  else if (output === undefined)
    outputString = 'undefined';
  else
    outputString = 'unknown output string';

  console.log('common.log(), output: ');
  console.log(output);

  $('#log-output').append('<br>');
  $('#log-output').append(outputString);
}
