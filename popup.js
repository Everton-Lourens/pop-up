const HTML_popup = `
<!-- Pop-up e overlay -->
<div>
  <div id="popup-div" class="popup">
    <h2><strong id="popup-alert"></strong></h2>
    <strong>
      <p id="popup-msg"></p>
    </strong>
    <p id="popup-obs"></p>
    <div id="notification" class="notification"></div>
    <input type="tel" class="contact__input" inputmode="numeric" id="phoneNumber" maxlength="16"
      placeholder=" (XX) X XXXX-XXXX">
    <button id="popup-ok"><strong></strong></button>
    <button id="popup-yes"><strong></strong></button>
    <button id="popup-no"><strong></strong></button>
  </div>
  <div id="overlay" class="overlay"></div>
</div>
`;

const CSS_popup = `
#popup-yes,
#popup-no,
#popup-ok {
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    color: white;
    border: none;
    border-radius: 10px;
}

/* Estilo do pop-up */
.popup {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    border-radius: 8px;
    width: 300px;
    text-align: center;
}

#phoneNumber {
    display: none;
    border-radius: 20px;
    padding: 7px;
    border: 10px solid #fff;
}

/* Estilo do fundo escuro ao redor do pop-up */
.overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
}

/* Estilos adicionais para melhorar a aparência */
#popup-obs,
#popup-msg {
    margin: 0 0 20px;
    font-size: 20px;
    color: black;
}

#popup-alert {
    color: red;
}

#popup-yes,
#popup-ok {
    background: #3aac3e;
    font-size: 20px;
}

#popup-no {
    background: rgb(172, 0, 0);
    font-size: 20px;
}
`;



function popupFull() {
    const configPopUp = {
        alert: null,
        msg: 'Qual o seu Whatsapp?',
        obs: null,
        ok: null,
        yes: 'Enviar',
        no: 'Cancelar',
        input: true,
    }
    showPopUpFull(configPopUp);

    function showPopUpFull({ alert, msg, obs, ok, yes, no, input }) {
        alert = alert || 'ATENÇÃO!';
        msg = msg || 'Tem certeza que deseja fazer isso?';
        obs = obs || '';
        ok = ok ? ok : false;
        yes = yes ? yes : false;
        no = no ? no : false;
        input = input ? true : false;

        // Exibe o pop-up e o overlay
        document.getElementById('popup-div').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('popup-alert').textContent = alert;
        document.getElementById('popup-msg').textContent = msg;
        document.getElementById('popup-obs').textContent = obs;
        document.getElementById('popup-ok').textContent = ok;
        document.getElementById('popup-yes').textContent = yes;
        document.getElementById('popup-no').textContent = no;
        if (input) {
            document.getElementById('phoneNumber').style.display = 'block';
            document.getElementById('phoneNumber').focus();
        }
        if (!ok || yes)
            document.getElementById('popup-ok').style.display = 'none';
        if (!yes)
            document.getElementById('popup-yes').style.display = 'none';
        if (!no)
            document.getElementById('popup-no').style.display = 'none';

        document.getElementById('popup-yes').addEventListener('click', async (e) => {
            // e.preventDefault();
            const phoneInput = document.getElementById('phoneNumber').value;
            if (!phoneInput)
                return e.preventDefault();
            const { checked, phone } = await checkdata(phoneInput);

            if (checked) {
                saveData = {
                    name: 'Exemplo-Loja',
                    phone,
                };

                const { protocol, hostname } = new URL(window.location.href);

                fetch(`${protocol}//${hostname}/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(saveData)
                }).then((response) => {
                    if (response.ok)
                        console.log('FAZ ALGO');
                    else
                        console.log('ERRO');
                });
            }
            // FAZ ALGO
        });
        document.getElementById('popup-no').addEventListener('click', async (e) => {
            e.preventDefault();
            document.getElementById('popup-div').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
            // FAZ ALGO
        });
        document.getElementById('popup-ok').addEventListener('click', async (e) => {
            e.preventDefault();
            document.getElementById('popup-div').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
            // FAZ ALGO
        });
    }
}


function popupOk() {
    const configPopUp = {};
    configPopUp.alert = 'ATENÇÃO!';
    configPopUp.msg = 'E-mail já existe.';
    configPopUp.obs = 'Tente outro e-mail.';
    configPopUp.ok = 'Ok';
    return showPopUpMsgOk(configPopUp);
    function showPopUpMsgOk({ alert, msg, obs, ok }) {
        alert = alert || 'ATENÇÃO!';
        msg = msg || 'Tem certeza que deseja fazer isso?';
        obs = obs || '';
        ok = ok ? ok : false;

        // Exibe o pop-up e o overlay
        document.getElementById('popup-div').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('popup-yes').style.display = 'none';
        document.getElementById('popup-no').style.display = 'none';
        document.getElementById('popup-alert').textContent = alert;
        document.getElementById('popup-msg').textContent = msg;
        document.getElementById('popup-obs').textContent = obs;
        document.getElementById('popup-ok').textContent = ok;

        if (!ok)
            document.getElementById('popup-ok').style.display = 'block';

        document.getElementById('popup-ok').addEventListener('click', async (e) => {
            e.preventDefault();
            document.getElementById('popup-div').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
            // FAZ ALGO
        });
    }
}