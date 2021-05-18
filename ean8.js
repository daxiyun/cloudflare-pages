function EAN8(data) {
    var BARCODE = [];
    var suma_par = suma_impar = multi_pares = resultado = digito_control = 0;
    for (var i = 0; i < data.length; i++) {
        BARCODE[i] = parseInt(data.charAt(i));
        if (i % 2 == 0) {
            multi_pares = BARCODE[i] * 3;
            suma_par += multi_pares;
        } else {
            multi_impar = BARCODE[i] * 1;
            suma_impar += multi_impar;
        }
    }
    resultado = suma_par + suma_impar;
    digito_control = 10 - (resultado % 10);
    if (digito_control == 10) digito_control = 0;
    return data + digito_control;
}

var data = location.hash.slice(1);
if (data == null) data = 6315986;
console.log(EAN8(data));
