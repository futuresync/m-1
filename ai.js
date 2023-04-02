var version = "v0.5";

// Start conversation
Hello();
function Hello() {
    $("#ai").html(
        `<p>Olá sou SP-AI. Com algumas perguntas, posso ajudar você.</p> 
        </p><hr><p> 
        <p><small>Você também pode escolher essas opções:</small><ul>
        <li><a onclick='Dolar()'>Ver a cotação do Dólar</a></li>
        </ul><br></p>`
    );
    $("#input").blur();
}

var instagram = `<p> Desculpe, mas não sei nada sobre isso.
                Estou em treinamento sobre uma enorme quantidade de dados, 
                que me permitem entender uma variedade de coisas sobre SP.
                No entanto, estou em aprendizado e tenho limitações, mas estou 
                em constante evolução.
                </p>
                <hr><p>
                Me segue no Instagram?<br><br>
                <a href='https://instagram.com/spai-1'>
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

// Chat UI
document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");

    inputField.addEventListener("keydown", (e) => {
        if (e.which == 13) {
            let input = inputField.value;
            input = input.replace(/[<>]/g, "");
            var keyword = input
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

            function UserHistory() {
                MotionMessage();
                document.getElementById("key").innerText = input;
                inputField.value = "";
                $("#input").blur();
            }

            if (keyword.match(/\bhello\b/gi)) {
                UserHistory();
                Hello();
            } else if (keyword.match(/\bversion\b/gi)) {
                UserHistory();
                $("#ai").html("<p>Estou atualmente na versão " + version);
            } else if (keyword.match(/\boi\b/gi)) {
                UserHistory();
                Hello();
            } else if (keyword.match(/\bdolar\b/gi)) {
                $("#key").html(input);
                UserHistory();
                Dolar();
            }

            // read database
            else {
                UserHistory();
                let found = false;

                // 
                fetch("natural-language/hello.json")
                    .then((response) => response.json())
                    .then((data) => {
                        data.forEach((item) => {
                            if (keyword.match(new RegExp(`\\b${item.key}\\b`, "gi"))) {
                                $("#ai").html("<p>" + `${item.content}` + "</p>");
                                found = true;
                            }
                        });
                    }).catch((error) => console.error(error));

                // 
                fetch("natural-language/memes.json")
                    .then((response) => response.json())
                    .then((data) => {
                        data.forEach((item) => {
                            if (keyword.match(new RegExp(`\\b${item.key}\\b`, "gi"))) {
                                $("#ai").html("<p>" + `${item.content}` + "</p>");
                                found = true;
                            }
                        });
                    }).catch((error) => console.error(error));

                // error
                if (!found) {
                    $("#ai").html(instagram);
                    inputField.value = "";
                    $("#input").blur();
                }
            }

        }
    });
});