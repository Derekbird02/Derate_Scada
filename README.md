javascript:window.open('', '_blank').document.write(`
  <html>
    <head><title>Image</title></head>
    <body style="margin:0">
      <img src="${__value.raw}" style="max-width:100%;height:auto">
    </body>
  </html>
`);

<button onclick="window.open().document.write('<img src=\'data:image/png;base64,PUT_BASE64_HERE\'>')">View Image</button>