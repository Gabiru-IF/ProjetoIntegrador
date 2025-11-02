// Dados das questões para cada tipo de exercício
const exerciciosData = {
    nucleo: [
        { id: 'q1', correta: 'b', explicacao: 'O núcleo abriga o DNA e regula quais genes serão expressos, controlando a produção de proteínas e, consequentemente, as atividades celulares.' },
        { id: 'q2', correta: 'b', explicacao: 'O envoltório nuclear é formado por duas membranas contínuas com o retículo endoplasmático e repletas de poros que controlam o tráfego de moléculas.' },
        { id: 'q3', correta: 'b', explicacao: 'O nucléolo reúne DNA ribossômico, RNA e proteínas para montar as subunidades dos ribossomos.' },
        { id: 'q4', correta: 'b', explicacao: 'Cromatina é o complexo de DNA, histonas e outras proteínas estruturais que permite compactação e regulação gênica.' },
        { id: 'q5', correta: 'b', explicacao: 'A duplicação do DNA ocorre na fase S do ciclo celular, garantindo que cada célula filha receba o material genético completo.' },
        { id: 'q6', correta: 'b', explicacao: 'Os poros nucleares possuem proteínas que reconhecem sinais específicos, permitindo a passagem seletiva de RNAs e proteínas nucleares.' },
        { id: 'q7', correta: 'b', explicacao: 'Eucromatina é menos condensada e acessível às enzimas de transcrição, estando associada a genes que estão sendo expressos.' },
        { id: 'q8', correta: 'b', explicacao: 'Hemácias maduras expulsam o núcleo durante a diferenciação; sem DNA, não conseguem transcrever novos RNAs ou sintetizar proteínas.' },
        { id: 'q9', correta: 'b', explicacao: 'O cariótipo exibe o número e a morfologia dos cromossomos de uma espécie, organizados em pares homólogos.' },
        { id: 'q10', correta: 'b', explicacao: 'O nucleoplasma é um fluido rico em enzimas, nucleotídeos e íons que sustenta as estruturas nucleares e permite as reações metabólicas.' }
    ],
    cromossomos: [
        { id: 'q1', correta: 'b', explicacao: 'Células somáticas humanas são diploides e possuem 46 cromossomos, organizados em 23 pares homólogos.' },
        { id: 'q2', correta: 'b', explicacao: 'Os cromossomos armazenam o DNA e garantem que a informação genética seja transmitida para as células-filhas.' },
        { id: 'q3', correta: 'b', explicacao: 'A síndrome de Down decorre da presença de três cópias do cromossomo 21 em vez de duas.' },
        { id: 'q4', correta: 'b', explicacao: 'Cromátides-irmãs são cópias idênticas produzidas na replicação do DNA e permanecem unidas pelo centrômero até a divisão.' },
        { id: 'q5', correta: 'b', explicacao: 'O centrômero é a região onde as cromátides se unem e por onde as fibras do fuso se ligam para separá-las.' },
        { id: 'q6', correta: 'b', explicacao: 'Na metáfase, os cromossomos se alinham no plano equatorial, permitindo a separação simétrica das cromátides.' },
        { id: 'q7', correta: 'b', explicacao: 'Células haploides possuem um único conjunto de cromossomos (n), enquanto diploides possuem dois conjuntos (2n).' },
        { id: 'q8', correta: 'b', explicacao: 'Os 22 pares de autossomos carregam genes para características gerais; o par sexual (X e Y) determina o sexo biológico em humanos.' },
        { id: 'q9', correta: 'b', explicacao: 'Crossing-over é a troca de segmentos entre cromátides de cromossomos homólogos na meiose, aumentando a variabilidade genética.' },
        { id: 'q10', correta: 'd', explicacao: 'Trissomia altera o número de cromossomos (aneuploidia), enquanto deleção, duplicação e translocação são alterações estruturais.' }
    ],
    cancer: [
        { id: 'q1', correta: 'b', explicacao: 'Câncer envolve divisão celular descontrolada com capacidade de invadir tecidos e formar metástases.' },
        { id: 'q2', correta: 'b', explicacao: 'O tabagismo é um dos principais fatores de risco modificáveis para diversos cânceres, especialmente pulmão.' },
        { id: 'q3', correta: 'b', explicacao: 'Metástase ocorre quando células tumorais migram do tumor primário para outros órgãos via sangue ou linfa.' },
        { id: 'q4', correta: 'c', explicacao: 'Quando ativados por mutações, proto-oncogenes tornam-se oncogenes que estimulam proliferação celular excessiva.' },
        { id: 'q5', correta: 'a', explicacao: 'O teste de Papanicolau detecta alterações pré-cancerosas no colo do útero, permitindo tratamento precoce.' },
        { id: 'q6', correta: 'b', explicacao: 'Tumores benignos permanecem localizados, têm crescimento lento e não invadem tecidos ou formam metástases.' },
        { id: 'q7', correta: 'c', explicacao: 'Hábitos saudáveis como não fumar, praticar exercícios e comer bem reduzem o risco de vários cânceres.' },
        { id: 'q8', correta: 'a', explicacao: 'A vacina contra HPV previne infecções por tipos oncogênicos do vírus, reduzindo câncer de colo uterino e outros.' },
        { id: 'q9', correta: 'd', explicacao: 'Feridas persistentes e nódulos de crescimento rápido são sinais de alerta e devem ser avaliados clínicamente.' },
        { id: 'q10', correta: 'b', explicacao: 'A quimioterapia emprega fármacos sistêmicos que atingem células em divisão acelerada, incluindo as tumorais.' }
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
