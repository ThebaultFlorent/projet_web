function reinit() {

  var data = "a=0"
  fetch('reinit.php', {
    method: 'post',
    body: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(r => r.json())
  .then(r => {
    console.log(r);
  })
}

window.addEventListener('load', reinit);
