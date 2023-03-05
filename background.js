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
      const result = getTLDR( info.selectionText );
      // FIXME: pass the selected text to popup
      // TODO: get the selected text and pass it to the input field in the popup and then inform the user to click on the icon and then regular behavior 
      alert(result);
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

//   const payload = {
//     model: "text-davinci-003",
//     prompt: "Give me a TLDR of the following text: " + message ,
//     temperature: 0.7,
//     max_tokens: 200,
//     top_p: 1,
//     frequency_penalty: 0,
//     presence_penalty: 0,
//     stream: false,
//     n: 1
//   };
  
// const apiKey =  "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";


// fetch('https://api.openai.com/v1/completions', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${apiKey}`
//     },
//     body: JSON.stringify(payload)
// }).then(response => response.json()).then(data => {
//   console.log(data);
//   const summary = data.choices[0].text;
//   return 'According to the The Athletic, the Blues failed to submit the correct paperwork ahead of the January 31 deadline, with other reports claiming Chelsea sent the wrong documents on three separate occasions.'
// });


return 'According to the The Athletic, the Blues failed to submit the correct paperwork ahead of the January 31 deadline, with other reports claiming Chelsea sent the wrong documents on three separate occasions.'


}
