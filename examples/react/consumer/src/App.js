import React, { useState } from 'react';
import './App.css';

function App() {
  const [valorDaPaginaBpostMsg, setValorDaPaginaBpostMsg] = useState(<></>);

  function receiveMessage(event) {
    const handler = {
      'import': () => {
        const message = event.data
        const iframeB = document.getElementById('iframeB');
        //@ts-ignore
        iframeB.contentWindow.postMessage({ type: message.type + '-result', success: true, message: 'Produtos processados' }, '*');
        setValorDaPaginaBpostMsg(<div>
          Valor recebido da Página B via postMessage: <br /><pre>
            {JSON.stringify(event.data)}
          </pre>
          <p>
            Tipo: {message.type}<br />
            {message.items.length} itens recebidos:<br />
          </p>
          <ul>
            {message.items.map((item, index) => <li key={`importedItem_${index}`}>{item.amount}x {item.productCode}</li>)}
          </ul>
        </div>)
      }
    }[event.data.type]
    if (typeof handler === 'function') handler();
  }
  window.addEventListener("message", receiveMessage, false);
  return (
    <div className="App">
      <div>{window.location.href}</div>
      <h1>{window.document.title}</h1>
      <br />
      <iframe src="http://127.0.0.1:3001?valorDaPaginaA=teste" id='iframeB' title="test" frameBorder="0"></iframe>
      <div>{valorDaPaginaBpostMsg}</div>

    </div>
  );
}

export default App;
