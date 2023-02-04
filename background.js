chrome.runtime.onMessage.addListener( data => {
    if ( data.type === 'notification' ) {
      tldr( data.message );
    }
  });
  
  chrome.runtime.onInstalled.addListener( () => {
    chrome.contextMenus.create({
      id: 'tldr',
      title: "TLDR: \"%s\"", 
      contexts:[ "selection" ]
    });
  });
  
  chrome.contextMenus.onClicked.addListener( ( info, tab ) => {
    if ( 'tldr' === info.menuItemId ) {
      getTLDR( info.selectionText );
      //chrome.action.openPopup()
    }
  } );
  
  const tldr = message => {
    chrome.storage.local.get( ['tldrCount'], data => {
		let value = data.tldrCount || 0;
		chrome.storage.local.set({ 'tldrCount': Number( value ) + 1 });
	} );
    return chrome.notifications.create(
      '',
      {
        type: 'basic',
        title: 'TLDR;',
        message: message || 'TLDR;',
        iconUrl: './assets/icons/128.png',
      }
    );
  };


const getTLDR = message => {

  const payload = {
    model: "text-davinci-003",
    prompt: "Extract three important keywords from the text and return them as a comma-separated list of one-word keywords. the response should only be that comma-separated list of one-word keywords. The text is: \n" + message ,
    temperature: 0.7,
    max_tokens: 200,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: false,
    n: 1
  };
  
const apiKey =  "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";


fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
}).then(response => response.json()).then(data => {
  console.log(data);
  const summary = data.choices[0].text;
  console.log(summary);
});

}
