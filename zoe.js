var version = "v0.5";

// Start conversation
Hello();
function Hello() {
    $("#ai").html(
        `<p>Hello! Sou uma assistente virtual. Digite no campo abaixo, vou ajudar você.</p> 
        </p><hr><p> 
        <p><small>Você também pode escolher essas opções:</small><ul>
        <li><a onclick='Dolar()'>Ver a cotação do Dólar</a></li>
        </ul><br></p>`
    );
    $("#input").blur();
}

var instagram = `<p>
                Estou em treinamento sobre uma enorme quantidade de dados, que me permitem entender uma variedade de coisas sobre Franca/SP e as cidades da Alta Mogiana. No entanto, estou em aprendizado, ainda tenho limitações e estou em constante evolução. Espero continuar a melhorar minhas habilidades à medida que recebo mais dados e informações.</p>
                <hr><p>
                Me segue no Instagram?<br><br>
                <a href='https://instagram.com/hellozoe.com.br'>
                Acessar meu instagram</a>
                </p>`;

// Dolar API
function Dolar() {
    $.getJSON(
        "https://economia.awesomeapi.com.br/json/last/USD-BRL",
        function (data) {
            var code = `$1 Dolár Americano ${data.USDBRL.code}<br>`;
            var high = `R$${data.USDBRL.high}<br>`;
            var create_date = `Atualizado em: ${data.USDBRL.create_date}<br>`;

            $(".view-code").html(code);
            $("#ai").html(
                "<p>O valor de $1 Dólar Americano é: <br><mark>" +
                    high +
                    "</mark><br><small>" +
                    create_date +
                    "</small></p>"
            );
            $(".view-date").html(create_date);
        }
    );
}