var version = "v0.5";

// Start conversation
Hello();
async function Hello() {
    document.getElementById("ai").innerHTML =
        `<p>Olá sou SP-AI. Com algumas perguntas, posso ajudar você.</p> 
        </p><hr><p> 
        <p><small>Você também pode escolher essas opções:</small>
        <ul>
        <li><a onclick='Dolar()'>Ver a cotação do Dólar</a></li>
        </ul>
        </p>`;
    document.getElementById("input").blur();
}

// Dolar API
function Dolar() {
    $.getJSON(
        "https://economia.awesomeapi.com.br/json/last/USD-BRL",
        function (data) {
            var high = `R$${data.USDBRL.high}<br>`;
            var create_date = `Atualizado em: ${data.USDBRL.create_date}<br>`;
            
            document.getElementById("ai").innerHTML =
                "<p>O valor de $1 Dólar Americano é: <br><mark>" +
                high +
                "</mark><br><small>" +
                create_date +
                "</small></p>";
            document.getElementByClass("view-date").innerHTML = create_date;
        }
    );
}

// Chat UI
document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    const aiField = document.getElementById("ai");

    inputField.addEventListener("keydown", async (e) => {
        if (e.which === 13) {
            let input = inputField.value;
            input = input.replace(/[<>]/g, "");
            const keyword = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const loadingMessage = "<p>Digitando...</p>";

            function UserHistory() {
                $(".userUI").fadeIn();
                document.getElementById("key").innerText = input;
                inputField.value = "";
                document.getElementById("input").blur();
            }

            function displayOutput(output) {
                UserHistory();
                aiField.innerHTML = output;
                inputField.value = "";
                document.getElementById("input").blur();
            }

            displayOutput(loadingMessage);

            if (keyword.match(/\bspai\b/gi)) {
                displayOutput(`<p>Esse sou eu!</p>`);
            } else if (keyword.match(/\bversion\b/gi)) {
                displayOutput(`<p>Estou atualmente na versão ${version}</p>`);
            } else if (keyword.match(/\bdolar\b/gi)) {
                displayOutput(await Dolar());
            } else {
                let found = false;
                let output = "";

                // read database
                try {
                    const response = await fetch("natural-language/hello.json");
                    const data = await response.json();
                    data.forEach((item) => {
                        if (keyword.match(new RegExp(`\\b${item.key}\\b`, "gi"))) {
                            output = `${item.content}`;
                            found = true;
                        }
                    });
                } catch (error) {
                    console.error(error);
                }

                // read memes
                if (!found) {
                    try {
                        const response = await fetch("natural-language/memes.json");
                        const data = await response.json();
                        data.forEach((item) => {
                            if (keyword.match(new RegExp(`\\b${item.key}\\b`, "gi"))) {
                                output = `${item.content}`;
                                found = true;
                            }
                        });
                    } catch (error) {
                        console.error(error);
                    }
                }

                // display Instagram link if no match was found
                if (!found) {
                    output = instagram;
                }

                displayOutput(output);
            }
        }
    });
});