const downloadDataURI = (uri: string, name: string, mimetype: string) => {
  const bytes = atob(uri);
  const byteNumbers = bytes.split('').map(c => c.charCodeAt(0));
  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray], { type: mimetype });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.download = name;
  link.href = url;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default downloadDataURI;
