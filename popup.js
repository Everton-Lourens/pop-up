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
    document.getElementById('input-text-popup').style.display = 'none';
    document.getElementById('input-phone-popup').style.display = 'none';
    document.getElementById('input-password-popup').style.display = 'none';
    // Exibe o pop-up e o overlay
    document.getElementById('popup-div').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    /////////////////////////////////////////////////////////////////
    document.getElementById('overlay').addEventListener('click', hidePopup);
    document.body.classList.add('popup-open');
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
        document.getElementById('input-text-popup').style.display = 'none';
        document.getElementById('input-phone-popup').style.display = 'none';
        document.getElementById('input-password-popup').style.display = 'none';
    }
    function isPopupYesNo() {
        document.getElementById('popup-yes').style.display = 'block';
        document.getElementById('popup-no').style.display = 'block';
        document.getElementById('popup-ok').style.display = 'none';
        document.getElementById('input-text-popup').style.display = 'none';
        document.getElementById('input-phone-popup').style.display = 'none';
        document.getElementById('input-password-popup').style.display = 'none';
    }

    function isInput() {
        document.getElementById('popup-yes').style.display = 'block';
        document.getElementById('popup-no').style.display = 'block';
        document.getElementById('popup-ok').style.display = 'none';
        if (input?.text === true && input?.tel === false && input?.password === false) {
            isInputText()
        } else if (input?.text === false && input?.tel === true && input?.password === false) {
            isInputTel();
        } else if (input?.text === false && input?.tel === false && input?.password === true) {
            isInputPassword();
        }

        function isInputText() {
            document.getElementById('input-text-popup').style.display = 'block';
            document.getElementById('input-text-popup').focus();
            document.getElementById('input-phone-popup').style.display = 'none';
            document.getElementById('input-password-popup').style.display = 'none';
        }
        function isInputTel() {
            document.getElementById('input-phone-popup').style.display = 'block';
            document.getElementById('input-phone-popup').focus();
            document.getElementById('input-text-popup').style.display = 'none';
            document.getElementById('input-password-popup').style.display = 'none';
        }
        function isInputPassword() {
            document.getElementById('input-password-popup').style.display = 'block';
            document.getElementById('input-password-popup').focus();
            document.getElementById('input-text-popup').style.display = 'none';
            document.getElementById('input-phone-popup').style.display = 'none';
        }
    }


    document.getElementById('popup-yes').addEventListener('click', async (e) => {
        try {
            if (functionCallback?.yesFunction) {
                await functionCallback.yesFunction();
                hidePopup();
            }
        } catch (error) {
            console.log(error.message)
            if (error.message.includes('checked:')) {
                notificacaoPopup(error.message.replace('checked:', ''), true);
            }
        }
    });
    document.getElementById('popup-no').addEventListener('click', async (e) => {
        try {
            if (functionCallback?.noFunction) {
                await functionCallback.noFunction();
                hidePopup();
            } else {
                hidePopup();
            }
        } catch (error) {
            if (error.message.includes('checked:'))
                notificacaoPopup(error.message.replace('checked:', ''), true);
        }
        /*
                if (!functionCallback?.redirect)
                    e.preventDefault();
                if (functionCallback?.noFunction)
                    functionCallback.noFunction();
        */
    });
    document.getElementById('popup-ok').addEventListener('click', async (e) => {
        try {
            if (functionCallback?.okFunction) {
                await functionCallback.okFunction();
                hidePopup();
            } else {
                hidePopup();
            }
        } catch (error) {
            if (error.message.includes('checked:'))
                notificacaoPopup(error.message.replace('checked:', ''), true);
        }
        /*
                if (!functionCallback?.redirect)
                    e.preventDefault();
                if (functionCallback?.okFunction)
                    functionCallback.okFunction();
        */
    });

    function hidePopup() {
        document.body.classList.remove('popup-open');
        document.getElementById('popup-div').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
        /////////////// INPUT //////////////
        document.getElementById('popup-yes').value = '';
        document.getElementById('popup-no').value = '';
        document.getElementById('popup-ok').value = '';
        document.getElementById('input-text-popup').value = '';
        document.getElementById('input-phone-popup').value = '';
        document.getElementById('input-password-popup').value = '';
    }
}


/*
function exibirNotificacao(mensagem, failed) {
    const divNotification = document.getElementById('notification');
    notification(mensagem, failed, divNotification)
}

function notificationPopUp(mensagem, failed) {
    const divNotification = document.getElementById('notification-popup');
    notification(mensagem, failed, divNotification)
}

function exibirNotificacao(mensagem, failed, divNotification) {
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
*/

function exibirNotificacao(mensagem, failed) {
    const notification = document.getElementById('notification');
    notification.textContent = mensagem || 'ERRO';
    notification.style.display = 'block';
    if (failed)
        notification.style.backgroundColor = 'red';
    if (!failed)
        notification.style.backgroundColor = 'green';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function notificacaoPopup(mensagem, failed) {
    const notification = document.getElementById('notification-popup');
    notification.textContent = mensagem || 'ERRO';
    notification.style.display = 'block';
    if (failed)
        notification.style.backgroundColor = 'red';
    if (!failed)
        notification.style.backgroundColor = 'green';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}