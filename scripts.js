var horaIncidente = document.getElementById("horaIncidente");
var modal = document.getElementById("modal");
var dataAquisicao = document.getElementById("dataAquisicao");
const requiredInputs = [
  document.getElementById("selectBandeira"),
  document.getElementById("filial"),
  document.getElementById("date"),
  document.getElementById("tecnico"),
  document.getElementById("ativo"),
  document.getElementById("marca"),
  document.getElementById("modelo"),
  document.getElementById("numSerie"),
  document.getElementById("patrimonio"),
  document.getElementById("setor"),
  document.getElementById("descricaoDetalhada"),
  document.getElementById("impactoFuncionamento"),
  document.getElementById("danosEquipamento"),
  document.getElementById("medidasImediatas"),
  document.getElementById("recomendacoes"),
  document.getElementById("envolvidos"),
  document.getElementById("supervisor"),
  document.getElementById("imageInput1"),
  document.getElementById("imageInput2"),
  document.getElementById("imageInput3"),
  document.getElementById("imageInput4"),
];

function mostrarModal() {
  modal.style.visibility = "visible";
  modal.style.display = "flex";
}

const inputs = document.querySelectorAll('input[type="file"]');

inputs.forEach((input) => {
  const label = document.querySelector(label[for=${input.id}]);

  input.addEventListener("change", function () {
    if (input.files.length > 0) {
      label.classList.add("selected");
      label.textContent = "Imagem Selecionada";
    }
  });
});

function formatarData(data) {
  let date = data.split("-");
  const dateBR = ${date[2]}/${date[1]}/${date[0]};
  return dateBR;
}

document.getElementById("imageInput1").addEventListener("change", function () {
  handleImageSelection(this, "image1");
});

document.getElementById("imageInput2").addEventListener("change", function () {
  handleImageSelection(this, "image2");
});

document.getElementById("imageInput3").addEventListener("change", function () {
  handleImageSelection(this, "image3");
});

document.getElementById("imageInput4").addEventListener("change", function () {
  handleImageSelection(this, "image4");
});

function handleImageSelection(input, imageId) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const imgElement = document.createElement("img");
      imgElement.src = event.target.result;

      const targetCell = document.getElementById(imageId);
      targetCell.innerHTML = "";
      targetCell.appendChild(imgElement);
    };

    reader.readAsDataURL(file);
  } else {
    alert("Por favor, selecione ou tire uma foto.");
  }
}

