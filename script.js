function getCotacao(id) {
    let url = "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,CAD-BRL,GBP-BRL,ARS-BRL,JPY-BRL,CNY-BRL";
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.onreadystatechange = () => {
        if(request.readyState == 4 && request.status == 200) {
            let moedas = JSON.parse(request.responseText);
            if(document.getElementsByClassName("option").length == 0) {
                for(let x in moedas) {
                    let opcao = document.createElement('option');
                    opcao.innerHTML = moedas[x].code;
                    opcao.className = 'option';
                    document.getElementById('select').appendChild(opcao);
                } 
            }  
            let select = document.getElementById('select');
            let real = document.getElementById('real');
            let moedaEstrangeira = document.getElementById('valorMoedaEstrangeira');
            if(id == "real" || id == "select") {
                moedaEstrangeira.value = (real.value / moedas[select.value+'BRL'].bid).toFixed(3);
            } else if(id == "valorMoedaEstrangeira") {
                real.value = (moedaEstrangeira.value * moedas[select.value+'BRL'].bid).toFixed(3);
            } 
        }
    }
    request.send();
}
