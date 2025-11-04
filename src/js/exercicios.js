// Dados das questões para cada tipo de exercício
const exerciciosData = {
    nucleo: [
        { id: 'q1', correta: 'b', explicacao: 'o núcleo contém o DNA, onde estão os genes que regulam todas as funções celulares, controlando o metabolismo e a síntese de proteínas.' },
        { id: 'q2', correta: 'b', explicacao: 'a carioteca é uma dupla membrana com poros nucleares que controlam a entrada e saída de moléculas, como RNA e proteínas.' },
        { id: 'q3', correta: 'b', explicacao: 'na mitose, a carioteca se desorganiza para permitir a separação dos cromossomos, que se condensam a partir da cromatina.' },
        { id: 'q4', correta: 'b', explicacao: 'o nucléolo é responsável pela síntese de RNA ribossômico (rRNA) e pela formação das subunidades dos ribossomos, que depois vão para o citoplasma.' },
        { id: 'q5', correta: 'c', explicacao: 'células procarióticas (bactérias) não possuem carioteca; seu DNA fica disperso no citoplasma (nucleoide).' },
        { id: 'q6', correta: 'b', explicacao: 'os cromossomos são formados por DNA + proteínas histonas, responsáveis pela compactação e organização do material genético.' },
        { id: 'q7', correta: 'c', explicacao: 'o DNA contém os genes que codificam as proteínas, determinando o funcionamento e as características do organismo.' },
        { id: 'q8', correta: 'c', explicacao: 'os poros nucleares permitem a passagem de moléculas como RNA mensageiro (mRNA), que sai do núcleo para ser traduzido no citoplasma.' },
        { id: 'q9', correta: 'b', explicacao: 'o nucleoplasma, também chamado de carioplasma, é o fluido interno do núcleo. Ele contém íons, enzimas e nucleotídeos, servindo de meio para as atividades metabólicas nucleares e sustentando a cromatina e o nucléolo.' },
        { id: 'q10', correta: 'a', explicacao: 'a cromatina é o DNA em sua forma descondensada e ativa (permitindo a transcrição). Durante a divisão, ela se condensa formando os cromossomos.' }
    ],
    cromossomos: [
        { id: 'q1', correta: 'c', explicacao: 'os cromossomos são formados por DNA associado a proteínas histonas, que ajudam na compactação e organização do material genético dentro do núcleo.' },
        { id: 'q2', correta: 'b', explicacao: 'ao se condensar, o DNA torna-se mais compacto e protegido, o que facilita a separação correta dos cromossomos durante a mitose e a meiose.' },
        { id: 'q3', correta: 'c', explicacao: 'as células somáticas humanas são diploides (2n) e possuem 46 cromossomos, organizados em 23 pares — 22 pares autossômicos e 1 par sexual.' },
        { id: 'q4', correta: 'c', explicacao: 'a mitose mantém o número de cromossomos (2n → 2n), enquanto a meiose reduz o número pela metade (2n → n), originando células haploides, como os gametas.' },
        { id: 'q5', correta: 'b', explicacao: 'o 23º par de cromossomos é o sexual — XX em mulheres e XY em homens —, responsável por determinar o sexo biológico.' },
        { id: 'q6', correta: 'c', explicacao: 'o centrômero é a região que mantém unidas as duas cromátides-irmãs, sendo essencial na movimentação dos cromossomos durante a divisão celular.' },
        { id: 'q7', correta: 'b', explicacao: 'os telômeros protegem as extremidades dos cromossomos contra degradação. A cada divisão celular, eles se encurtam, o que está relacionado ao envelhecimento celular.' },
        { id: 'q8', correta: 'b', explicacao: 'o número 47 indica uma aneuploidia — alteração numérica nos cromossomos. Um exemplo é a Síndrome de Down, causada por uma trissomia no cromossomo 21.' },
        { id: 'q9', correta: 'a', explicacao: 'na metáfase, os cromossomos alinhados no plano equatorial permitem a separação igualitária das cromátides durante a anáfase.' },
        { id: 'q10', correta: 'c', explicacao: 'os cromossomos homólogos formam pares que possuem genes para as mesmas características (por exemplo, cor dos olhos), sendo um de origem materna e outro paterna.' }
    ],
    cancer: [
        { id: 'q1', correta: 'c', explicacao: 'O câncer resulta do crescimento celular descontrolado, com divisão contínua e perda da regulação normal do ciclo celular.' },
        { id: 'q2', correta: 'b', explicacao: 'Tumores malignos têm capacidade de invadir tecidos adjacentes e de formar metástases, enquanto benignos permanecem localizados.' },
        { id: 'q3', correta: 'b', explicacao: 'Agentes mutagênicos podem causar alterações no DNA que desregulam o ciclo celular, favorecendo o desenvolvimento do câncer.' },
        { id: 'q4', correta: 'a', explicacao: 'Proto-oncogenes podem se tornar oncogenes e estimular divisão celular excessiva; genes supressores de tumor normalmente controlam o ciclo celular e a apoptose.' },
        { id: 'q5', correta: 'c', explicacao: 'A metástase é a disseminação de células malignas para tecidos distantes, formando novos focos tumorais.' },
        { id: 'q6', correta: 'b', explicacao: 'O exame Papanicolau identifica alterações celulares precoces, permitindo intervenção antes do desenvolvimento do câncer.' },
        { id: 'q7', correta: 'b', explicacao: 'A radiação UV provoca mutações no DNA das células da pele, aumentando o risco de câncer.' },
        { id: 'q8', correta: 'b', explicacao: 'A quimioterapia envolve drogas que atacam células que se dividem rapidamente, característica típica das células cancerígenas.' },
        { id: 'q9', correta: 'c', explicacao: 'A prevenção primária busca impedir o surgimento do câncer reduzindo fatores de risco ambientais e comportamentais.' },
        { id: 'q10', correta: 'c', explicacao: 'Células cancerígenas geralmente perdem diferenciação, ou seja, não desempenham adequadamente a função original do tecido.' }
    ]
};

