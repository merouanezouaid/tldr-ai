const text = document.getElementById( 'tldr-text' );
const tldr = document.getElementById( 'tldr-button' );
const reset = document.getElementById( 'tldr-reset' );
const counter = document.getElementById( 'tldr-count' );
const output = document.getElementById( 'output' );
const outputLabel = document.getElementById( 'output-label' );
const keywords = document.getElementById( 'keywords' );
const copy = document.getElementById( 'copy' );
const loader = document.getElementById( 'loader' );



window.addEventListener("unload", function(event) {
    event.preventDefault();
});


chrome.storage.onChanged.addListener( ( changes, namespace ) => {
	if ( changes.tldrCount ) {
		let value = changes.tldrCount.newValue || 0;
		counter.innerHTML = value;
	}
});

tldr.addEventListener("click", function() {
  if(text.value.replaceAll(" ", "").length != 0){
	tldr.disabled = true;
	tldr.innerHTML = "Loading..";
	if (loader.style.display === "none") {
		loader.style.display = "block";
	}
	getTLDR(text.value)
  }
});


output.addEventListener("keydown", function(event) {
	if (event.key === "Backspace" || event.key === "Delete" || event.ctrlKey && event.key === 'x') {
	  event.preventDefault();
	}
  });


function copy2clipboard() {	
	// Select the text field
	output.select();
	output.setSelectionRange(0, 99999); // For mobile devices
  
	output.focus();
	 // Copy the text inside the text field
	 document.execCommand("copy");
	 output.blur();
	// Alert the copied text
	copy.innerHTML = "✅ Copied to Clipboard"
}


copy.addEventListener("click", function() {
	copy2clipboard(copy.value)
});




const getTLDR = message => {

	const prompt1 = "Extract three important keywords from the following text and return them as a comma-separated list of one-word keywords. the response should exactly and only be that comma-separated list of 3 one-word keywords. The text is:  " + message;
	const prompt2 = "Give me a TLDR of the following text: " + message;

	const payload = {
	  model: "text-davinci-003",
	  temperature: 0.7,
	  max_tokens: 200,
	  top_p: 1,
	  frequency_penalty: 0,
	  presence_penalty: 0,
	  stream: false,
	  n: 1
	};
	
  const apiKey =  "YOUR_API_KEY";
  
  fetch('https://api.openai.com/v1/completions', {
	  method: 'POST',
	  headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${apiKey}`
	  },
	  body: JSON.stringify(Object.assign(payload, {prompt: prompt1}))
	}).then(response => response.json()).then(data => {
		console.log(data);
		const keyword = data.choices[0].text;
		outputLabel.innerHTML = "Your generated TLDR";
		keywords.innerHTML = keyword;
		fetch('https://api.openai.com/v1/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${apiKey}`
			},
		body: JSON.stringify(Object.assign(payload, {prompt: prompt2}))
	}).then(response => response.json()).then(data => {
	  console.log(data);
	  const summary = data.choices[0].text.replace(/^\n\n/, "");;
	  output.value = summary;
	  if (loader.style.display === "block") {
		loader.style.display = "none";
	  }
	  if (output.style.display === "none") {
		output.style.display = "block";
	  }
	  if (copy.style.display === "none") {
		copy.style.display = "block";
	  }
	  tldr.disabled = false;
	  tldr.innerHTML = "Resummarize!";
	})
  })
  
  }