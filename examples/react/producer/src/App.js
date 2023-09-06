import React, { useState } from 'react';
import './App.css';

function App() {
  const [valorDaPaginaAqs] = useState('Valor recebido da Página A via query string (campo: valorDaPaginaA): ' + new URLSearchParams(window.location.search).get('valorDaPaginaA'));
  const [valorDaPaginaApostMsg, setValorDaPaginaApostMsg] = useState(<></>);
  function sendMessage() {

    var message = ({ type: 'import', items: [{ productCode: '123456', amount: 3 }, { productCode: '321456', amount: 1 }] });
    alert("[Página B] Enviando mensagem para Página A: " + JSON.stringify(message));

    window.parent.postMessage(message, "*");
  }

  window.addEventListener('message', function (event) {
    const handler = {
      'import-result': function () {
        setValorDaPaginaApostMsg(<>{'Valor recebido da Página A via postMessage: ' + JSON.stringify(event.data)}</>)
      }
    }[event.data?.type];
    if (typeof handler === 'function') handler()

  }, false);
  return (
    <div className="App">
      <div>{window.location.href}</div>
      <h1>{window.document.title}</h1>
      <button onClick={() => sendMessage()}>Enviar Mensagem para Página A</button>
      <div id="valorDaPaginaAqs">{valorDaPaginaAqs}</div>
      <div id="valorDaPaginaApostMsg">{valorDaPaginaApostMsg}</div>
    </div>
  );
}

export default App;
