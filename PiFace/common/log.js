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
    outputString = '<br>', output = '';
  else
    outputString = 'unknown output string';

  // console.log('common.log(), output: ');
  console.log(output);

  if ($('#log-output').length < 1)
    $('body').append('<div></div>').attr('id', 'log-output');

  $('#log-output').append('<br>');
  $('#log-output').append(outputString);
}
