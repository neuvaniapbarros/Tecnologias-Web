// Escreva uma função JavaScript para verificar se uma `entrada` é um array ou não.
function  verificar_input(array ){
return Array.isArray(array);
}
// Escreva uma função JavaScript para clonar um array.
function clonar_array(array){
    const arr = array;
    return arr;
}
// Escreva uma função JavaScript para obter o primeiro elemento de um array. Passar um parâmetro 'n' retornará os primeiros 'n' elementos do array.
function retornar_primeiro_elem(array){
    return array[0];
}
// Escreva uma função JavaScript para obter o ultimos elemento de um array. Passar um parâmetro 'n' retornará os ultimoas 'n' elementos do array.
function retornar_ultimo_elem(array){
    return array.slice(-1);
}
// Escreva um programa JavaScript simples para unir todos os elementos de um array em uma string.
function unir_array_str(array){
   return array.join(' ');
}
 function separar_num_pares(numero){
    numero = numero.toString();
    numero = numero.split('');
   for (let i = 0; i < numero.length; i++) {
        if ( (numero[i] + numero[i+1] ) %2 == 0 ){
            numero.splice(1, 0, '-');
        }   
   }    
   return numero;
}
