const downloadDataURI = (uri: string, name: string, mimetype: string) => {
  const bytes = atob(uri);

  const byteNumbers = new Array(bytes.length);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < bytes.length; i++) {
    byteNumbers[i] = bytes.charCodeAt(i);
  }
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
