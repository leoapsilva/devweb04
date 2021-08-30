jQuery(function(){
    var $maskcpf = $('.mask-cpf');
    var $maskcpfcnpj = $('.mask-cpf-cnpj');
    var $maskcnpj = $('.mask-cnpj');
    var $maskcep = $('.mask-cep');
    var $maskdata = $('.mask-data');
    var $maskcelular = $('.mask-celular');
    var $maskphone = $('.mask-phone');
    var $masktelefone = $('.mask-telefone');
    var $maskmoney = $('.maskmoney');
    var $maskint = $('.mask-int');

    $maskcpf.mask("000.000.000-00");
    $maskcnpj.mask("00.000.000/0000-00");
    $maskcep.mask("00000-000");
    $maskcelular.mask("(00) 00000-0000");
    $maskphone.mask("(00) 0000-0000");
    $maskdata.mask("00/00/0000");
    $maskint.mask("00");

    if ($masktelefone.length > 0) {
        var masks = ['(00) 00000-0000', '(00) 0000-00009'],
            maskBehavior = function (val, e, field, options) {
                return val.length > 14 ? masks[0] : masks[1];
            };

        $masktelefone.mask(maskBehavior, {
            onKeyPress:
                function (val, e, field, options) {
                    field.mask(maskBehavior(val, e, field, options), options);
                }
        });
    }

    if ($maskcpfcnpj.length > 0) {
        var masks = ['00.000.000/0000-00', '000.000.000-009999'],
            maskBehavior = function (val, e, field, options) {
                val = val.replace(/[^0-9]+/g, '');
                return val.length > 11 ? masks[0] : masks[1];
            };

        $maskcpfcnpj.mask(maskBehavior, {
            onKeyPress: function (val, e, field, options) {
                field.mask(maskBehavior(val, e, field, options), options);
            }
        });
    }

    if($maskmoney.length > 0){
        $maskmoney.maskMoney({allowNegative: true, thousands:'.', decimal:',', affixesStay: false});
    }
})