function generatePDF() {
  let allFieldsFilled = true;

  requiredInputs.forEach((input) => {
    if (!input.value) {
      input.style.border = "1px solid red";
      allFieldsFilled = false;
    } else {
      input.style.border = "1px solid #0867ff92";
    }
  });

  // Se algum campo não estiver preenchido, exibe mensagem e não gera o PDF
  if (!allFieldsFilled) {
    // alert("Por favor, preencha todos os campos obrigatórios.");
    Toastify({
      text: "Preencha todos os campos obrigatórios",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "red",
      },
    }).showToast();
     return;
  }

  // Função original de geração do PDF
  let beforeElement = document.createElement("div");
  let afterElement = document.createElement("div");

  beforeElement.innerHTML = `
    <div class="header">
                <img src="./img/logo-gp-pereira.svg" alt="">
            </div>
            <table>
                <thead>
                    <tr>
                        <th style="text-align: center; font-size: x-large;">
                            RELATÓRIO DE MAU USO
                        </th>
                    </tr>
                </thead>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>
                            BANDEIRA:
                        </th>
                        <th>
                            ${requiredInputs[0].value.toUpperCase()}
                        </th>

                        <th>
                            FILIAL:
                        </th>
                        <th>
                            ${requiredInputs[1].value.toUpperCase()}
                        </th>

                        <th>
                            DATA DO RELATÓRIO:
                        </th>
                        <th>
                            ${formatarData(requiredInputs[2].value)}
                        </th>
                    </tr>
                </thead>
            </table>
            <table>
                <thead>
                    <tr>
                        <th style="width: 50%;">ELABORADO POR (RESPONSÁVEL):</th>
                        <th>${requiredInputs[3].value.toUpperCase()}</th>
                    </tr>
                </thead>
            </table>
            <table>
                <thead>
                    <tr>
                        <th style="text-align: center;">1. REGISTRO DE ESPECIFICAÇÕES TÉCNICAS</th>
                    </tr>
                </thead>
            </table>
            <table>
                <thead>
                    <tr>
                        <th style="width: 25%;">ATIVO:</th>
                        <th style="width: 15%;">${requiredInputs[4].value.toUpperCase()}</th>
                        <th>MARCA</th>
                        <th>${requiredInputs[5].value.toUpperCase()}</th>
                    </tr>
                    <tr>
                        <th>MODELO:</th>
                        <th>${requiredInputs[6].value.toUpperCase()}</th>
                        <th>N° DE SÉRIE</th>
                        <th>${requiredInputs[7].value.toUpperCase()}</th>
                    </tr>
                    <tr>
                        <th>PATRIMÔNIO:</th>
                        <th>${requiredInputs[8].value.toUpperCase()}</th>
                        <th>SETOR</th>
                        <th>${requiredInputs[9].value.toUpperCase()}</th>
                    </tr>
                    <tr>
                        <th>DATA DE AQUISIÇÃO DO EQUIPAMENTO:</th>
                        <th>${formatarData(dataAquisicao.value)}</th>
                        <th style="width: 25%;">DATA E HORA DO INCIDENTE</th>
                        <th style="width: 20%;">${horaIncidente.value.toUpperCase()}</th>
                    </tr>
                </thead>
            </table>
            <table>
                <thead>
                    <tr>
                        <th style="text-align: center;">2.DESCRIÇÃO</th>
                    </tr>
                </thead>
            </table>
            <table>
                <thead>
                    <tr>
                        <th style="width: 30%; height: 190px;">
                            DESCRIÇÃO DETALHADA DO MAU USO
                            <small>(Descrever o que aconteceu, como foi o mau uso e as circunstâncias em que
                                ocorreu.
                                Incluir se houve envolvimento de funcionários ou clientes.)</small>
                        </th>
                        <th>${requiredInputs[10].value.toUpperCase()}</th>
                    </tr>
                </thead>
            </table>
            <table>
                <thead>
                    <tr>
                        <th style="text-align: center;">3.CONSEQUÊNCIAS</th>
                    </tr>
                </thead>
            </table>
            <table>
                <thead>
                    <tr>
                        <th style="width: 30%; height: 190px;">
                            IMPACTO NO FUNCIONAMENTO:
                            <small>(Descrever como o mau uso afetou as operações da loja como: atrasos, perda de
                                vendas,etc.)</small>
                        </th>
                        <th>${requiredInputs[11].value.toUpperCase()}</th>
                    </tr>
                    <tr>
                        <th style="width: 30%; height: 190px;">
                            DANOS NO EQUIPAMENTO:
                            <small>(Descrever se houve danos físicos, necessidade de reparos ou substituição de
                                equipamento.)</small>
                        </th>
                        <th>${requiredInputs[12].value.toUpperCase()}</th>
                    </tr>
                </thead>
            </table>
            <div class="footer" style="margin: 30px 0;">
                <img src="./img/footer.png" alt="">
            </div>

            <div class="header">
                <img src="./img/logo-gp-pereira.svg" alt="">
            </div>
            <table>
                <thead>
                    <tr>
                        <th style="text-align: center;">4.AÇÕES CORRETIVAS</th>
                    </tr>
                </thead>
            </table>
            <table>
                <thead>
                    <tr>
                        <th style="width: 30%; height: 180px;">
                            MEDIDAS IMEDIATAS:
                            <small>(Descrever as ações tomadas imediatamente após o incidente.)</small>
                        </th>
                        <th>${requiredInputs[13].value.toUpperCase()}</th>
                    </tr>
                    <tr>
                        <th style="width: 30%; height: 180px;">
                            RECOMENDAÇÕES PARA PREVENÇÃO FUTURA:
                            <small>(Sugestões de como evitar que isso ocorra novamente, como treinamentos,
                                sinalizações,
                                etc.)</small>
                        </th>
                        <th>${requiredInputs[14].value.toUpperCase()}</th>
                    </tr>
                </thead>
            </table>
  `;

  afterElement.innerHTML = `
    <table>
                <thead>
                    <tr>
                        <th style="text-align: center;">6.APROVAÇÃO:</th>
                    </tr>
                </thead>
            </table>
            <table>
                <thead>
                    <tr>
                        <th style="width: 50%;">
                            NOME(S) DO(S) FUNCIONÁRIO(S) ENVOLVIDO(S):
                        </th>
                        <th>
                        ${requiredInputs[15].value.toUpperCase()}
                        </th>
                    </tr>
                    <tr>
                        <th style="width: 30%;">
                            NOME DO SUPERVISOR:
                        </th>
                        <th>
                        ${requiredInputs[16].value.toUpperCase()}
                        </th>
                    </tr>
                    <tr>
                        <th style="width: 30%;">
                            ASSINATURA DO SUPERVISOR:
                        </th>
                        <th></th>
                    </tr>
                    <tr>
                        <th style="width: 30%;">
                            DATA DA APROVAÇÃO:
                        </th>
                        <th></th>
                    </tr>
                </thead>
            </table>
            <div class="footer" style="margin: 300px 0 10px 0;">
                <img src="./img/footer.png" alt="">
            </div>
  `;

  content.insertBefore(beforeElement, anexos);
  content.append(afterElement);

  content.insertBefore(beforeElement, anexos);
  content.append(afterElement);
  // Exibe o conteúdo para o PDF
  document.getElementById("content").style.display = "block";
  const element = document.getElementById("content");
  mostrarModal();
  html2pdf().set({
    margin: [0, 0, 0, 0],
  })
  .from(element)
  .save(Loja ${filial.value}_Relatório de mau uso_${requiredInputs[4].value}.pdf)
  .then(() => {
    // Ocultar o modal ao finalizar o download
    window.location.reload();
}).catch(error => {
    console.error("Erro ao gerar o PDF:", error);
    document.getElementById('modal').style.display = 'none';
});
}

requiredInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value) {
      input.style.border = "1px solid #0867ff92"; // Restaura a borda normal
    } else {
      input.style.border = "1px solid red"; // Borda vermelha se ainda estiver vazio
    }
  });
});