/**
 * Obtém o tipo de exercício baseado no nome da página
 */
function obterTipoExercicio() {
    const url = window.location.pathname;
    if (url.includes('nucleo')) return 'nucleo';
    if (url.includes('cromossomos')) return 'cromossomos';
    if (url.includes('cancer')) return 'cancer';
    return null;
}

/**
 * Extrai informações da opção selecionada
 */
function obterInfoOpcao(input) {
    if (!input) {
        return { valor: 'Nenhuma', texto: 'Não respondeu.' };
    }
    const label = document.querySelector(`label[for="${input.id}"]`);
    return {
        valor: input.value.toUpperCase(),
        texto: label ? label.innerText.trim() : ''
    };
}

/**
 * Verifica as respostas do exercício
 */
function verificarRespostas() {
    const tipoExercicio = obterTipoExercicio();
    
    if (!tipoExercicio || !exerciciosData[tipoExercicio]) {
        console.error('Tipo de exercício não identificado ou dados não encontrados');
        return;
    }

    const questoes = exerciciosData[tipoExercicio];
    let acertos = 0;

    const detalhes = questoes.map((questao, indice) => {
        const selecionada = document.querySelector(`input[name="${questao.id}"]:checked`);
        const corretaInput = document.querySelector(`input[name="${questao.id}"][value="${questao.correta}"]`);
        const acertou = selecionada && selecionada.value === questao.correta;
        if (acertou) acertos++;

        return {
            numero: indice + 1,
            acertou,
            escolhida: obterInfoOpcao(selecionada),
            correta: obterInfoOpcao(corretaInput),
            explicacao: questao.explicacao
        };
    });

    const total = questoes.length;
    const porcentagem = Math.round((acertos / total) * 100);
    const incorretas = total - acertos;

    const resultado = document.getElementById('resultado');
    resultado.style.display = 'block';
    resultado.innerHTML = `
        <div class="alert ${acertos === total ? 'alert-success' : 'alert-info'}">
            <strong>Resultado:</strong> Você acertou ${acertos} de ${total} questões (${porcentagem}%).<br>
            Questões corretas: ${acertos} | Questões incorretas: ${incorretas}
        </div>
        <div class="mt-3">
            ${detalhes.map(detalhe => `
                <div class="card mb-3 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Questão ${detalhe.numero}</h5>
                        <p class="card-text"><strong>Sua resposta:</strong> ${detalhe.escolhida.valor} - ${detalhe.escolhida.texto}</p>
                        <p class="card-text"><strong>Resposta correta:</strong> ${detalhe.correta.valor} - ${detalhe.correta.texto}</p>
                        <p class="card-text"><strong>Justificativa:</strong> ${detalhe.explicacao}</p>
                        <span class="badge ${detalhe.acertou ? 'bg-success' : 'bg-danger'}">${detalhe.acertou ? 'Acertou' : 'Errou'}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    resultado.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
