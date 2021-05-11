window.onload = function () {
  let paletaCores = document.querySelector('#color-palette');
  let quadro = document.querySelector('#pixel-board');
  let inputCor = document.querySelector('#input-cor');
  let tamanhoQuadro = 5;
  
  geraCores();
  criaQuadro(tamanhoQuadro);
  novoQuadro();
  pintaPixel();
  apagar();

  let cores = document.querySelectorAll('.color');

  let corInicial = cores[0];
  
  corInicial.className = 'color selected';
  
  for (index = 0; index < cores.length; index += 1) {
    cores[index].addEventListener('click', function (event) {
      for (let index = 0; index < cores.length; index += 1) {
        if (cores[index].className === 'color selected') {
          cores[index].className = 'color';
        }
        event.target.className = 'color selected';
      }
    });
  }
  
  function apagar() {
    let pixel = document.querySelectorAll('.pixel');
    let botaoApaga = document.querySelector('#clear-board');
    botaoApaga.addEventListener('click', function () {
      for (let index = 0; index < pixel.length; index += 1) {
        pixel[index].style.backgroundColor = 'white';
      }
    });
  }

  function pintaPixel() {
    let pixel = document.querySelectorAll('.pixel');
    for (let index = 0; index < pixel.length; index += 1) {
      pixel[index].addEventListener('click', function (event) {
        let corSelecionada = document.querySelector('.color.selected');
        event.target.style.backgroundColor =
          corSelecionada.value;
      });
    }
  }

  let botaoTamanho = document.querySelector('#generate-board');
  let inputTamanho = document.querySelector('.input-size');
  botaoTamanho.addEventListener('click', mudaTamanho);

  inputCor.addEventListener('keyup', function (event) {
    if (event.keyCode == 13) {
      inputMudaCores();
    }
  });

  
  inputTamanho.addEventListener('keyup', function (event) {
    var key = event.which || event.keyCode;
    if (key == 13) {
      mudaTamanho();
    }
  })


  function mudaTamanho() {
    if (parseInt(inputTamanho.value) == parseInt(tamanhoQuadro)) {
      alert('O quadro já está no tamanho inserido');
    } else if (parseInt(inputTamanho.value) < 5 || inputTamanho.value === '') {
      tamanhoQuadro = 5;
      alert('Board inválido!');
      novoQuadro();
    } else if (parseInt(inputTamanho.value) > 50) {
      tamanhoQuadro = 50;
      alert('Board inválido!');
      novoQuadro();
    } else {
      tamanhoQuadro = parseInt(inputTamanho.value);
      novoQuadro();
    }
  }

  function criaPaletaCores(cores) {
    for (let index = 0; index < cores.length; index += 1) {
      let novaCor = document.createElement('input');
      novaCor.type = 'color';
      novaCor.className = 'color';
      paletaCores.appendChild(novaCor);
    }
  }

  function criaQuadro(tamanho) {
    for (let index = 0; index < tamanho; index += 1) {
      let novaLinha = document.createElement('tr');
      quadro.appendChild(novaLinha);

      for (let index = 0; index < tamanho; index += 1) {
        let novaColuna = document.createElement('td');
        novaColuna.className = 'pixel';
        novaLinha.appendChild(novaColuna);
      }
    }
  }

  function novoQuadro() {
    let remove = document.querySelectorAll('tr');
    for (let index = 0; index < remove.length; index += 1) {
      quadro.removeChild(remove[index]);
    }
    criaQuadro(tamanhoQuadro);
    apagar();
    pintaPixel();
  }
  
  
  function geraCores() {
    let coresPaleta = ['black'];
    for (let index = 0; index < 3; index += 1) {
      let novaCor =
        '#' +
        parseInt(Math.random() * 0xffffff)
          .toString(16)
          .padStart(6, '0');

      coresPaleta.push(novaCor);
    }
    criaPaletaCores(coresPaleta);
  }
};
