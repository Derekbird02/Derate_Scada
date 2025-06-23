javascript:window.open('', '_blank').document.write(`
  <html>
    <head><title>Image</title></head>
    <body style="margin:0">
      <img src="${__value.raw}" style="max-width:100%;height:auto">
    </body>
  </html>
`);

<button onclick="window.open().document.write('<img src=\'data:image/png;base64,PUT_BASE64_HERE\'>')">View Image</button>

javascript:window.open().document.write('<html><body style="margin:0"><img src="${__data.fields.image_data.values[0]}" style="max-width:100%"></body></html>');

javascript:(() => {
  const win = window.open();
  win.document.write('<html><head><title>PNG</title></head><body style="margin:0"><img src="' + ${__data.fields.image_data.values[0]} + '" style="max-width:100%"></body></html>');
})();