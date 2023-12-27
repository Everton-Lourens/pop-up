function showPopUp({ alert, msg, obs, ok, yes, no, input }, functionCallback) {
    alert = alert || 'ATENÇÃO!';
    msg = msg || 'Tem certeza que deseja fazer isso?';
    obs = obs || '';
    ok = ok ? ok : '';
    yes = yes ? yes : '';
    no = no ? no : '';
    input = input ? input : false;

    // default:
    document.getElementById('popup-ok').style.display = 'none';
    document.getElementById('popup-yes').style.display = 'none';
    document.getElementById('popup-no').style.display = 'none';
    document.getElementById('popup-input').style.display = 'none';
    document.getElementById('phoneNumber').style.display = 'none';
    // Exibe o pop-up e o overlay
    document.getElementById('popup-div').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    /////////////////////////////////////////////////////////////////
    document.getElementById('popup-alert').textContent = alert;
    document.getElementById('popup-msg').textContent = msg;
    document.getElementById('popup-obs').textContent = obs;
    document.getElementById('popup-ok').textContent = ok;
    document.getElementById('popup-yes').textContent = yes;
    document.getElementById('popup-no').textContent = no;

    if (!yes && !no && ok) {
        isPopupOk();
    }
    if (input && !ok && yes && no) {
        isInput();
    }
    if ((yes || no) && !ok && input === false) {
        isPopupYesNo();
    }



    function isPopupOk() {
        document.getElementById('popup-ok').style.display = 'block';
        document.getElementById('popup-yes').style.display = 'none';
        document.getElementById('popup-no').style.display = 'none';
        document.getElementById('popup-input').style.display = 'none';
        document.getElementById('phoneNumber').style.display = 'none';
    }
    function isPopupYesNo() {
        console.log('AAAAAAAAAAAAAAAAAAAAAA');
        console.log(input === false);
        document.getElementById('popup-yes').style.display = 'block';
        document.getElementById('popup-no').style.display = 'block';
        document.getElementById('popup-ok').style.display = 'none';
        document.getElementById('popup-input').style.display = 'none';
        document.getElementById('phoneNumber').style.display = 'none';
    }

    function isInput() {
        document.getElementById('popup-yes').style.display = 'block';
        document.getElementById('popup-no').style.display = 'block';
        document.getElementById('popup-ok').style.display = 'none';
        console.log('INPUT ==>> TRUE');
        console.log(input);
        if (input?.text === true && input?.tel === false) {
            isInputText()
        } else if (input?.text === false && input?.tel === true) {
            isInputTel();
        }

        function isInputText() {
            console.log('TEXT 111111111');
            document.getElementById('popup-input').style.display = 'block';
            document.getElementById('popup-input').focus();
            document.getElementById('phoneNumber').style.display = 'none';
        }
        function isInputTel() {
            console.log('TEL 222222222');
            document.getElementById('phoneNumber').style.display = 'block';
            document.getElementById('phoneNumber').focus();
            document.getElementById('popup-input').style.display = 'none';
        }
    }


    document.getElementById('popup-yes').addEventListener('click', async (e) => {
        if (functionCallback?.yesFunction)
            functionCallback.yesFunction();
        hidePopup();
    });
    document.getElementById('popup-no').addEventListener('click', async (e) => {
        if (functionCallback?.noFunction)
            functionCallback.noFunction();
        hidePopup();
        /*
                if (!functionCallback?.redirect)
                    e.preventDefault();
                if (functionCallback?.noFunction)
                    functionCallback.noFunction();
        */
    });
    document.getElementById('popup-ok').addEventListener('click', async (e) => {
        if (functionCallback?.okFunction)
            functionCallback.okFunction();
        hidePopup();
        /*
                if (!functionCallback?.redirect)
                    e.preventDefault();
                if (functionCallback?.okFunction)
                    functionCallback.okFunction();
        */
    });

    function hidePopup() {
        document.getElementById('popup-div').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }
}


function exibirNotificacao(mensagem, failed) {
    const notification = document.getElementById('notification');
    notification.textContent = mensagem;
    notification.style.display = 'block';
    if (failed)
        notification.style.backgroundColor = 'red';
    if (!failed)
        notification.style.backgroundColor = 'green';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}


const configPopUpFull = {
    alert: null,
    msg: 'O Chatbot deve enviar o pedido para qual Whatsapp?',
    obs: null,
    ok: '',
    yes: 'Enviar',
    no: 'Cancelar',
    input: { tel: true, text: false } || null,
}

const configPopUpOnlyOk = {
    alert: 'ERRO!',
    msg: 'ERRO DESCONHECIDO!',
    obs: null,
    ok: `Ok`,
};