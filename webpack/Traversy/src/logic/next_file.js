const fn = (txt) => {
  console.log(txt);
  document.querySelector('#page-title').textContent = txt;
}

export default fn;
