/**
 *@global
 */
var field = document.getElementById('field'),
    table = document.getElementById('table'),
    ops = '+-*/^%',
    possibleSymbs = '+-*/^%()',
    noOnFirstPosition = '*/+)';
    field.value = '';
    
/**
 *@event 
 *@description get number || dot || operation
 * and add it to input field
 */
table.onclick = function(e){
  field.focus();
  var target = e.target;
  if(target.closest('.deleteOneSymbol')){
    field.value = field.value.slice(0,-1);
  }
  if(target.closest('.number')|| target.closest('.dot') || target.closest('.brackets') ){
    field.value += target.innerHTML;  
  }

  if(target.closest('.number') && field.value[0] == '.'){
    field.value = '0.' + target.innerHTML;
  }

  if(target.closest('.operation')){

    if(ops.indexOf(field.value[field.value.length-1]) != -1){
      field.value = field.value.slice(0,-1);
    }
    if(noOnFirstPosition.indexOf(field.value[0]) != -1){
      field.value = field.value.slice(1);
    }
    
    if(noOnFirstPosition.indexOf(field.value[0]) != -1){
      field.value = '';
    }
    field.value += target.innerHTML; 
  }
  /**
   *clear field.value
   */

  if(target.id == 'clear'){
    clear();
  }
  /**
   *calculate your expression
   */
  if(target.id == 'calculate'){
    calc();
  }

}



document.onkeypress = function(e){
   var char = getChar(e);
   if(!isNaN(char) && field.value[0] == '.'){
      field.value = '0.';
    }
   if(ops.indexOf(field.value[field.value.length-1]) != -1 && isNaN(+char) && char != '(' && char != ')'){
      field.value = field.value.slice(0,-1);
    }
   
if(noOnFirstPosition.indexOf(field.value[0]) != -1){
      field.value = field.value.slice(1);
    }
  if(e.keyCode == 46 && document.activeElement == field){
    clear();
  }
  if(e.keyCode === 13 && document.activeElement == field){
    calc();
  }
  if(possibleSymbs.indexOf(char) == -1 && isNaN(char)){
    return false;
  }
}
/**
 *supports special possibilities by using keybord
 * 
 */

/**
 *@function
 *@name clear
 *@description clear field.value 
 */
function clear(){
  field.value = '';
}
/**
 *@function
 *@name calc
 *@description make operation by eval and add result to field
 *
 */
function calc(){
  try{
    var result,
    value = field.value,
    len = field.value.length;
    if(ops.indexOf(value[len-1]) != -1){
      alert('last operator: \'' + value[len-1] + '\' was deleted!\nit\'s not by rules')
      value = value.slice(0,-1);
    }
  result = eval(value);
  field.value = result;
}catch(e){
  alert('Your expression is not valid');
  field.value = '';
  throw new Error('it\'s a mistake');
}
  
}


function getChar(event) {
  if (event.which == null) { // IE
    if (event.keyCode < 32) return null; // спец. символ
    return String.fromCharCode(event.keyCode)
  }

  if (event.which != 0 && event.charCode != 0) { // все кроме IE
    if (event.which < 32) return null; // спец. символ
    return String.fromCharCode(event.which); // остальные
  }

  return null; // спец. символ
}