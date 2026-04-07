#!/usr/bin/env python3
"""
Gerador da Apostila: Guia Completo de Impostos para Imigrantes nos EUA
Gera HTML com design profissional e converte para PDF usando weasyprint.
"""

import subprocess
import sys
import os

# ============================================================
# CONTEÚDO DOS CAPÍTULOS
# ============================================================

CAP5A = """
<h2 id="cap5a">Capítulo 5A — Dependentes: Quem Você Pode Declarar e Como Isso Afeta Seu Imposto</h2>
<p class="subtitle">Descubra quem pode ser seu dependente, quais documentos precisa e como isso pode aumentar seu reembolso em milhares de dólares.</p>

<div class="box-learn">
<strong>📖 Neste capítulo você vai aprender:</strong>
<ul>
<li>Diferença entre <em>qualifying child</em> e <em>qualifying relative</em></li>
<li>Quais documentos você precisa para provar um dependente</li>
<li>Como dependentes aumentam seus créditos e reembolso</li>
<li>Erros comuns que fazem imigrantes perderem dinheiro</li>
<li>Regras quando os pais são separados ou divorciados</li>
</ul>
</div>

<h3>1. Por que dependentes importam tanto?</h3>
<p>Para muitos imigrantes, declarar dependentes é a diferença entre receber um reembolso bom ou dever dinheiro ao IRS. Um único dependente qualificado pode gerar até <strong>$2.200</strong> em Child Tax Credit, além de outros créditos como o Earned Income Credit (EIC) e o Child and Dependent Care Credit.</p>

<div class="box-example">
<strong>Exemplo prático:</strong><br>
Maria tem 2 filhos menores e ganhou $38.000 no ano. Sem declarar os filhos, ela deveria ~$2.500 de imposto. Declarando os 2 filhos como dependentes, ela recebeu <strong>$4.800 de reembolso</strong>. A diferença? Mais de <strong>$7.000</strong>.
</div>

<h3>2. Os dois tipos de dependente que o IRS reconhece</h3>
<p>O IRS divide dependentes em duas categorias. Entender a diferença é fundamental:</p>

<h4>A) Qualifying Child (Filho Qualificado)</h4>
<p>Para que uma criança seja considerada <em>qualifying child</em>, ela precisa atender a <strong>5 requisitos</strong>:</p>

<table class="styled-table">
<thead><tr><th>Requisito</th><th>O que significa</th><th>Exemplo</th></tr></thead>
<tbody>
<tr><td><strong>Relação</strong></td><td>Filho(a), enteado(a), filho adotivo, irmão(ã), sobrinho(a), neto(a) ou meio-irmão(ã)</td><td>Seu filho, sua sobrinha que mora com você</td></tr>
<tr><td><strong>Idade</strong></td><td>Ter menos de 17 anos no final do ano fiscal (31 de dezembro)</td><td>Se o filho faz 17 em 15/01/2026, ele <strong>não</strong> qualifica para o ano fiscal 2027</td></tr>
<tr><td><strong>Residência</strong></td><td>Morar com você por mais da metade do ano (mais de 6 meses)</td><td>A criança morou com você de janeiro a setembro ✓</td></tr>
<tr><td><strong>Suporte</strong></td><td>A criança não pode ter provido mais da metade do próprio sustento</td><td>Se o filho adolescente trabalha e paga suas próprias contas — cuidado!</td></tr>
<tr><td><strong>Cidadania</strong></td><td>Ser cidadão americano, residente nacional ou residente alien com <strong>SSN válido</strong></td><td>ITIN <strong>não</strong> qualifica para CTC, mas pode qualificar para ODC ($500)</td></tr>
</tbody>
</table>

<div class="box-alert">
<strong>⚠️ Atenção:</strong> Se o seu filho tem ITIN (Individual Taxpayer Identification Number) em vez de SSN (Social Security Number), ele <strong>não qualifica</strong> para o Child Tax Credit de $2.200. Porém, pode qualificar para o Credit for Other Dependents de $500. Se seu filho não tem SSN, solicite o quanto antes no Social Security Office.
</div>

<h4>B) Qualifying Relative (Parente Qualificado)</h4>
<p>Nem todo dependente é criança. Você pode declarar um parente adulto se ele atender a estes critérios:</p>

<table class="styled-table">
<thead><tr><th>Requisito</th><th>O que significa</th></tr></thead>
<tbody>
<tr><td><strong>Relação</strong></td><td>Pais, avós, tios, sogros, parentes por afinidade ou qualquer pessoa que morou com você o ano inteiro como membro da casa</td></tr>
<tr><td><strong>Renda bruta</strong></td><td>O dependente não pode ter renda bruta superior a <strong>$5.050</strong> (ano fiscal 2027)</td></tr>
<tr><td><strong>Suporte</strong></td><td>Você deve ter provido mais da metade do sustento dessa pessoa</td></tr>
<tr><td><strong>Cidadania</strong></td><td>Ser cidadão americano, residente nacional ou residente alien (SSN ou ITIN)</td></tr>
<tr><td><strong>Status civil</strong></td><td>Não pode ser declarado como dependente por outra pessoa</td></tr>
</tbody>
</table>

<div class="box-example">
<strong>Exemplo:</strong><br>
João trouxe sua mãe do Brasil para morar com ele. Ela não trabalha, mora com ele desde janeiro, e ele paga mais da metade das despesas dela (aluguel, comida, plano de saúde). A mãe qualifica como <em>qualifying relative</em>. João pode reclamá-la como dependente e receber <strong>$500</strong> do Credit for Other Dependents — além de poder usar Head of Household se ele for solteiro, o que aumenta sua Standard Deduction.
</div>

<h3>3. Como dependentes afetam seus créditos (o dinheiro que volta para você)</h3>

<table class="styled-table">
<thead><tr><th>Crédito</th><th>Valor por dependente</th><th>Requisito do dependente</th><th>Reembolsável?</th></tr></thead>
<tbody>
<tr><td><strong>Child Tax Credit (CTC)</strong></td><td>Até $2.200</td><td>Qualifying Child com SSN</td><td>Parcialmente (ACTC: até $1.700)</td></tr>
<tr><td><strong>Credit for Other Dependents (ODC)</strong></td><td>$500</td><td>Qualifying Relative ou filho sem SSN</td><td>Não (reduz imposto, não gera reembolso)</td></tr>
<tr><td><strong>Earned Income Credit (EIC)</strong></td><td>Até ~$7.430 (com 3+ filhos)</td><td>Qualifying Child com SSN</td><td>Sim, totalmente reembolsável</td></tr>
<tr><td><strong>Child and Dependent Care Credit</strong></td><td>Até 35% de $3.000 (1 filho) ou $6.000 (2+ filhos)</td><td>Qualifying Child com SSN ou ITIN</td><td>Parcialmente (até 35% reembolsável)</td></tr>
</tbody>
</table>

<h4>Earned Income Credit (EIC) — o crédito mais poderoso para famílias</h4>
<p>O EIC é um crédito reembolsável — isso significa que mesmo se você não deve imposto nenhum, o IRS pode enviar dinheiro para você. Quanto mais filhos você tem qualificados, maior o crédito:</p>

<table class="styled-table">
<thead><tr><th>Quantidade de filhos</th><th>Renda máxima para receber EIC</th><td>C crédito máximo (aprox.)</td></tr></thead>
<tbody>
<tr><td>0 filhos</td><td>~$18.590</td><td>~$632</td></tr>
<tr><td>1 filho</td><td>~$49.084</td><td>~$4.213</td></tr>
<tr><td>2 filhos</td><td>~$55.768</td><td>~$6.960</td></tr>
<tr><td>3 ou mais filhos</td><td>~$59.899</td><td>~$7.830</td></tr>
</tbody>
</table>

<div class="box-tip">
<strong>💡 Dica importante:</strong> Para receber o EIC, você precisa ter <strong>renda earned</strong> (salário, trabalho autônomo). Se você trabalha informalmente e não declarou nada, pode estar perdendo esse crédito. E para o Additional Child Tax Credit (ACTC), você precisa ter pelo menos $2.500 de renda earned.
</div>

<h3>4. Documentos necessários para comprovar um dependente</h3>
<p>O IRS pode pedir documentos a qualquer momento para verificar seus dependentes. Tenha em mãos:</p>

<table class="styled-table">
<thead><tr><th>Documento</th><th>Por que precisa</th></tr></thead>
<tbody>
<tr><td>SSN ou ITIN do dependente</td><td>Obrigatório. Sem número, sem crédito.</td></tr>
<tr><td>Comprovante de residência</td><td>Contas de luz, água, contrato de aluguel, carta do school com o endereço</td></tr>
<tr><td>Certidão de nascimento</td><td>Prova a relação de parentesco</td></tr>
<tr><td>Documento de escola</td><td>Carta da escola confirmando matrícula e endereço</td></tr>
<tr><td>Cartão de vacinação / registros médicos</td><td>Mostra que a criança recebeu cuidados nos EUA</td></tr>
<tr><td>Documentos de custódia (se separados)</td><td>Acordo de divórcio ou carta do juiz definindo quem declara os filhos</td></tr>
<tr><td>Formulário 8332</td><td>Se um pai libera o dependente para o outro (ver seção 6)</td></tr>
</tbody>
</table>

<h3>5. Pais separados ou divorciados: quem declara o filho?</h3>
<p>Essa é uma das situações que mais gera problemas. Aqui estão as regras:</p>

<ul>
<li><strong>Regra geral:</strong> O pai ou a mãe com quem o filho morou por mais da metade do ano (mais de 6 meses) declara o dependente.</li>
<li><strong>Se o filho morou igual tempo com ambos:</strong> O pai ou a mãe com maior renda (adjusted gross income) declara.</li>
<li><strong>Se os pais são divorciados ou separados legalmente:</strong> O pai ou mãe com custódia física (custodial parent) declara, mesmo que o outro pague pensão alimentícia (child support).</li>
<li><strong>Formulário 8332:</strong> O pai/mãe com direito pode assinar o Form 8332 liberando a dependência para o outro. Isso é <strong>irrevogável</strong> para o ano em que foi assinado.</li>
</ul>

<div class="box-alert">
<strong>❌ Erro muito comum:</strong> Dois pais declarando o mesmo filho no mesmo ano. O IRS vai processar a primeira declaração e rejeitar a segunda. O segundo pai/mãe receberá uma carta (CP87A) e precisará corrigir. Em casos de disputa, ambos os pais podem receber uma carta pedindo documentação de comprovação.
</div>

<h3>6. Erros comuns ao declarar dependentes</h3>

<div class="error-card">
<div class="error-title">❌ Erro 1: Declarar filho que não mora com você</div>
<div class="error-desc">Alguns imigrantes declaram sobrinhos, netos ou filhos de parentes que moram no Brasil. Se a criança não morou com você nos EUA por mais de 6 meses, ela <strong>não qualifica</strong> como dependent.</div>
</div>

<div class="error-card">
<div class="error-title">❌ Erro 2: Declarar filho sem SSN como qualifying child</div>
<div class="error-desc">Filho com ITIN qualifica apenas para <strong>$500</strong> (ODC), não para $2.200 (CTC). Se alguém prometeu $2.200 por filho com ITIN, isso está errado.</div>
</div>

<div class="error-card">
<div class="error-title">❌ Erro 3: Não ter documentos de custódia</div>
<div class="error-desc">Se você é divorciado(a) e declara os filhos, mas o outro pai também declara, o IRS vai pedir prova. Sem acordo de custódia ou Form 8332, você pode perder o crédito.</div>
</div>

<div class="error-card">
<div class="error-title">❌ Erro 4: Não solicitar SSN para o filho</div>
<div class="error-desc">Se seu filho nasceu nos EUA, ele é cidadão americano e tem direito ao SSN. Se nasceu no Brasil, você pode solicitar o SSN dele se ele for residente. Sem SSN, perde-se o CTC e o EIC.</div>
</div>

<div class="error-card">
<div class="error-title">❌ Erro 5: Não saber que pais podem ser dependentes</div>
<div class="error-desc">Se seus pais moram com você nos EUA e você paga mais da metade do sustento deles, eles podem ser seus dependentes. Isso dá $500 por parente e permite usar Head of Household (Standard Deduction maior).</div>
</div>

<h3>7. Head of Household: um benefício que muitos imigrantes não conhecem</h3>
<p>Se você é solteiro(a), tem um dependente qualificado e paga mais da metade das despesas da casa, você pode declarar como <strong>Head of Household</strong> em vez de Single. A diferença é enorme:</p>

<table class="styled-table">
<thead><tr><th>Status</th><th>Standard Deduction (2027)</th><th>Economia estimada</th></tr></thead>
<tbody>
<tr><td>Single</td><td>$15.000</td><td>—</td></tr>
<tr><td><strong>Head of Household</strong></td><td><strong>$22.500</strong></td><td><strong>~$1.500 a $2.250 a menos de imposto</strong></td></tr>
</tbody>
</table>

<div class="box-tip">
<strong>💡 Dica:</strong> Head of Household é um dos benefícios mais subestimados por imigrantes. Se você cria um filho sozinho(a) ou sustenta um parente, pergunte ao seu preparador se você qualifica. A economia pode ser de milhares de dólares ao longo dos anos.
</div>

<h3>8. Checklist de dependentes</h3>
<div class="checklist">
<ul>
<li>☐ Meu dependente tem SSN ou ITIN válido</li>
<li>☐ Meu dependente é cidadão americano, residente national ou residente alien</li>
<li>☐ Meu dependente morou comigo por mais de 6 meses (se qualifying child)</li>
<li>☐ Eu provejo mais da metade do sustento do meu dependente</li>
<li>☐ Tenho comprovante de residência do dependente</li>
<li>☐ Tenho certidão de nascimento ou documento que prove a relação</li>
<li>☐ Tenho carta da escola (se for criança em idade escolar)</li>
<li>☐ Verifiquei se o outro pai não vai declarar o mesmo filho (se separados)</li>
<li>☐ Tenho documento de custódia ou Form 8332 (se aplicável)</li>
<li>☐ Perguntei ao preparador se qualifico para Head of Household</li>
</ul>
</div>

<h3>9. Use o Quiz Familiar (Ferramenta F5)</h3>
<p>No final desta apostila, você vai encontrar o <strong>Quiz Familiar</strong> — uma ferramenta prática com perguntas simples que vão te ajudar a descobrir:</p>
<ul>
<li>Quem qualifica como seu dependente</li>
<li>Quais créditos você pode receber</li>
<li>Se você qualifica para Head of Household</li>
<li>Que documentos precisa reunir</li>
</ul>
<p>Responda as perguntas antes de ir ao preparador. Leve as respostas preenchidas — isso vai economizar tempo e garantir que você não perca nenhum benefício.</p>
"""

CAP5B = """
<h2 id="cap5b">Capítulo 5B — Como Pagar Menos Imposto Legalmente Durante o Ano</h2>
<p class="subtitle">Estratégias práticas que você pode começar a usar hoje para reduzir o imposto que paga ao longo do ano — não apenas na época da declaração.</p>

<div class="box-learn">
<strong>📖 Neste capítulo você vai aprender:</strong>
<ul>
<li>Como ajustar seu W-4 para não pagar demais (nem de menos)</li>
<li>Quando e como fazer pagamentos trimestrais (estimated taxes)</li>
<li>Como contribuir para IRA e HSA para reduzir imposto</li>
<li>Por que separar conta pessoal de conta de negócio é essencial</li>
<li>Como registrar quilometragem desde o primeiro dia do ano</li>
</ul>
</div>

<h3>1. O segredo: imposto não é apenas uma coisa do fim do ano</h3>
<p>A maioria dos imigrantes só pensa em imposto em março ou abril. Mas a verdade é que tudo o que você faz durante o ano — desde como preenche o W-4 até como guarda recibos — afeta diretamente quanto você vai pagar ou receber de reembolso.</p>

<p>Neste capítulo, você vai aprender 6 estratégias práticas que podem economizar milhares de dólares por ano. São coisas simples, que qualquer pessoa pode fazer, sem precisar ser contador.</p>

<h3>2. Estratégia 1: Ajuste seu W-4 corretamente</h3>

<h4>O que é o W-4?</h4>
<p>O W-4 (<em>Employee's Withholding Certificate</em>) é o formulário que você preenche quando começa um emprego. Ele diz ao seu empregador quanto imposto deve ser retido do seu salário.</p>

<div class="box-alert">
<strong>⚠️ Problema comum:</strong> Muitos imigrantes preenchem o W-4 errado e acabam tendo um dos dois problemas:
<ul>
<li><strong>Retenção demais:</strong> Você recebe um reembolso grande no fim do ano. Parece bom, mas na verdade você deu um empréstimo sem juros ao governo. Todo aquele dinheiro poderia ter estado na sua conta durante o ano.</li>
<li><strong>Retenção de menos:</strong> Você precisa pagar imposto na declaração. Pode ser uma surpresa desagradável de milhares de dólares.</li>
</ul>
</div>

<h4>Como ajustar o W-4:</h4>
<table class="styled-table">
<thead><tr><th>Situação</th><th>O que fazer no W-4</th></tr></thead>
<tbody>
<tr><td>Solteiro(a), sem dependentes, 1 emprego</td><td>Marque 1 dependente no Step 3 (ou deixe em branco para reter mais)</td></tr>
<tr><td>Casado(a), ambos trabalham</td><td>Use o <strong>IRS Tax Withholding Estimator</strong> (irs.gov/W4App) para calcular o valor ideal</td></tr>
<tr><td>Tem filhos e qualifica para CTC/EIC</td><td>Marque os dependentes no Step 3 — isso reduz a retenção mensal</td></tr>
<tr><td>Trabalha com 1099 (autônomo)</td><td>O W-4 não se aplica — você precisa fazer <strong>estimated tax payments</strong> (ver seção 3)</td></tr>
<tr><td>Recebeu reembolso grande (> $2.000)</td><td>Reduza a retenção — está emprestando dinheiro ao governo de graça</td></tr>
<tr><td>Deveu imposto no ano passado</td><td>Aumente a retenção ou faça estimated payments</td></tr>
</tbody>
</table>

<div class="box-tip">
<strong>💡 Ferramenta gratuita do IRS:</strong> Acesse <strong>irs.gov/W4App</strong> — o IRS Tax Withholding Estimator. É gratuito, em inglês, e calcula exatamente quanto deve ser retido do seu salário. Leva 10 minutos e pode economizar centenas de dólares.
</div>

<h4>Quando atualizar o W-4:</h4>
<ul>
<li>Casou ou divorciou</li>
<li>Teve um filho</li>
<li>Mudou de emprego</li>
<li>Comprou casa</li>
<li>Passou a ter renda extra (1099, aluguel)</li>
</ul>

<h3>3. Estratégia 2: Faça pagamentos trimestrais (Estimated Tax Payments)</h3>

<h4>Quem precisa fazer?</h4>
<p>Se você recebe 1099 (Uber, DoorDash, freelancing, construção, faxina) ou tem renda que não tem imposto retido automaticamente, você <strong>precisa</strong> fazer pagamentos trimestrais ao IRS. Se não fizer, pode pagar multas e juros.</p>

<h4>As 4 datas de pagamento (2027):</h4>
<table class="styled-table">
<thead><tr><th>Período</th><th>Data-limite de pagamento</th></tr></thead>
<tbody>
<tr><td>1º de janeiro a 31 de março</td><td><strong>15 de abril de 2027</strong></td></tr>
<tr><td>1º de abril a 31 de maio</td><td><strong>16 de junho de 2027</strong></td></tr>
<tr><td>1º de junho a 31 de agosto</td><td><strong>15 de setembro de 2027</strong></td></tr>
<tr><td>1º de setembro a 31 de dezembro</td><td><strong>15 de janeiro de 2026</strong></td></tr>
</tbody>
</table>

<h4>Quanto pagar?</h4>
<p>Uma regra prática: estime quanto você vai ganhar no ano e pague <strong>25% por trimestre</strong>. Isso cobre imposto de renda (income tax) + self-employment tax (15.3%).</p>

<div class="box-example">
<strong>Exemplo prático:</strong><br>
Carlos trabalha com Uber e estima ganhar $50.000 no ano.<br>
<br>
<strong>Passo 1:</strong> Cálculo aproximado:<br>
• Income tax (12%): $6.000<br>
• Self-employment tax (15.3% de 92.35%): ~$7.065<br>
• Total estimado: ~$13.065<br>
• Menos deduções (metade do SE tax + Standard Deduction): ~-$10.500<br>
• <strong>Imposto estimado: ~$2.565</strong><br>
<br>
<strong>Passo 2:</strong> Divida por 4 trimestres = <strong>~$642 por trimestre</strong><br>
<br>
<strong>Passo 3:</strong> Pague via <strong>IRS Direct Pay</strong> (irs.gov/pay) ou <strong>Form 1040-ES</strong>.
</div>

<div class="box-alert">
<strong>⚠️ Atenção:</strong> Se você também tem emprego com W-2, pode pedir ao seu empregador para reter mais imposto do seu salário para cobrir a parte do 1099. Para isso, preencha um novo W-4 e use a linha Extra Withholding no Step 4(c). Isso evita ter que fazer estimated payments separados.
</div>

<h3>4. Estratégia 3: Contribua para IRA e HSA</h3>

<h4>A) IRA (Individual Retirement Account)</h4>
<p>Contribuir para um IRA é uma das formas mais eficazes de reduzir imposto. Existem dois tipos principais:</p>

<table class="styled-table">
<thead><tr><th></th><th>Traditional IRA</th><th>Roth IRA</th></tr></thead>
<tbody>
<tr><td><strong>Quando paga imposto?</strong></td><td>Na aposentadoria (saque)</td><td>Agora (na contribuição)</td></tr>
<tr><td><strong>Reduz imposto agora?</strong></td><td><strong>✅ SIM</strong></td><td>Não</td></tr>
<tr><td><strong>Limite (2027)</strong></td><td>$7.000 ($8.000 se 50+)</td><td>$7.000 ($8.000 se 50+)</td></tr>
<tr><td><strong>Para quem?</strong></td><td>Quem quer reduzir imposto hoje</td><td>Quem quer dinheiro livre de imposto na aposentadoria</td></tr>
</tbody>
</table>

<div class="box-example">
<strong>Exemplo:</strong><br>
Ana ganha $55.000 e contribui $3.000 para um Traditional IRA.<br>
• Sem IRA: renda tributável = $55.000 → imposto ~$5.400<br>
• Com IRA: renda tributável = $52.000 → imposto ~$4.800<br>
• <strong>Economia: $600 no ano</strong> (e o dinheiro cresce livre de imposto até a aposentadoria!)
</div>

<h4>B) HSA (Health Savings Account)</h4>
<p>Se você tem um plano de saúde <strong>High Deductible Health Plan (HDHP)</strong>, pode abrir um HSA. É a conta com os melhores benefícios fiscais nos EUA:</p>

<table class="styled-table">
<thead><tr><th>Benefício</th><th>Valor (2027)</th></tr></thead>
<tbody>
<tr><td>Limite de contribuição (individual)</td><td>$4.300</td></tr>
<tr><td>Limite de contribuição (família)</td><td>$8.550</td></tr>
<tr><td>Extra se tiver 55+</td><td>+$1.000</td></tr>
<tr><td>Dedução fiscal?</td><td><strong>✅ SIM, reduz renda tributável dólar por dólar</strong></td></tr>
<tr><td>Crescimento livre de imposto?</td><td><strong>✅ SIM</strong></td></tr>
<tr><td>Saque livre de imposto para despesas médicas?</td><td><strong>✅ SIM</strong></td></tr>
</tbody>
</table>

<div class="box-tip">
<strong>💡 O HSA é o "super investimento":</strong> Diferente do FSA (Flexible Spending Account), o dinheiro do HSA <strong>não expira</strong>. Você pode investir o saldo e deixar crescer. Na aposentadoria, pode sacar para qualquer coisa (pagando imposto normal, como uma Traditional IRA). É literalmente um "super IRA" para despesas médicas.
</div>

<h3>5. Estratégia 4: Separe conta pessoal de conta de negócio</h3>

<p>Se você trabalha por conta própria (1099, Uber, DoorDash, faxina, construção, vendas), <strong>ter uma conta bancária separada para o negócio</strong> é uma das decisões mais importantes que você pode tomar.</p>

<h4>Por que separar?</h4>
<table class="styled-table">
<thead><tr><th>Sem separação</th><th>Com separação</th></tr></thead>
<tbody>
<tr><td class="red-cell">Confusão entre despesas pessoais e de negócio</td><td class="green-cell">Cada despesa é clara e fácil de provar</td></tr>
<tr><td class="red-cell">Não sabe quanto realmente ganhou</td><td class="green-cell">Relatório claro de renda e despesas</td></tr>
<tr><td class="red-cell">Risco de perder deduções</td><td class="green-cell">Todas as deduções são aproveitadas</td></tr>
<tr><td class="red-cell">Mais risco em caso de auditoria</td><td class="green-cell">Documentação organizada facilita tudo</td></tr>
</tbody>
</table>

<h4>O que você precisa:</h4>
<ul>
<li><strong>Conta bancária separada</strong> (pode ser uma checking account comum no seu banco)</li>
<li><strong>Cartão de débito</strong> vinculado a essa conta</li>
<li><strong>App de controle</strong> (pode ser planilha simples — veja Ferramenta F7 nesta apostila)</li>
<li><strong>Hábito:</strong> toda renda de negócio entra na conta de negócio; toda despesa de negócio sai dessa conta</li>
</ul>

<div class="box-example">
<strong>Exemplo:</strong><br>
Roberto faz faxina e trabalha com Handy. Antes, ele misturava tudo na conta pessoal e nunca sabia quanto gastou com materiais. Depois que abriu uma conta separada:<br>
• Ele viu que gastava ~$200/mês em materiais (que não deduzia antes)<br>
• Organizou 100% das despesas por categoria<br>
• <strong>Economizou ~$1.500 no imposto</strong> do primeiro ano
</div>

<h3>6. Estratégia 5: Registre quilometragem desde janeiro</h3>

<p>Se você usa o carro para trabalho (Uber, Lyft, DoorDash, visitas a clientes, imóveis de aluguel), a quilometragem é uma das maiores deduções disponíveis.</p>

<h4>Taxa de quilometragem do IRS (2027):</h4>
<table class="styled-table">
<thead><tr><th>Ano</th><th>Taxa por milha</th></tr></thead>
<tbody>
<tr><td>2027</td><td><strong>$0,70 por milha</strong></td></tr>
<tr><td>2024</td><td>$0,67 por milha</td></tr>
</tbody>
</table>

<div class="box-example">
<strong>Exemplo prático:</strong><br>
Fernanda dirige para Uber e faz 10.000 milhas por ano.<br>
• Dedução por quilometragem: 10.000 × $0,70 = <strong>$7.000</strong><br>
• Se ela está na faixa de 12% de imposto: economiza <strong>$840</strong><br>
• Se ela está na faixa de 22%: economiza <strong>$1.540</strong><br>
<br>
Sem registro = $0 de dedução. Com registro = até $1.540 de economia.
</div>

<h4>O que conta como quilometragem de negócio:</h4>
<ul class="green-list">
<li>✅ De casa até o primeiro cliente do dia</li>
<li>✅ Entre clientes</li>
<li>✅ Para comprar materiais ou suprimentos</li>
<li>✅ Para visitar imóvel de aluguel</li>
<li>✅ Para o banco (depósitos de negócio)</li>
<li>✅ Viagens de entrega (DoorDash, Instacart)</li>
</ul>

<h4>O que NÃO conta:</h4>
<ul class="red-list">
<li>❌ De casa até o trabalho fixo (emprego regular)</li>
<li>❌ De volta para casa após o trabalho fixo</li>
<li>❌ Saídas pessoais (supermercado, escola, igreja)</li>
<li>❌ Viagens de férias (mesmo que leve o carro)</li>
</ul>

<div class="box-tip">
<strong>💡 Dica:</strong> Use o app <strong>Spark Driver</strong> (gratuito) para registrar quilometragem automaticamente. Ele usa o GPS do celular e registra cada viagem. No final do mês, exporte o relatório e guarde na pasta de documentos. Veja a <strong>Ferramenta F10</strong> (Modelo de Controle de Quilometragem) no final desta apostila.
</div>

<h3>7. Estratégia 6: Guardar recibos e comprovantes o ano inteiro</h3>

<p>Essa é a estratégia mais simples e mais negligenciada. Sem recibo, não existe dedução. Ponto final.</p>

<h4>O que guardar:</h4>
<table class="styled-table">
<thead><tr><th>Categoria</th><th>Documentos</th></tr></thead>
<tbody>
<tr><td><strong>Negócio</strong></td><td>Materiais, ferramentas, uniformes, taxas de app, seguro do carro (parte de negócio)</td></tr>
<tr><td><strong>Imóvel de aluguel</strong></td><td>Reparos, HOA, seguro, property tax, serviços de paisagismo, limpeza</td></tr>
<tr><td><strong>Médico</strong></td><td>Consultas, exames, dentista, medicamentos (prescrição), óculos</td></tr>
<tr><td><strong>Childcare</strong></td><td>Recibos da creche, daycare, afterschool, babá (com SSN/EIN)</td></tr>
<tr><td><strong>Educação</strong></td><td>Tuition (1098-T), livros, materiais, juros de empréstimo estudantil (1098-E)</td></tr>
<tr><td><strong>Doações</strong></td><td>Recibo da instituição, roupas doadas (com lista e valor justo)</td></tr>
</tbody>
</table>

<h4>Sistema simples de 3 passos:</h4>
<ol>
<li><strong>Tire foto</strong> de cada recibo assim que receber</li>
<li><strong>Salve</strong> em uma pasta no celular organizada por mês (Janeiro, Fevereiro...)</li>
<li><strong>Backup</strong> mensal para o computador ou Google Drive/iCloud</li>
</ol>

<p>Veja a <strong>Ferramenta F11</strong> (Modelo de Controle de Recibos) no final desta apostila para um modelo pronto de organização.</p>

<h3>8. Resumo: plano de ação mensal</h3>

<table class="styled-table">
<thead><tr><th>Mês</th><th>O que fazer</th></tr></thead>
<tbody>
<tr><td><strong>Janeiro</strong></td><td>Comece a registrar quilometragem. Verifique se o W-4 está correto. Crie a pasta digital do ano.</td></tr>
<tr><td><strong>Fevereiro</strong></td><td>Chegaram os W-2 e 1099s. Organize tudo na pasta. Se tem 1099, calcule estimated tax.</td></tr>
<tr><td><strong>Março</strong></td><td>Declare imposto antes de 15/04. Revise tudo. Aproveite créditos e deduções.</td></tr>
<tr><td><strong>Abril</strong></td><td>Pague estimated tax Q1 (se aplicável). Faça contribuição IRA para o ano anterior (até 15/04).</td></tr>
<tr><td><strong>Maio</strong></td><td>Comece a contribuir para HSA (se qualifica). Revista os recibos dos primeiros meses.</td></tr>
<tr><td><strong>Junho</strong></td><td>Pague estimated tax Q2. Verifique se a retenção do W-2 está adequada.</td></tr>
<tr><td><strong>Julho</strong></td><td>Faça um "checkup" do meio do ano. Calcule quanto ganhou até aqui. Ajuste o que precisar.</td></tr>
<tr><td><strong>Agosto</strong></td><td>Organize recibos de julho. Mantenha o controle de quilometragem em dia.</td></tr>
<tr><td><strong>Setembro</strong></td><td>Pague estimated tax Q3. Se tem filho entrando na escola, separe recibos de matrícula.</td></tr>
<tr><td><strong>Outubro</strong></td><td>Comece a pensar em deduções de fim de ano. Considere contribuição extra para IRA/HSA.</td></tr>
<tr><td><strong>Novembro</strong></td><td>Ultima chance para doar roupas/objetos (recibo!). Programe contribuição IRA/HSA.</td></tr>
<tr><td><strong>Dezembro</strong></td><td>Pague estimated tax Q4. Faça últimas doações. Organize tudo para o ano que vem.</td></tr>
</tbody>
</table>

<div class="box-example">
<strong>💰 Quanto você pode economizar com essas estratégias?</strong><br>
<table>
<tr><td>Ajustando o W-4:</td><td>Evita surpresas de até $3.000</td></tr>
<tr><td>Contribuindo IRA ($3.000):</td><td>Economiza ~$360 a $660</td></tr>
<tr><td>Contribuindo HSA ($4.300 individual):</td><td>Economiza ~$516 a $946</td></tr>
<tr><td>Registrando quilometragem (10.000 mi):</td><td>Economiza ~$840 a $1.540</td></tr>
<tr><td>Separando conta de negócio:</td><td>Economiza ~$500 a $2.000 em deduções</td></tr>
<tr><td>Guardando recibos:</td><td>Economiza ~$300 a $1.000 em deduções perdidas</td></tr>
<tr><td colspan="2"><strong>Total potencial: $2.516 a $8.146 por ano</strong></td></tr>
</table>
</div>
"""

# ============================================================
# HTML COMPLETO DA APOSTILA
# ============================================================

HTML_CONTENT = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Guia Completo de Impostos para Imigrantes nos EUA</title>
<style>
/* === RESET E BASE === */
@page {
    size: A4;
    margin: 2.5cm 2cm 2.5cm 3cm;
    @bottom-center {
        content: counter(page);
        font-size: 10pt;
        color: #666;
    }
}
@page :first { @bottom-center { content: none; } }

* { margin: 0; padding: 0; box-sizing: border-box; }
body {
    font-family: 'Lato', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    font-size: 11pt;
    line-height: 1.65;
    color: #2c2c2c;
    background: #fff;
    border: 2px solid #1A3D6E;
    padding: 10px;
}

/* === TIPOGRAFIA === */
h1 { font-family: 'Playfair Display', Georgia, serif; font-size: 28pt; color: #1A3D6E; margin-bottom: 20px; line-height: 1.2; }
h2 { font-family: 'Playfair Display', Georgia, serif; font-size: 22pt; color: #1A3D6E; margin: 30px 0 15px; padding-bottom: 8px; border-bottom: 3px solid #1A3D6E; page-break-before: always; }
h2:first-of-type { page-break-before: auto; }
h3 { font-family: 'Lato', sans-serif; font-size: 14pt; color: #1A3D6E; margin: 25px 0 10px; }
h4 { font-family: 'Lato', sans-serif; font-size: 12pt; color: #34567a; margin: 18px 0 8px; font-weight: 600; }
p { margin-bottom: 10px; text-align: justify; }
.subtitle { font-style: italic; color: #555; font-size: 11pt; margin-bottom: 20px; }
strong { color: #1A3D6E; }
em { font-style: italic; }

/* === CAPA (Blue Premium + Watermark + Paper Texture) === */
.cover {
    page-break-after: always;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 100vh;
    padding: 60px 40px;
    background: linear-gradient(135deg, #1A3D6E 0%, #1f4575 40%, #243f6a 70%, #1A3D6E 100%);
    color: white;
}
/* Layer 1: Notebook/document watermark */
.cover::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: url('image/cover-watermark.svg') center / cover no-repeat;
    opacity: 0.10;
    pointer-events: none;
    z-index: 1;
}
/* Layer 2: Paper fiber/noise texture */
.cover::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
    background-size: 256px 256px;
    opacity: 0.45;
    pointer-events: none;
    z-index: 2;
    mix-blend-mode: soft-light;
}
.cover > * { position: relative; z-index: 3; }
.cover .cover-icon { font-size: 36pt; margin-bottom: 10px; }
.cover .cover-divider {
    width: 60px;
    height: 2px;
    background: #d4af69;
    margin: 18px auto;
    border: none;
}
.cover h1 { font-size: 34pt; color: white; margin-bottom: 10px; border: none; text-shadow: 0 2px 8px rgba(0,0,0,0.25); line-height: 1.3; }
.cover h2 { font-size: 15pt; color: #c0d4ee; border: none; margin-bottom: 10px; font-family: 'Lato', sans-serif; font-weight: 300; line-height: 1.5; }
.cover .author { font-size: 13pt; color: #e0e8f0; margin-top: 40px; font-weight: 400; letter-spacing: 0.3px; }
.cover .year { font-size: 11pt; color: #d4af69; margin-top: 12px; border: 1.5px solid #d4af69; background: rgba(212,175,105,0.1); padding: 6px 22px; border-radius: 20px; font-weight: 600; letter-spacing: 0.5px; }
.cover .cover-footer { color: #8aa8c8; font-size: 10pt; margin-top: 30px; line-height: 1.7; }

/* === SEÇÕES === */
.section-part {
    background: #f0f4f8;
    border-left: 6px solid #1A3D6E;
    padding: 20px 25px;
    margin: 30px 0;
    border-radius: 0 8px 8px 0;
    page-break-after: always;
}
.section-part h2 { border: none; page-break-before: auto; font-size: 20pt; margin-bottom: 5px; }
.section-part .part-number { font-size: 12pt; color: #666; text-transform: uppercase; letter-spacing: 2px; }

/* === BOXES === */
.box-learn {
    background: #e8f0fe;
    border-left: 4px solid #1A3D6E;
    padding: 15px 20px;
    margin: 15px 0;
    border-radius: 0 6px 6px 0;
}
.box-learn ul { margin-left: 20px; margin-top: 5px; }
.box-learn li { margin-bottom: 3px; }

.box-tip {
    background: #e6f4ea;
    border-left: 4px solid #1e8e3e;
    padding: 15px 20px;
    margin: 15px 0;
    border-radius: 0 6px 6px 0;
}

.box-alert {
    background: #fef7e0;
    border-left: 4px solid #f9ab00;
    padding: 15px 20px;
    margin: 15px 0;
    border-radius: 0 6px 6px 0;
}

.box-example {
    background: #f0faf5;
    border: 2px solid #c8e6c9;
    border-left: 4px solid #43a047;
    padding: 15px 20px;
    margin: 15px 0;
    border-radius: 0 6px 6px 0;
}
.box-example table { margin-top: 8px; }
.box-example td { padding: 2px 10px 2px 0; }

/* === TABELAS === */
.styled-table {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
    font-size: 10pt;
}
.styled-table thead th {
    background: #1A3D6E;
    color: white;
    padding: 10px 12px;
    text-align: left;
    font-weight: 600;
    font-size: 10pt;
}
.styled-table tbody td {
    padding: 8px 12px;
    border-bottom: 1px solid #e0e0e0;
    vertical-align: top;
}
.styled-table tbody tr:nth-child(even) { background: #f5f7fa; }
.styled-table tbody tr:hover { background: #e8f0fe; }
.green-cell { background: #e6f4ea !important; }
.red-cell { background: #fce8e6 !important; }

/* === ERROR CARDS === */
.error-card {
    background: #fff3e0;
    border: 1px solid #ffcc80;
    border-left: 5px solid #e65100;
    padding: 12px 18px;
    margin: 12px 0;
    border-radius: 6px;
}
.error-title { font-weight: 700; color: #bf360c; margin-bottom: 5px; font-size: 11pt; }
.error-desc { color: #4e342e; font-size: 10.5pt; }

/* === CHECKLIST === */
.checklist {
    background: #f5f5f5;
    padding: 15px 20px;
    border-radius: 6px;
    margin: 15px 0;
}
.checklist ul { list-style: none; margin: 0; }
.checklist li { padding: 4px 0; font-size: 10.5pt; }
.checklist li::before { content: "☐ "; font-size: 14pt; color: #1A3D6E; }

/* === LISTAS COLORIDAS === */
.green-list { list-style: none; padding-left: 5px; }
.green-list li::before { content: "✅ "; }
.green-list li { padding: 3px 0; }
.red-list { list-style: none; padding-left: 5px; }
.red-list li::before { content: "❌ "; }
.red-list li { padding: 3px 0; }

/* === SUMÁRIO === */
.toc { page-break-after: always; }
.toc h2 { text-align: center; border-bottom: none; }
.toc-part { margin: 20px 0; }
.toc-part-title { font-family: 'Playfair Display', Georgia, serif; font-size: 14pt; color: #1A3D6E; margin-bottom: 8px; padding: 5px 10px; background: #f0f4f8; border-radius: 4px; }
.toc-item { padding: 4px 0 4px 20px; font-size: 10.5pt; color: #444; }
.toc-item-tool { padding: 3px 0 3px 35px; font-size: 10pt; color: #666; }
.toc-item::before { content: "• "; color: #1A3D6E; font-weight: bold; }
.toc-item-tool::before { content: "→ "; color: #1e8e3e; }

/* === APÊNDICE === */
.tool-section {
    background: #f8f9fa;
    border: 2px solid #dee2e6;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
    page-break-inside: avoid;
}
.tool-section h3 {
    color: #1A3D6E;
    border-bottom: 2px solid #1A3D6E;
    padding-bottom: 5px;
    margin-bottom: 10px;
}
.tool-instruction { font-style: italic; color: #555; font-size: 10pt; margin-bottom: 10px; }

/* === FORM FIELDS === */
.form-field {
    display: inline-block;
    border-bottom: 1px solid #999;
    min-width: 150px;
    height: 20px;
    margin: 0 5px;
}

/* === AVISO LEGAL === */
.disclaimer {
    font-size: 9pt;
    color: #666;
    line-height: 1.5;
    padding: 15px;
    background: #fafafa;
    border: 1px solid #eee;
    border-radius: 4px;
    margin: 15px 0;
}

/* === CTA === */
.cta-box {
    background: linear-gradient(135deg, #1A3D6E, #2a5a9e);
    color: white;
    padding: 25px;
    border-radius: 10px;
    text-align: center;
    margin: 25px 0;
}
.cta-box h3 { color: white; border: none; }
.cta-box p { color: #c0d4ee; text-align: center; }

/* === UTILITÁRIOS === */
.page-break { page-break-after: always; }
.no-break { page-break-inside: avoid; }
.text-center { text-align: center; }
.text-small { font-size: 10pt; color: #666; }
.mb-20 { margin-bottom: 20px; }
.mt-20 { margin-top: 20px; }

/* === HEADER CAPÍTULO === */
.chapter-header {
    text-align: center;
    margin-bottom: 25px;
    padding: 20px 0;
}
.chapter-number {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 48pt;
    color: #e0e0e0;
    font-weight: 700;
    line-height: 1;
    margin-bottom: -10px;
}
</style>
</head>
<body>

<!-- ====== CAPA ====== -->
<div class="cover">
    <div class="cover-icon">🇺🇸 📋</div>
    <hr class="cover-divider">
    <h1>Guia Completo de Impostos<br>para Imigrantes nos EUA</h1>
    <h2>Entenda o sistema, evite erros, aumente seu reembolso<br>e organize sua vida financeira com segurança</h2>
    <hr class="cover-divider">
    <div class="author">Kelly Moraes — Preparadora de Impostos</div>
    <div class="year">📅 Ano Fiscal 2027</div>
    <p class="cover-footer">
        Inclui 11 ferramentas práticas &bull; Checklists &bull; Quizzes &bull; Tabelas<br>
        Organização anual &bull; Créditos e deduções &bull; Guia completo
    </p>
</div>

<!-- ====== AVISO LEGAL + NOTA DA AUTORA ====== -->
<div class="disclaimer">
    <strong>Aviso Legal (Disclaimer)</strong><br>
    Este material é de caráter <strong>educacional e informativo</strong>. Não substitui aconselhamento profissional de um CPA (Certified Public Accountant), contador licenciado ou advogado tributarista. As informações contidas neste guia são baseadas nas leis tributárias dos Estados Unidos para o ano fiscal 2027 e podem sofrer alterações.<br><br>
    Cada situação fiscal é única. Os valores, limites e regras mencionados podem não se aplicar a todos os indivíduos. Consulte sempre um profissional de impostos qualificado para orientação específica sobre sua situação.<br><br>
    A autora não se responsabiliza por decisões tomadas com base exclusiva neste material.
</div>

<div class="box-tip" style="margin-top: 20px;">
    <strong>💌 Nota da autora</strong><br><br>
    Olá! Eu sou a Kelly, preparadora de impostos com anos de experiência atendendo famílias imigrantes nos Estados Unidos. Sei o que é chegar aqui sem entender nada sobre impostos, com medo de errar e sem saber por onde começar.<br><br>
    Criei este guia exatamente para pessoas como você — que trabalham duro, querem fazer o certo e merecem ter acesso a informações claras e em português.<br><br>
    Tudo o que está aqui foi pensado para a vida real: exemplos com valores reais, ferramentas práticas para usar o ano inteiro e explicações que qualquer pessoa consegue entender. Não importa se você é motorista de Uber, faxineira, dono de pequeno negócio ou funciona com W-2 — este guia é para você.<br><br>
    Minha missão é simples: <strong>ajudar imigrantes a economizar dinheiro e ter tranquilidade</strong>.<br><br>
    Bem-vindo(a) à sua jornada de organização financeira nos EUA! 💙
</div>

<div class="box-learn" style="margin-top: 20px;">
    <strong>📖 Como usar esta apostila</strong><br><br>
    Este guia foi organizado em <strong>4 partes temáticas</strong>. Cada parte tem uma cor de identificação na margem esquerda para você se localizar rapidamente:<br><br>
    <strong>Parte 1 — Entenda o Sistema</strong> (Azul) → Capítulos 1 e 4<br>
    <strong>Parte 2 — Organize sua Vida</strong> (Verde) → Capítulos 2 e 6<br>
    <strong>Parte 3 — Pague Menos Legalmente</strong> (Dourado) → Capítulos 3, 5A e 5B<br>
    <strong>Parte 4 — Evite os Erros</strong> (Vermelho) → Capítulos 7 e 8<br><br>
    No final, você encontra o <strong>Apêndice de Ferramentas Práticas</strong> — 11 ferramentas com campos preenchíveis para usar ao longo de todo o ano. Você pode preencher digitalmente no PDF ou imprimir.<br><br>
    💡 <strong>Dica:</strong> Leia tudo de uma vez para entender o sistema. Depois, use as ferramentas e consulte os capítulos sempre que tiver dúvidas durante o ano.
</div>

<!-- ====== SUMÁRIO VISUAL ====== -->
<div class="toc">
    <h2>📑 Sumário</h2>

    <div class="toc-part">
        <div class="toc-part-title">📖 Páginas Iniciais</div>
        <div class="toc-item">Aviso Legal e Nota da Autora</div>
        <div class="toc-item">Como usar esta apostila</div>
    </div>

    <div class="toc-part">
        <div class="toc-part-title">🇺🇸 Introdução</div>
        <div class="toc-item">Por que esta apostila vai mudar sua relação com o imposto nos EUA</div>
    </div>

    <div class="toc-part" style="border-left: 4px solid #1A3D6E; padding-left: 10px;">
        <div class="toc-part-title">📘 Parte 1 — Entenda o Sistema</div>
        <div class="toc-item">Capítulo 1 — Por que imigrantes precisam declarar imposto nos EUA</div>
        <div class="toc-item">Capítulo 4 — Como funciona o IRS: o que todo imigrante precisa saber</div>
        <div class="toc-item">Glossário — Conceitos fiscais importantes</div>
    </div>

    <div class="toc-part" style="border-left: 4px solid #1e8e3e; padding-left: 10px;">
        <div class="toc-part-title">📗 Parte 2 — Organize sua Vida</div>
        <div class="toc-item">Capítulo 2 — Como se organizar durante o ano</div>
        <div class="toc-item">Capítulo 6 — O processo completo de declaração do início ao fim</div>
    </div>

    <div class="toc-part" style="border-left: 4px solid #f9ab00; padding-left: 10px;">
        <div class="toc-part-title">📙 Parte 3 — Pague Menos Legalmente</div>
        <div class="toc-item">Capítulo 3 — Créditos e deduções</div>
        <div class="toc-item">Capítulo 5A — Dependentes: quem você pode declarar</div>
        <div class="toc-item">Capítulo 5B — Como pagar menos imposto durante o ano</div>
    </div>

    <div class="toc-part" style="border-left: 4px solid #e53935; padding-left: 10px;">
        <div class="toc-part-title">📕 Parte 4 — Evite os Erros</div>
        <div class="toc-item">Capítulo 7 — Erros que fazem imigrantes perder dinheiro</div>
        <div class="toc-item">Capítulo 8 — Conclusão: sua jornada financeira nos EUA começa aqui</div>
    </div>

    <div class="toc-part" style="background: #f0f0f0; padding: 10px; border-radius: 6px;">
        <div class="toc-part-title">🔧 Apêndice — 11 Ferramentas Práticas</div>
        <div class="toc-item-tool">F1 — Checklist de documentos obrigatórios</div>
        <div class="toc-item-tool">F2 — Checklist anual completo</div>
        <div class="toc-item-tool">F3 — Lista de tipos de renda</div>
        <div class="toc-item-tool">F4 — Quiz de rendas</div>
        <div class="toc-item-tool">F5 — Quiz familiar (dependentes e childcare)</div>
        <div class="toc-item-tool">F6 — Tabela: o que é dedutível e o que não é</div>
        <div class="toc-item-tool">F7 — Controle de despesas de negócio (Schedule C)</div>
        <div class="toc-item-tool">F8 — Controle de despesas de imóvel (Schedule E)</div>
        <div class="toc-item-tool">F9 — Controle de deduções pessoais (Form 1040)</div>
        <div class="toc-item-tool">F10 — Modelo de controle de quilometragem</div>
        <div class="toc-item-tool">F11 — Modelo de controle de recibos</div>
    </div>
</div>

<!-- ====== INTRODUÇÃO ====== -->
<h2 id="introducao">Introdução</h2>
<p class="subtitle">Por que esta apostila vai mudar a sua relação com o imposto nos EUA</p>

<p>Viver nos Estados Unidos é o sonho de muitos — mas ninguém conta para você que, junto com as oportunidades, vem também um sistema de impostos completamente diferente do que estamos acostumados no Brasil. Aqui, tudo é novo: formulários, regras, créditos, deduções, documentos… e, para muitos imigrantes, isso gera medo, insegurança e até vergonha de pedir ajuda.</p>

<p>Se você já pensou:</p>
<ul>
<li>"Por que eu tenho que declarar imposto se já descontam do meu salário?"</li>
<li>"Por que às vezes recebo reembolso e outras vezes tenho que pagar?"</li>
<li>"Será que estou fazendo algo errado?"</li>
<li>"Será que isso pode me prejudicar no futuro?"</li>
</ul>
<p>…então esta apostila foi feita exatamente para você.</p>

<p>A verdade é simples: ninguém nasce sabendo como funciona o imposto nos Estados Unidos. E, diferente do Brasil, aqui o governo não faz tudo por você. Você precisa entender o básico para não perder dinheiro, não cair em armadilhas e não ter problemas com o IRS.</p>

<p>Mas calma — isso não precisa ser complicado.</p>

<p>Esta apostila foi criada para te ajudar a:</p>
<ul>
<li>entender o sistema de forma simples</li>
<li>saber exatamente o que você precisa juntar</li>
<li>descobrir créditos e benefícios que muitos imigrantes nem sabem que existem</li>
<li>evitar erros que fazem milhares de pessoas pagarem mais do que deveriam</li>
<li>se organizar durante o ano para não sofrer na época da declaração</li>
<li>ganhar confiança e tranquilidade no processo</li>
</ul>

<p>Aqui você vai encontrar explicações claras, checklists, modelos práticos, quizzes, tabelas e orientações que realmente fazem diferença na vida de quem está começando — ou de quem já está aqui há anos, mas nunca entendeu o sistema.</p>

<p>Este material não é apenas uma apostila. É um <strong>guia para você se organizar, economizar e entender o que está fazendo</strong>, sem medo e sem complicação.</p>

<p>Se você quer transformar a forma como lida com impostos nos EUA, você está no lugar certo.</p>
<p style="text-align:center; font-size: 13pt; color: #1A3D6E; margin-top: 20px;"><strong>Vamos começar essa jornada juntos. 🚀</strong></p>

<!-- ====== PARTE 1 — ENTENDA O SISTEMA ====== -->
<div class="section-part">
    <div class="part-number">Parte 1</div>
    <h2 style="color: #1A3D6E;">📘 Entenda o Sistema</h2>
    <p style="color: #555; font-size: 10pt;">Antes de se organizar ou economizar, você precisa entender como o sistema funciona. Esta parte explica por que imigrantes precisam declarar imposto e como o IRS trabalha.</p>
</div>

<!-- CAP 1 -->
<h2 id="cap1">Capítulo 1 — Por que Imigrantes Precisam Declarar Imposto nos EUA</h2>
<p class="subtitle">Diferenças entre o sistema americano e o brasileiro, por que declarar é obrigatório, e como isso afeta sua vida financeira e migratória.</p>

<div class="box-learn">
<strong>📖 Neste capítulo você vai aprender:</strong>
<ul>
<li>Como funciona o imposto de renda nos Estados Unidos</li>
<li>Por que o sistema americano é tão diferente do brasileiro</li>
<li>Por que às vezes você recebe reembolso e outras vezes precisa pagar</li>
<li>Como a declaração afeta sua vida financeira e seu processo de imigração</li>
<li>A importância de construir histórico fiscal</li>
</ul>
</div>

<h3>1. Como funciona o imposto de renda nos Estados Unidos</h3>
<p>Nos EUA, o sistema é baseado em <strong>responsabilidade individual</strong>. Isso significa que:</p>
<ul>
<li>O governo <strong>não calcula tudo por você</strong></li>
<li>Você precisa <strong>informar sua renda completa</strong></li>
<li>Você precisa <strong>juntar documentos</strong></li>
<li>Você precisa <strong>pedir créditos e deduções</strong></li>
<li>Você precisa <strong>provar o que declara</strong></li>
</ul>
<p>A declaração é um acerto de contas anual entre você e o IRS:</p>
<ul class="green-list">
<li>Se você pagou imposto demais → <strong>recebe reembolso</strong></li>
</ul>
<ul class="red-list">
<li>Se você pagou imposto de menos → <strong>precisa pagar a diferença</strong></li>
</ul>

<h3>2. Comparação rápida: EUA × Brasil</h3>
<table class="styled-table">
<thead><tr><th>Estados Unidos</th><th>Brasil</th></tr></thead>
<tbody>
<tr><td>Você junta e envia tudo</td><td>A empresa e o governo fazem quase tudo</td></tr>
<tr><td>Imposto retido pode ser insuficiente</td><td>Imposto retido geralmente é suficiente</td></tr>
<tr><td>Renda informal deve ser declarada</td><td>Renda informal raramente entra</td></tr>
<tr><td>Existem créditos que devolvem dinheiro</td><td>Não existem créditos assim</td></tr>
<tr><td>Se pagou pouco, paga no final</td><td>Isso é raro</td></tr>
</tbody>
</table>

<div class="box-alert">
<strong>⚠️ Por isso muitos imigrantes se assustam:</strong> O sistema é completamente diferente. No Brasil, a declaração é simples e o governo já sabe de tudo. Nos EUA, se você não informar, o IRS não sabe — e quando descobre, podem vir problemas.
</div>

<h3>3. Por que muitos imigrantes acabam devendo imposto</h3>
<p>Existem três motivos principais:</p>

<p><strong>1. O empregador reteve pouco imposto</strong><br>
Se o W-4 foi preenchido errado, o desconto é baixo e no final do ano pode faltar dinheiro.</p>

<p><strong>2. Você teve renda sem imposto retido</strong><br>
Muito comum entre imigrantes: Uber, Lyft, DoorDash, faxina, pintura, jardinagem, vendas online, pagamentos via Zelle, CashApp, Venmo. Nessas rendas, <strong>ninguém desconta imposto por você</strong>.</p>

<p><strong>3. Sua renda aumentou</strong><br>
Créditos diminuem conforme a renda sobe. Se você ganhou mais este ano, pode ter perdido o direito a alguns créditos.</p>

<h3>4. Por que declarar imposto é importante para o imigrante</h3>
<p>Além de ser <strong>obrigatório pela lei</strong>, declarar imposto ajuda você a:</p>
<ul>
<li><strong>Construir histórico financeiro</strong> — essencial para financiar carro, casa e obter crédito</li>
<li><strong>Comprovar renda para imigração</strong> — se um dia precisar de green card ou cidadania, o histórico fiscal conta</li>
<li><strong>Evitar problemas com o IRS</strong> — quem nunca declarou está na mira do IRS</li>
<li><strong>Receber créditos e reembolsos</strong> — milhares de dólares que muitos imigrantes deixam de receber por não declarar</li>
<li><strong>Mostrar boa conduta fiscal</strong> — para processos de ajuste de status, waivers e naturalização</li>
</ul>

<div class="box-tip">
<strong>💡 Regra de ouro:</strong> Mesmo que você ganhe pouco, mesmo que não tenha documentos, mesmo que seja recém-chegado — <strong>declare</strong>. É sempre melhor declarar com renda baixa do que não declarar. O IRS perdoa quem declara e paga pouco; não perdoa quem esconde.
</div>

<h3>5. 4 motivos para declarar (mesmo quando acha que não precisa)</h3>
<div class="box-example">
<table>
<tr><td><strong>1. Créditos</strong></td><td>Você pode ter direito a créditos que devolvem dinheiro (EIC, CTC, Childcare)</td></tr>
<tr><td><strong>2. Histórico</strong></td><td>Cada ano declarado constrói seu histórico financeiro nos EUA</td></tr>
<tr><td><strong>3. Imigração</strong></td><td>O USCIS vê suas declarações como prova de residência e renda</td></tr>
<tr><td><strong>4. Paz de espírito</strong></td><td>Dormir tranquilo sabendo que está em dia com o IRS</td></tr>
</table>
</div>

<!-- GLOSSÁRIO -->
<h2 id="glossario">Glossário — Conceitos Fiscais Importantes</h2>
<p class="subtitle">Explicações simples dos termos que você mais vai ouvir quando o assunto é imposto nos EUA.</p>

<div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 20px;">
<div style="flex: 1; min-width: 280px; background: #e8f0fe; padding: 15px; border-radius: 8px; border-left: 4px solid #1A3D6E;">
<h4>📊 AGI (Adjusted Gross Income)</h4>
<p>É sua renda total menos alguns ajustes permitidos, como contribuições para IRA, juros de empréstimo estudantil, HSA etc. Ele é importante porque <strong>muitos créditos e deduções dependem do seu AGI</strong>. Quanto menor o AGI, maior pode ser o seu reembolso.</p>
<div class="box-example" style="margin: 8px 0;">
<strong>Exemplo:</strong> Você ganhou $50.000. Contribuiu $3.000 para IRA. Seu AGI = $47.000. Esse valor mais baixo pode qualificar você para créditos que não teria direito com $50.000.
</div>
</div>

<div style="flex: 1; min-width: 280px; background: #e8f0fe; padding: 15px; border-radius: 8px; border-left: 4px solid #1A3D6E;">
<h4>💳 Crédito vs. Dedução</h4>
<p><strong>Dedução</strong> reduz a renda que será tributada. Se você ganhou $50.000 e tem $2.000 de dedução, o IRS tributa $48.000.</p>
<p><strong>Crédito</strong> reduz o imposto que você deve pagar, <strong>dólar por dólar</strong>. Se você deve $800 e tem um crédito de $600, passa a dever só $200.</p>
<p style="color: #1e8e3e;"><strong>👉 Crédito é muito mais poderoso que dedução!</strong></p>
</div>

<div style="flex: 1; min-width: 280px; background: #e8f0fe; padding: 15px; border-radius: 8px; border-left: 4px solid #1A3D6E;">
<h4>🏢 Withholding (Imposto Retido)</h4>
<p>É o imposto que seu empregador retira do seu salário ao longo do ano e envia ao IRS por você. É como um "adiantamento". No final do ano, o IRS compara quanto você deveria pagar com quanto já foi retido.</p>
<ul class="green-list"><li>Reteve demais → reembolso</li></ul>
<ul class="red-list"><li>Reteve de menos → você paga</li></ul>
</div>

<div style="flex: 1; min-width: 280px; background: #e8f0fe; padding: 15px; border-radius: 8px; border-left: 4px solid #1A3D6E;">
<h4>🔧 Self-Employment Tax</h4>
<p>Quem trabalha por conta própria (autônomo, freelancer, motorista de app) paga o self-employment tax, que cobre <strong>Social Security (12.4%)</strong> e <strong>Medicare (2.9%)</strong> — total de <strong>15.3%</strong>.</p>
<p>Quando você é empregado, o empregador paga metade. Quando é autônomo, <strong>você paga as duas partes</strong>.</p>
</div>

<div style="flex: 1; min-width: 280px; background: #e8f0fe; padding: 15px; border-radius: 8px; border-left: 4px solid #1A3D6E;">
<h4>📋 Standard Deduction vs. Itemized Deduction</h4>
<p><strong>Standard Deduction:</strong> Valor fixo que o IRS permite deduzir sem comprovação. Em 2027: $15.000 (single), $30.000 (MFJ).</p>
<p><strong>Itemized Deduction:</strong> Você lista suas despesas dedutíveis (juros de hipoteca, property tax, doações, despesas médicas). Só vale a pena se o total for <strong>maior que a Standard Deduction</strong>.</p>
</div>
</div>

<!-- CAP 4 -->
<h2 id="cap4">Capítulo 4 — Como Funciona o IRS: O Que Todo Imigrante Precisa Saber</h2>
<p class="subtitle">Desmistificando o IRS — como ele processa sua declaração, como funciona o reembolso, e o que fazer quando recebe uma carta.</p>

<div class="box-learn">
<strong>📖 Neste capítulo você vai aprender:</strong>
<ul>
<li>O que é o IRS e o que ele faz</li>
<li>Como o IRS processa sua declaração</li>
<li>Como funciona o reembolso</li>
<li>O que acontece quando você deve imposto</li>
<li>Como lidar com cartas do IRS</li>
</ul>
</div>

<h3>1. O que é o IRS?</h3>
<p>O IRS (Internal Revenue Service) é o órgão responsável por:</p>
<ul>
<li>Coletar impostos</li>
<li>Administrar créditos e benefícios</li>
<li>Analisar declarações</li>
<li>Enviar reembolsos</li>
<li>Corrigir erros</li>
<li>Fiscalizar fraudes</li>
</ul>
<p>Ele é o equivalente à Receita Federal no Brasil, mas funciona de forma diferente.</p>
<div class="box-tip">
<strong>💡 O IRS não é seu inimigo.</strong> Ele apenas segue regras — e espera que você siga também.
</div>

<h3>2. O que o IRS faz com a sua declaração</h3>
<p>Quando você envia sua declaração, o IRS passa por três etapas:</p>

<p><strong>✔️ Etapa 1: Processamento automático</strong></p>
<p>O sistema verifica se os números batem, se os formulários estão completos, se há erros simples e se o reembolso pode ser liberado. A maioria das declarações é aprovada nessa fase.</p>

<p><strong>✔️ Etapa 2: Cruzamento de informações</strong></p>
<p>O IRS compara o que você declarou com o que recebeu de empregadores (W-2), bancos (1099-INT), plataformas (1099-K), corretoras (1099-DIV, 1099-B) e Social Security (SSA-1099). Se algo não bate, o IRS envia uma carta.</p>

<p><strong>✔️ Etapa 3: Ajustes e correções</strong></p>
<p>Se houver erro, o IRS corrige automaticamente (quando possível), envia uma carta explicando a diferença, pede documentos adicionais ou recalcula o imposto.</p>

<h3>3. O que acontece quando você tem direito a reembolso</h3>
<p>Se tudo estiver certo, o IRS aprova sua declaração, libera o reembolso e envia para sua conta bancária ou manda cheque pelo correio. A maioria dos reembolsos chega em <strong>7 a 21 dias</strong>, mas pode demorar mais se houver erros, inconsistências, créditos específicos (como EIC) ou suspeita de identidade.</p>

<h3>4. O que acontece quando você deve imposto</h3>
<p>Se o IRS calcular que você pagou menos do que deveria, ele envia o valor devido, a explicação e a data-limite para pagamento. Você pode pagar à vista, parcelado ou com acordo mensal. O IRS prefere que você pague aos poucos do que não pague.</p>

<h3>5. Cartas do IRS — não entre em pânico</h3>
<div class="box-alert">
<strong>⚠️ Se você recebeu uma carta do IRS:</strong>
<ol style="margin-left: 20px; margin-top: 8px;">
<li><strong>Não ignore.</strong> O IRS não vai esquecer.</li>
<li><strong>Leia com calma.</strong> A carta explica o problema e o que fazer.</li>
<li><strong>Verifique se está correto.</strong> Às vezes o IRS erra também.</li>
<li><strong>Responda dentro do prazo.</strong> Cada carta tem uma data-limite.</li>
<li><strong>Peça ajuda profissional.</strong> Se não entende, leve a um preparador ou CPA.</li>
</ol>
</div>

<h3>6. Como evitar problemas com o IRS</h3>
<ul class="green-list">
<li>Declare toda a renda, inclusive informal</li>
<li>Não invente deduções que não tem comprovação</li>
<li>Declare dependentes corretamente</li>
<li>Não ignore cartas do IRS</li>
<li>Guarde documentos por pelo menos 3 anos</li>
<li>Declare todos os anos, mesmo que ganhe pouco</li>
</ul>

<!-- ====== PARTE 2 — ORGANIZE SUA VIDA ====== -->
<div class="section-part" style="border-left-color: #1e8e3e;">
    <div class="part-number">Parte 2</div>
    <h2 style="color: #1e8e3e;">📗 Organize sua Vida</h2>
    <p style="color: #555; font-size: 10pt;">Organização é a chave para economizar. Esta parte te ensina como se organizar durante o ano e como funciona o processo de declaração do início ao fim.</p>
</div>

<!-- CAP 2 -->
<h2 id="cap2">Capítulo 2 — Como se Organizar Durante o Ano</h2>
<p class="subtitle">O sistema mais simples possível para não sofrer na hora do imposto.</p>

<div class="box-learn">
<strong>📖 Neste capítulo você vai aprender:</strong>
<ul>
<li>O sistema de organização em 4 passos</li>
<li>O que guardar durante o ano (e por quê)</li>
<li>Como montar sua pasta anual</li>
<li>Como usar os modelos e ferramentas da apostila</li>
</ul>
</div>

<h3>1. O segredo é ter um sistema simples (e seguir ele)</h3>
<p>Organização não é sobre ter pastas bonitas ou planilhas complicadas. É sobre ter um método que funcione para você.</p>

<div style="display: flex; flex-wrap: wrap; gap: 10px; margin: 15px 0;">
<div style="flex: 1; min-width: 200px; background: #e8f0fe; padding: 12px; border-radius: 6px; text-align: center;">
<strong>📁 Pasta Física</strong><br><span style="font-size: 9pt;">Para recibos, cartas do IRS, documentos importantes.</span>
</div>
<div style="flex: 1; min-width: 200px; background: #e8f0fe; padding: 12px; border-radius: 6px; text-align: center;">
<strong>📱 Pasta Digital</strong><br><span style="font-size: 9pt;">No celular ou computador, com fotos de recibos.</span>
</div>
<div style="flex: 1; min-width: 200px; background: #e8f0fe; padding: 12px; border-radius: 6px; text-align: center;">
<strong>📊 Controle Mensal</strong><br><span style="font-size: 9pt;">Quilometragem, despesas, childcare, aluguel.</span>
</div>
<div style="flex: 1; min-width: 200px; background: #e8f0fe; padding: 12px; border-radius: 6px; text-align: center;">
<strong>✅ Checklist Anual</strong><br><span style="font-size: 9pt;">Para revisar tudo antes de declarar.</span>
</div>
</div>

<h3>2. O que guardar durante o ano</h3>
<ul>
<li>✔️ <strong>Recibos de despesas de negócio</strong> — materiais, ferramentas, suprimentos, taxas, manutenção</li>
<li>✔️ <strong>Quilometragem</strong> — para quem trabalha com carro ou visita clientes</li>
<li>✔️ <strong>Despesas de aluguel</strong> — reparos, HOA, seguro, impostos, taxas</li>
<li>✔️ <strong>Childcare</strong> — recibos, nome do provedor, SSN/EIN</li>
<li>✔️ <strong>Despesas médicas</strong> — consultas, exames, cirurgias, dentista</li>
<li>✔️ <strong>Documentos de renda</strong> — W-2, 1099-NEC, 1099-K, 1099-INT, 1099-DIV, 1099-R</li>
<li>✔️ <strong>Cartas do IRS</strong> — nunca jogue fora!</li>
</ul>

<h3>3. Como montar sua pasta anual (6 seções)</h3>
<ol>
<li>Documentos pessoais</li>
<li>Rendas (W-2, 1099, relatórios)</li>
<li>Despesas dedutíveis</li>
<li>Negócios (Schedule C)</li>
<li>Aluguel (Schedule E)</li>
<li>Cartas do IRS e declaração anterior</li>
</ol>

<div class="box-tip">
<strong>💡 Dica de recibos:</strong> Tire foto de cada recibo assim que receber. Guarde tudo em uma pasta digital com o nome do mês. Recibos desbotam — digitalizar é essencial. Para negócios, mantenha recibos separados por categoria. Para aluguel, registre cada despesa por imóvel.
</div>

<!-- CAP 6 -->
<h2 id="cap6">Capítulo 6 — O Processo Completo de Declaração do Início ao Fim</h2>
<p class="subtitle">Do dia 1º de janeiro até o reembolso cair na conta.</p>

<div class="box-learn">
<strong>📖 Neste capítulo você vai aprender:</strong>
<ul>
<li>A linha do tempo completa da declaração</li>
<li>Quais documentos chegam em janeiro</li>
<li>Como preparar tudo para o preparador</li>
<li>Como o IRS processa sua declaração</li>
</ul>
</div>

<h3>1. O processo começa no 1º de janeiro</h3>
<p>A declaração do ano seguinte começa no primeiro dia do ano. Tudo o que você faz — recibos, quilometragem, childcare, renda extra — vai influenciar o valor do seu imposto.</p>

<h3>2. Janeiro: chegada dos documentos</h3>
<p>Entre janeiro e fevereiro, você começa a receber:</p>
<table class="styled-table">
<thead><tr><th>Documento</th><th>O que é</th><th>Quem envia</th></tr></thead>
<tbody>
<tr><td><strong>W-2</strong></td><td>Salário e impostos retidos</td><td>Empregador</td></tr>
<tr><td><strong>1099-NEC</strong></td><td>Renda de trabalho autônomo</td><td>Empresa/cliente</td></tr>
<tr><td><strong>1099-K</strong></td><td>Recebimentos via PayPal, CashApp, Venmo, apps</td><td>Plataformas</td></tr>
<tr><td><strong>1099-INT</strong></td><td>Juros bancários</td><td>Banco</td></tr>
<tr><td><strong>1099-DIV / 1099-B</strong></td><td>Investimentos</td><td>Corretora</td></tr>
<tr><td><strong>1099-R</strong></td><td>Aposentadoria</td><td>Plano de aposentadoria</td></tr>
<tr><td><strong>SSA-1099</strong></td><td>Social Security</td><td>Governo federal</td></tr>
<tr><td><strong>1095-A</strong></td><td>Seguro de saúde (Marketplace)</td><td>Healthcare.gov</td></tr>
<tr><td><strong>1098</strong></td><td>Juros de hipoteca</td><td>Banco/Credit union</td></tr>
<tr><td><strong>1098-T</strong></td><td>Tuition (mensalidade escolar)</td><td>Instituição de ensino</td></tr>
<tr><td><strong>1098-E</strong></td><td>Juros de empréstimo estudantil</td><td>Credor</td></tr>
</tbody>
</table>

<h3>3. Separando e organizando seus documentos</h3>
<p>Antes de declarar, separe:</p>
<ul>
<li>✔️ Documentos de renda</li>
<li>✔️ Documentos de despesas dedutíveis</li>
<li>✔️ Documentos de dependentes</li>
<li>✔️ Recibos de childcare</li>
<li>✔️ Recibos de negócio</li>
<li>✔️ Recibos de aluguel</li>
<li>✔️ Cartas do IRS</li>
<li>✔️ Declaração do ano anterior</li>
</ul>

<h3>4. Entregando tudo ao preparador</h3>
<p>Quanto mais organizado você estiver, mais rápido e preciso será o processo. O preparador vai: revisar sua renda, verificar dependentes, aplicar créditos e deduções, calcular imposto devido, identificar erros e montar sua declaração completa.</p>

<h3>5. Envio e processamento</h3>
<p>Depois de finalizada, a declaração é enviada ao IRS eletronicamente (e-file — mais rápido) ou por correio (paper — mais lento). O IRS então processa, cruza informações com terceiros e, se tudo estiver certo, libera o reembolso.</p>

<!-- ====== PARTE 3 — PAGUE MENOS LEGALMENTE ====== -->
<div class="section-part" style="border-left-color: #f9ab00;">
    <div class="part-number">Parte 3</div>
    <h2 style="color: #e6a800;">📙 Pague Menos Legalmente</h2>
    <p style="color: #555; font-size: 10pt;">Aqui você aprende como usar créditos, deduções e estratégias para pagar menos imposto — dentro da lei.</p>
</div>

<!-- CAP 3 -->
<h2 id="cap3">Capítulo 3 — Créditos e Deduções: Como Pagar Menos Imposto Legalmente</h2>
<p class="subtitle">A diferença entre quem paga muito imposto e quem paga pouco é informação.</p>

<div class="box-learn">
<strong>📖 Neste capítulo você vai aprender:</strong>
<ul>
<li>A diferença entre crédito e dedução</li>
<li>Tipos de dedução: Standard vs. Itemized</li>
<li>O que é dedutível e o que NÃO é</li>
<li>Créditos mais importantes para famílias e imigrantes</li>
<li>Deduções para autônomos e proprietários de imóvel</li>
</ul>
</div>

<h3>1. A diferença entre crédito e dedução</h3>
<p><strong>✔️ Deduções</strong> reduzem a renda que será tributada. Exemplo: se você ganhou $50.000 e tem $2.000 de deduções, o IRS tributa $48.000.</p>
<p><strong>✔️ Créditos</strong> reduzem o imposto que você deve pagar, dólar por dólar. São muito mais poderosos. Exemplo: se você deve $800 e tem um crédito de $600, passa a dever $200.</p>
<p style="color: #1e8e3e; font-size: 12pt;"><strong>👉 Crédito = dinheiro direto no imposto | Dedução = diminui a base de cálculo</strong></p>

<h3>2. Standard Deduction vs. Itemized Deduction</h3>
<table class="styled-table">
<thead><tr><th></th><th>Standard Deduction (2027)</th><th>Itemized Deduction</th></tr></thead>
<tbody>
<tr><td><strong>Single</strong></td><td>$15.000</td><td>Somatório de: juros de hipoteca + property tax + doações + despesas médicas</td></tr>
<tr><td><strong>Head of Household</strong></td><td>$22.500</td><td>—</td></tr>
<tr><td><strong>Married Filing Jointly</strong></td><td>$30.000</td><td>—</td></tr>
<tr><td><strong>Comprovação</strong></td><td>Não precisa</td><td>Precisa de recibos e comprovantes</td></tr>
<tr><td><strong>Quando usar</strong></td><td>Se suas despesas dedutíveis forem menores que o valor padrão</td><td>Se suas despesas dedutíveis forem MAIORES que o padrão</td></tr>
</tbody>
</table>

<h3>3. O que é dedutível e o que NÃO é</h3>
<table class="styled-table">
<thead><tr><th>Categoria</th><th class="green-cell">✅ Dedutível</th><th class="red-cell">❌ Não dedutível</th></tr></thead>
<tbody>
<tr><td><strong>Negócios</strong></td><td>Quilometragem de trabalho, suprimentos, taxas de app, celular, internet</td><td>Quilometragem pessoal, almoço pessoal, multas, roupas comuns</td></tr>
<tr><td><strong>Médico</strong></td><td>Consultas, cirurgias, dentista, medicamentos com prescrição, óculos</td><td>Academia, vitaminas, estética, cosméticos</td></tr>
<tr><td><strong>Casa própria</strong></td><td>Juros de hipoteca, property tax, home equity loan (para melhoria)</td><td>Seguro residencial, manutenção comum, melhoria cosmética</td></tr>
<tr><td><strong>Aluguel</strong></td><td>Reparos, HOA, seguro do imóvel, serviços, property tax, depreciação</td><td>Melhorias (usar depreciação)</td></tr>
<tr><td><strong>Veículo</strong></td><td>Quilometragem de negócio ($0,70/mi), combustível de negócio</td><td>Quilometragem pessoal, seguro pessoal, multas de trânsito</td></tr>
<tr><td><strong>Pessoal</strong></td><td>Doações (com recibo), IRA, HSA, juros de student loan</td><td>Academia, aulas recreativas, presentes, doação sem recibo</td></tr>
</tbody>
</table>

<h3>4. Créditos mais importantes para imigrantes</h3>

<h4>👶 Child Tax Credit (CTC) — até $2.200 por filho</h4>
<p>Para pais com filhos menores de 17 anos com SSN válido. Reduz o imposto e pode gerar reembolso (Additional Child Tax Credit: até $1.700).</p>

<h4>💰 Earned Income Credit (EIC) — até ~$7.830</h4>
<p>Para trabalhadores de baixa a média renda com ou sem filhos. Totalmente reembolsável — mesmo que não deva imposto, pode receber dinheiro. Um dos créditos mais poderosos do sistema.</p>

<h4>🧸 Child and Dependent Care Credit</h4>
<p>Para quem paga childcare (creche, daycare, afterschool) para poder trabalhar. Até 35% de $3.000 (1 filho) ou $6.000 (2+ filhos).</p>

<h4>🎓 American Opportunity Credit — até $2.500</h4>
<p>Para gastos com educação superior nos primeiros 4 anos da faculdade. 40% é reembolsável (até $1.000).</p>

<h4>📚 Lifetime Learning Credit — até $2.000</h4>
<p>Para gastos com educação (qualquer curso, não precisa ser faculdade). Não é reembolsável, mas reduz imposto.</p>

<h4>🏥 Premium Tax Credit</h4>
<p>Para quem comprou seguro de saúde pelo Marketplace (Healthcare.gov) e precisa de ajuda para pagar o prêmio.</p>

<!-- CAP 5A (NOVO) -->
""" + CAP5A + """

<!-- CAP 5B (NOVO) -->
""" + CAP5B + """

<!-- ====== PARTE 4 — EVITE OS ERROS ====== -->
<div class="section-part" style="border-left-color: #e53935;">
    <div class="part-number">Parte 4</div>
    <h2 style="color: #e53935;">📕 Evite os Erros</h2>
    <p style="color: #555; font-size: 10pt;">A maioria dos imigrantes paga mais imposto do que deveria por falta de informação. Esta parte mostra os erros mais comuns e como evitá-los.</p>
</div>

<!-- CAP 7 -->
<h2 id="cap7">Capítulo 7 — Erros que Fazem Imigrantes Perder Dinheiro</h2>
<p class="subtitle">Os erros mais comuns que custam milhares de dólares todos os anos.</p>

<div class="box-learn">
<strong>📖 Neste capítulo você vai aprender:</strong>
<ul>
<li>Os 8+ erros mais comuns entre imigrantes</li>
<li>Como cada erro afeta seu bolso</li>
<li>O que fazer para evitar cada um</li>
</ul>
</div>

<div class="error-card">
<div class="error-title">❌ Erro 1: Não declarar toda a renda</div>
<div class="error-desc">"Se não recebi 1099, não preciso declarar." "Se foi pago no Zelle, ninguém sabe." <strong>ERRADO.</strong> Toda renda conta, mesmo sem documento. Quando você não declara: o IRS descobre, perde créditos, pode pagar multas e pode ter problemas no futuro. E o pior: perde a chance de construir histórico financeiro.</div>
</div>

<div class="error-card">
<div class="error-title">❌ Erro 2: Não guardar recibos</div>
<div class="error-desc">Sem recibo, não existe dedução. Imigrantes perdem muito dinheiro porque não guardam: recibos de materiais, ferramentas, childcare, reparos, aluguel, despesas médicas. Guardar recibos é uma das formas mais simples de economizar.</div>
</div>

<div class="error-card">
<div class="error-title">❌ Erro 3: Não registrar quilometragem</div>
<div class="error-desc">Para quem trabalha com carro (Uber, Lyft, DoorDash, faxina, jardinagem, construção), quilometragem é a maior dedução que existe. Mas só vale se você registrar. Sem registro = sem dedução. E isso pode custar milhares de dólares. Use o app <strong>Spark Driver</strong> (gratuito).</div>
</div>

<div class="error-card">
<div class="error-title">❌ Erro 4: Misturar despesas pessoais com despesas de negócio</div>
<div class="error-desc">Esse erro causa: perda de deduções, confusão, risco de auditoria, dificuldade de comprovar despesas. Tenha: uma conta separada, um cartão separado, recibos separados. Organização = economia.</div>
</div>

<div class="error-card">
<div class="error-title">❌ Erro 5: Declarar dependentes incorretamente</div>
<div class="error-desc">Declarar dependente que não mora com você, dois pais declarando a mesma criança, declarar criança sem SSN válido, não ter documentos de custódia — tudo isso gera cartas do IRS, atrasos no reembolso, perda de créditos e devolução de dinheiro.</div>
</div>

<div class="error-card">
<div class="error-title">❌ Erro 6: Não informar o preparador sobre renda extra</div>
<div class="error-desc">Muitos imigrantes escondem renda porque têm medo de pagar imposto. Mas isso só piora: perde créditos, perde benefícios, aumenta risco de carta do IRS e pode pagar mais no futuro. Transparência é sempre o melhor caminho.</div>
</div>

<div class="error-card">
<div class="error-title">❌ Erro 7: Não revisar o W-4</div>
<div class="error-desc">Se seu W-4 está desatualizado, pode estar retendo muito ou pouco imposto. Revisar anualmente evita surpresas — tanto reembolsos exagerados (que são empréstimos ao governo) quanto contas a pagar no fim do ano.</div>
</div>

<div class="error-card">
<div class="error-title">❌ Erro 8: Não pedir créditos que tem direito</div>
<div class="error-desc">EIC, CTC, Childcare Credit, Education Credit — muitos imigrantes nem sabem que existem. Cada crédito pode valer centenas ou milhares de dólares. Informe-se e peça tudo que tem direito.</div>
</div>

<div class="error-card">
<div class="error-title">❌ Erro 9: Ignorar cartas do IRS</div>
<div class="error-desc">A carta não vai desaparecer. Ignorar gera multas, juros e problemas cada vez maiores. Leia, entenda, responda dentro do prazo e peça ajuda profissional se precisar.</div>
</div>

<!-- CAP 8 -->
<h2 id="cap8">Capítulo 8 — Conclusão: Sua Jornada Financeira nos EUA Começa Aqui</h2>
<p class="subtitle">Você chegou até aqui. Isso já é uma grande conquista.</p>

<p>Chegar aos Estados Unidos é começar uma vida nova — cheia de oportunidades, mas também cheia de desafios que ninguém explica. Entre esses desafios, entender o sistema de impostos é um dos mais importantes. E, para muitos imigrantes, também um dos mais assustadores.</p>

<p>Se você chegou até aqui, <strong>parabéns</strong>. Você já está muito à frente da maioria das pessoas que vivem neste país há anos e ainda não entendem como tudo funciona.</p>

<h3>1. Você agora entende o sistema — e isso muda tudo</h3>
<p>Ao longo deste livro, você aprendeu:</p>
<ul>
<li>Como funciona o imposto nos EUA</li>
<li>Por que imigrantes precisam declarar</li>
<li>Como se organizar durante o ano</li>
<li>Como funcionam créditos e deduções</li>
<li>Como o IRS trabalha</li>
<li>Quem você pode declarar como dependente</li>
<li>Como evitar erros que custam dinheiro</li>
<li>Estratégias para pagar menos durante o ano</li>
</ul>
<p>Isso não é pouca coisa. É <strong>conhecimento que transforma</strong>.</p>

<h3>2. Informação é poder</h3>
<p>Quando você entende o que é dedutível, como registrar quilometragem, como guardar recibos, como identificar dependentes, como pedir créditos e como evitar problemas com o IRS — você deixa de ser refém do sistema e <strong>passa a usar o sistema a seu favor</strong>.</p>

<h3>3. Organização é a chave</h3>
<p>Não existe mágica. Existe organização. E organização é apenas:</p>
<ul>
<li>Uma pasta física</li>
<li>Uma pasta digital</li>
<li>Um controle mensal</li>
<li>Um checklist anual</li>
<li>E alguns minutos por mês</li>
</ul>

<h3>4. Você tem direito a benefícios</h3>
<p>Muitos imigrantes perdem dinheiro porque não sabem que têm direito a Child Tax Credit, Earned Income Credit, Childcare Credit, American Opportunity Credit e Premium Tax Credit. Agora você sabe.</p>

<h3>5. Próximos passos</h3>
<ul>
<li>☑️ Monte sua pasta física e digital</li>
<li>☑️ Comece a registrar quilometragem (se aplicável)</li>
<li>☑️ Revise seu W-4</li>
<li>☑️ Verifique se seus dependentes têm SSN</li>
<li>☑️ Separe conta de negócio (se autônomo)</li>
<li>☑️ Use as ferramentas do apêndice desta apostila</li>
</ul>

<div class="cta-box">
    <h3>💙 Precisa de ajuda profissional?</h3>
    <p>Se você quer um preparador que entenda a realidade dos imigrantes e que fale português, entre em contato:</p>
    <p style="font-size: 14pt; margin-top: 10px;"><strong>Kelly Moraes — Preparadora de Impostos</strong></p>
    <p>📱 WhatsApp: (857) 244-3842 &nbsp; | &nbsp; 📧 expressinc1040@gmail.com</p>
    <p style="font-size: 9pt; margin-top: 10px;">Agende sua consulta e declare com confiança!</p>
</div>

<p style="text-align: center; font-size: 12pt; color: #1A3D6E; margin-top: 30px;"><strong>Sua jornada financeira nos EUA começa agora. 🚀</strong></p>

<!-- ====== APÊNDICE — FERRAMENTAS PRÁTICAS ====== -->
<div class="section-part" style="border-left-color: #666; background: #f0f0f0;">
    <div class="part-number">Apêndice</div>
    <h2 style="color: #444;">🔧 11 Ferramentas Práticas</h2>
    <p style="color: #666; font-size: 10pt;">Estas ferramentas são o grande diferencial desta apostila. Use ao longo de todo o ano — preencha digitalmente no PDF ou imprima.</p>
</div>

<!-- F1 -->
<div class="tool-section">
    <h3>F1 — Checklist de Documentos Obrigatórios</h3>
    <p class="tool-instruction">Uso: no início de cada temporada fiscal. Marque cada documento conforme recebe.</p>
    <table class="styled-table">
    <thead><tr><th>Categoria</th><th>Documento</th><th>Recebeu?</th></tr></thead>
    <tbody>
    <tr><td rowspan="3"><strong>Identificação</strong></td><td>SSN ou ITIN de todos na declaração</td><td>☐ SIM &nbsp; ☐ NÃO</td></tr>
    <tr><td>Carteira de motorista ou ID</td><td>☐ SIM &nbsp; ☐ NÃO</td></tr>
    <tr><td>Informações bancárias (routing + account)</td><td>☐ SIM &nbsp; ☐ NÃO</td></tr>
    <tr><td rowspan="4"><strong>Renda</strong></td><td>W-2 (todos os empregos)</td><td>☐ SIM &nbsp; ☐ NÃO</td></tr>
    <tr><td>1099-NEC / 1099-MISC</td><td>☐ SIM &nbsp; ☐ NÃO</td></tr>
    <tr><td>1099-K (PayPal, CashApp, Venmo, apps)</td><td>☐ SIM &nbsp; ☐ NÃO</td></tr>
    <tr><td>1099-INT, 1099-DIV, 1099-B (investimentos)</td><td>☐ SIM &nbsp; ☐ NÃO</td></tr>
    <tr><td rowspan="3"><strong>Dependentes</strong></td><td>SSN/ITIN dos dependentes</td><td>☐ SIM &nbsp; ☐ NÃO</td></tr>
    <tr><td>Comprovante de residência do dependente</td><td>☐ SIM &nbsp; ☐ NÃO</td></tr>
    <tr><td>Carta da escola / Certidão de nascimento</td><td>☐ SIM &nbsp; ☐ NÃO</td></tr>
    <tr><td rowspan="3"><strong>Despesas</strong></td><td>1098 (juros de hipoteca)</td><td>☐ SIM &nbsp; ☐ NÃO</td></tr>
    <tr><td>Recibos de despesas de negócio</td><td>☐ SIM &nbsp; ☐ NÃO</td></tr>
    <tr><td>Recibos de despesas médicas</td><td>☐ SIM &nbsp; ☐ NÃO</td></tr>
    <tr><td rowspan="2"><strong>Outros</strong></td><td>1095-A (seguro Marketplace)</td><td>☐ SIM &nbsp; ☐ NÃO</td></tr>
    <tr><td>Declaração do ano anterior</td><td>☐ SIM &nbsp; ☐ NÃO</td></tr>
    </tbody>
    </table>
</div>

<!-- F2 -->
<div class="tool-section">
    <h3>F2 — Checklist Anual Completo</h3>
    <p class="tool-instruction">Uso: antes de enviar documentos ao preparador. Verifique cada item.</p>
    <h4>1. Informações Pessoais</h4>
    <div class="checklist"><ul>
    <li>Atualizei meu endereço</li>
    <li>Verifiquei meu estado civil para impostos</li>
    <li>Confirmei SSN/ITIN de todos na declaração</li>
    <li>Tenho informações bancárias atualizadas</li>
    </ul></div>
    <h4>2. Dependentes</h4>
    <div class="checklist"><ul>
    <li>Verifiquei quem realmente se qualifica como dependente</li>
    <li>Tenho comprovante de residência do dependente</li>
    <li>Tenho documentos de custódia (se aplicável)</li>
    <li>Tenho recibos de childcare</li>
    </ul></div>
    <h4>3. Rendas</h4>
    <div class="checklist"><ul>
    <li>Recebi todos os W-2</li>
    <li>Extratos bancários de todas as contas</li>
    <li>Recebi todos os 1099-NEC / 1099-MISC</li>
    <li>Recebi 1099-K (PayPal, CashApp, Venmo, Uber etc.)</li>
    <li>Tenho comprovantes de renda em dinheiro</li>
    <li>Tenho relatórios de plataformas (Uber, Lyft, DoorDash etc.)</li>
    <li>Tenho documentos de renda de aluguel</li>
    <li>Tenho documentos de investimentos</li>
    <li>Tenho 1099-G (unemployment, restituição estadual)</li>
    </ul></div>
    <h4>4. Despesas Dedutíveis</h4>
    <div class="checklist"><ul>
    <li>Despesas médicas</li>
    <li>Seguro de saúde (1095-A)</li>
    <li>Juros de hipoteca (1098)</li>
    <li>Property tax</li>
    <li>Doações</li>
    <li>Educação (1098-T)</li>
    <li>Contribuições para IRA / HSA</li>
    <li>Despesas de negócio (Schedule C)</li>
    <li>Despesas de aluguel (Schedule E)</li>
    </ul></div>
    <h4>5. Revisão Final</h4>
    <div class="checklist"><ul>
    <li>Conferi se todos os documentos estão completos</li>
    <li>Separei tudo por categoria</li>
    <li>Digitalizei documentos importantes</li>
    <li>Estou pronto(a) para enviar ao preparador</li>
    </ul></div>
</div>

<!-- F3 -->
<div class="tool-section">
    <h3>F3 — Lista de Tipos de Renda que Devem Ser Declarados</h3>
    <p class="tool-instruction">Uso: verifique se você tem renda em alguma categoria. Anote o valor e documento.</p>
    <table class="styled-table">
    <thead><tr><th>Categoria</th><th>Tipo de Renda</th><th>Valor</th><th>Documento</th></tr></thead>
    <tbody>
    <tr><td rowspan="4"><strong>Trabalho</strong></td><td>Salário (W-2)</td><td></td><td></td></tr>
    <tr><td>Gorjetas e comissões</td><td></td><td></td></tr>
    <tr><td>Trabalho autônomo (1099-NEC)</td><td></td><td></td></tr>
    <tr><td>Renda de apps (Uber, DoorDash, etc.)</td><td></td><td></td></tr>
    <tr><td rowspan="3"><strong>Aluguel</strong></td><td>Aluguel de imóvel residencial</td><td></td><td></td></tr>
    <tr><td>Airbnb / VRBO</td><td></td><td></td></tr>
    <tr><td>Aluguel de quarto</td><td></td><td></td></tr>
    <tr><td rowspan="3"><strong>Investimentos</strong></td><td>Dividendos (1099-DIV)</td><td></td><td></td></tr>
    <tr><td>Juros bancários (1099-INT)</td><td></td><td></td></tr>
    <tr><td>Ganhos com criptomoedas</td><td></td><td></td></tr>
    <tr><td rowspan="2"><strong>Governo</strong></td><td>Unemployment (1099-G)</td><td></td><td></td></tr>
    <tr><td>Restituição estadual anterior</td><td></td><td></td></tr>
    <tr><td rowspan="3"><strong>Diversas</strong></td><td>Prêmios, sorteios, loterias</td><td></td><td></td></tr>
    <tr><td>Renda de plataformas digitais</td><td></td><td></td></tr>
    <tr><td>Vendas online (Etsy, eBay, FB Marketplace)</td><td></td><td></td></tr>
    </tbody>
    </table>
    <p class="text-small" style="margin-top: 8px;"><strong>⚠️ Não são rendas tributáveis:</strong> Child support (pensão alimentícia), presentes, reembolsos de loja/app.</p>
</div>

<!-- F4 -->
<div class="tool-section">
    <h3>F4 — Quiz de Rendas</h3>
    <p class="tool-instruction">Uso: entrevista com preparador. Responda SIM/NÃO para cada pergunta.</p>
    <table class="styled-table">
    <thead><tr><th>Pergunta</th><th>Sim/Não</th><th>Valor</th><th>Documento</th></tr></thead>
    <tbody>
    <tr><td>Você trabalhou como empregado (recebeu salário)?</td><td></td><td></td><td></td></tr>
    <tr><td>Recebeu gorjetas?</td><td></td><td></td><td></td></tr>
    <tr><td>Trabalhou por conta própria (1099)?</td><td></td><td></td><td></td></tr>
    <tr><td>Trabalhou com Uber, Lyft, DoorDash ou outro app?</td><td></td><td></td><td></td></tr>
    <tr><td>Fez faxina, jardinagem, construção ou serviço informal?</td><td></td><td></td><td></td></tr>
    <tr><td>Recebeu pagamento via Zelle, CashApp ou Venmo?</td><td></td><td></td><td></td></tr>
    <tr><td>Teve imóvel alugado (incluindo Airbnb)?</td><td></td><td></td><td></td></tr>
    <tr><td>Teve renda de investimentos (ações, cripto)?</td><td></td><td></td><td></td></tr>
    <tr><td>Recebeu unemployment (seguro-desemprego)?</td><td></td><td></td><td></td></tr>
    <tr><td>Recebeu Social Security ou aposentadoria?</td><td></td><td></td><td></td></tr>
    <tr><td>Vendeu itens online (Etsy, eBay, Marketplace)?</td><td></td><td></td><td></td></tr>
    <tr><td>Recebeu prêmios, sorteios ou ganhou loteria?</td><td></td><td></td><td></td></tr>
    </tbody>
    </table>
</div>

<!-- F5 -->
<div class="tool-section">
    <h3>F5 — Quiz Familiar (Dependentes e Childcare)</h3>
    <p class="tool-instruction">Uso: verifique elegibilidade de dependentes e childcare. Preencha antes de declarar.</p>
    <h4>A. Dependentes</h4>
    <table class="styled-table">
    <thead><tr><th>Pergunta</th><th>Sim/Não</th><th>Nome</th><th>Observação</th></tr></thead>
    <tbody>
    <tr><td>Você tem filhos menores de 17 anos?</td><td></td><td></td><td></td></tr>
    <tr><td>Seus filhos têm SSN válido?</td><td></td><td></td><td></td></tr>
    <tr><td>Seus filhos moram com você há mais de 6 meses?</td><td></td><td></td><td></td></tr>
    <tr><td>Seus filhos não fornecem mais da metade do próprio sustento?</td><td></td><td></td><td></td></tr>
    <tr><td>Alguém além de você mora com você e depende de você financeiramente?</td><td></td><td></td><td></td></tr>
    <tr><td>Seus pais moram com você nos EUA?</td><td></td><td></td><td></td></tr>
    <tr><td>Você é divorciado(a)? Tem acordo de custódia?</td><td></td><td></td><td></td></tr>
    <tr><td>Outro pai/mãe vai declarar o mesmo filho?</td><td></td><td></td><td></td></tr>
    </tbody>
    </table>
    <h4>B. Childcare</h4>
    <table class="styled-table">
    <thead><tr><th>Pergunta</th><th>Sim/Não</th><th>Detalhes</th></tr></thead>
    <tbody>
    <tr><td>Você paga creche, daycare ou afterschool?</td><td></td><td></td></tr>
    <tr><td>Você tem recibos com nome e SSN/EIN do provedor?</td><td></td><td></td></tr>
    <tr><td>Childcare é necessário para você trabalhar?</td><td></td><td></td></tr>
    </tbody>
    </table>
</div>

<!-- F6 -->
<div class="tool-section">
    <h3>F6 — Tabela: O Que É Dedutível e O Que Não É</h3>
    <p class="tool-instruction">Uso: consulta rápida. Verde = dedutível. Vermelho = não dedutível.</p>
    <table class="styled-table">
    <thead><tr><th>Categoria</th><th class="green-cell">✅ DEDUTÍVEL</th><th class="red-cell">❌ NÃO DEDUTÍVEL</th></tr></thead>
    <tbody>
    <tr><td><strong>Médico</strong></td><td>Consultas, exames, cirurgias, dentista, medicamentos prescritos, óculos, terapia</td><td>Academia, vitaminas, cosméticos, estética, tratamento capilar</td></tr>
    <tr><td><strong>Casa Própria</strong></td><td>Juros de hipoteca (1098), property tax, home equity loan (melhoria)</td><td>Seguro residencial, manutenção comum, melhoria estética</td></tr>
    <tr><td><strong>Negócio</strong></td><td>Quilometragem, suprimentos, celular (negócio), internet, software, marketing</td><td>Almoço pessoal, roupa comum, multas, academia</td></tr>
    <tr><td><strong>Aluguel</strong></td><td>Reparos, HOA, seguro do imóvel, property tax, serviços de limpeza</td><td>Melhorias (usar depreciação), despesas pessoais</td></tr>
    <tr><td><strong>Veículo</strong></td><td>Quilometragem de negócio ($0,70/mi), combustível, manutenção (negócio)</td><td>Quilometragem pessoal, seguro pessoal, multas de trânsito</td></tr>
    <tr><td><strong>Pessoal</strong></td><td>Doações com recibo, IRA, HSA, juros de student loan, tuition</td><td>Presentes, doação sem recibo, aulas recreativas</td></tr>
    </tbody>
    </table>
</div>

<!-- F7 -->
<div class="tool-section">
    <h3>F7 — Controle de Despesas de Negócio (Schedule C)</h3>
    <p class="tool-instruction">Uso: registro mensal de despesas de autônomos. Preencha ao longo do ano.</p>
    <table class="styled-table">
    <thead><tr><th>Categoria</th><th>Descrição</th><th>Valor ($)</th></tr></thead>
    <tbody>
    <tr><td>Suprimentos e materiais</td><td></td><td></td></tr>
    <tr><td>Ferramentas e equipamentos</td><td></td><td></td></tr>
    <tr><td>Taxas de aplicativos</td><td></td><td></td></tr>
    <tr><td>Celular e telefone</td><td></td><td></td></tr>
    <tr><td>Internet</td><td></td><td></td></tr>
    <tr><td>Software e assinaturas</td><td></td><td></td></tr>
    <tr><td>Marketing e publicidade</td><td></td><td></td></tr>
    <tr><td>Quilometragem (mi × $0,70)</td><td></td><td></td></tr>
    <tr><td>Seguro (parte de negócio)</td><td></td><td></td></tr>
    <tr><td>Manutenção de veículo (negócio)</td><td></td><td></td></tr>
    <tr><td>Uniformes e roupas de trabalho</td><td></td><td></td></tr>
    <tr><td>Educação relacionada ao negócio</td><td></td><td></td></tr>
    <tr><td>Taxas e licenças profissionais</td><td></td><td></td></tr>
    <tr><td>Home office (% da casa)</td><td></td><td></td></tr>
    <tr><td>Outros</td><td></td><td></td></tr>
    <tr style="font-weight: bold; background: #e8f0fe;"><td colspan="2">TOTAL</td><td></td></tr>
    </tbody>
    </table>
</div>

<!-- F8 -->
<div class="tool-section">
    <h3>F8 — Controle de Despesas de Imóvel de Aluguel (Schedule E)</h3>
    <p class="tool-instruction">Uso: registro mensal de despesas de propriedade alugada. Preencha ao longo do ano.</p>
    <table class="styled-table">
    <thead><tr><th>Categoria</th><th>Descrição</th><th>Valor ($)</th></tr></thead>
    <tbody>
    <tr><td>Reparos e manutenção</td><td></td><td></td></tr>
    <tr><td>Seguro do imóvel</td><td></td><td></td></tr>
    <tr><td>Property tax</td><td></td><td></td></tr>
    <tr><td>HOA (condomínio)</td><td></td><td></td></tr>
    <tr><td>Serviços de paisagismo</td><td></td><td></td></tr>
    <tr><td>Serviços de limpeza</td><td></td><td></td></tr>
    <tr><td>Juros de hipoteca do imóvel</td><td></td><td></td></tr>
    <tr><td>Utilidades (se pagas pelo proprietário)</td><td></td><td></td></tr>
    <tr><td>Propaganda / anúncio do aluguel</td><td></td><td></td></tr>
    <tr><td>Depreciação</td><td></td><td></td></tr>
    <tr><td>Quilometragem para o imóvel</td><td></td><td></td></tr>
    <tr><td>Outros</td><td></td><td></td></tr>
    <tr style="font-weight: bold; background: #e8f0fe;"><td colspan="2">TOTAL</td><td></td></tr>
    </tbody>
    </table>
</div>

<!-- F9 -->
<div class="tool-section">
    <h3>F9 — Controle de Deduções Pessoais (Form 1040)</h3>
    <p class="tool-instruction">Uso: antes de declarar, liste todas as deduções pessoais possíveis.</p>
    <h4>A. Above-the-Line (reduzem AGI)</h4>
    <table class="styled-table">
    <thead><tr><th>Dedução</th><th>Valor ($)</th></tr></thead>
    <tbody>
    <tr><td>Contribuição para Traditional IRA</td><td></td></tr>
    <tr><td>Contribuição para HSA</td><td></td></tr>
    <tr><td>Juros de empréstimo estudantil</td><td></td></tr>
    <tr><td>Metade do self-employment tax</td><td></td></tr>
    <tr><td>Contribuição para SEP-IRA / SIMPLE IRA</td><td></td></tr>
    <tr><td>Penalidade por saque antecipado de CD</td><td></td></tr>
    <tr><td>Alimony (pagamentos anteriores a 2019)</td><td></td></tr>
    </tbody>
    </table>
    <h4>B. Itemized Deductions (se maiores que Standard Deduction)</h4>
    <table class="styled-table">
    <thead><tr><th>Dedução</th><th>Valor ($)</th></tr></thead>
    <tbody>
    <tr><td>Juros de hipoteca (1098)</td><td></td></tr>
    <tr><td>Property tax (SALT — limitado a $10.000)</td><td></td></tr>
    <tr><td>State/local income tax ou sales tax</td><td></td></tr>
    <tr><td>Doações de caridade (com recibo)</td><td></td></tr>
    <tr><td>Despesas médicas (> 7,5% do AGI)</td><td></td></tr>
    <tr><td>Perdas por desastre (casualty/theft)</td><td></td></tr>
    <tr style="font-weight: bold; background: #e8f0fe;"><td>TOTAL ITEMIZED</td><td></td></tr>
    </tbody>
    </table>
    <p class="text-small"><strong>Comparação:</strong> Standard Deduction = $15.000 (Single) / $22.500 (HoH) / $30.000 (MFJ). Use Itemized só se o total for MAIOR.</p>
</div>

<!-- F10 -->
<div class="tool-section">
    <h3>F10 — Modelo de Controle de Quilometragem</h3>
    <p class="tool-instruction">Uso: anote TODA viagem de negócio. Taxa 2027: $0,70/milha. Recomendação: use o app Spark Driver (gratuito).</p>
    <table class="styled-table">
    <thead><tr><th>Data</th><th>Origem</th><th>Destino</th><th>Motivo</th><th>Milhas</th><th>Valor ($)</th></tr></thead>
    <tbody>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr style="font-weight: bold; background: #e8f0fe;"><td colspan="4">TOTAL DO MÊS</td><td></td><td></td></tr>
    </tbody>
    </table>
    <div class="box-alert" style="margin-top: 10px; font-size: 9pt;">
        <strong>⚠️ Regras do IRS:</strong> Anotar na época da viagem (registro contemporâneo). Quilometragem ida/volta para trabalho fixo NÃO é dedutível. Sempre anotar o motivo da viagem.
    </div>
</div>

<!-- F11 -->
<div class="tool-section">
    <h3>F11 — Modelo de Controle de Recibos</h3>
    <p class="tool-instruction">Uso: registre cada recibo importante. Tire foto assim que receber e guarde na pasta do mês.</p>
    <table class="styled-table">
    <thead><tr><th>Data</th><th>Descrição</th><th>Categoria</th><th>Valor ($)</th><th>Arquivo Digital</th></tr></thead>
    <tbody>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    </tbody>
    </table>
    <div class="box-tip" style="margin-top: 10px; font-size: 9pt;">
        <strong>💡 Dicas:</strong> Fotografe cada recibo assim que receber. Recibos desbotam — digitalizar é essencial. Nomeie cada arquivo com data e descrição (ex: "2027-01-15_Materiais_Lowe"). Para negócios, mantenha recibos separados por categoria.
    </div>
</div>

<!-- ====== PÁGINA FINAL ====== -->
<div style="page-break-before: always; text-align: center; padding-top: 100px;">
    <p style="font-size: 18pt; color: #1A3D6E; font-family: 'Playfair Display', Georgia, serif;">Obrigado(a) por investir no seu conhecimento.</p>
    <p style="font-size: 12pt; color: #555; margin-top: 20px;">Este guia foi feito com carinho para ajudar imigrantes<br>a entender e dominar o sistema de impostos dos EUA.</p>
    <p style="margin-top: 30px;"><strong>Kelly Moraes</strong><br>Preparadora de Impostos</p>
    <p style="color: #888; font-size: 10pt; margin-top: 10px;">📱 WhatsApp: (857) 244-3842 &nbsp;|&nbsp; 📧 expressinc1040@gmail.com</p>
    <p style="color: #aaa; font-size: 9pt; margin-top: 30px;">© 2027 — Todos os direitos reservados.<br>Este material é para fins educacionais. Consulte um CPA para orientação específica.</p>
</div>

</body>
</html>
"""

# ============================================================
# GERAÇÃO DO ARQUIVO
# ============================================================

def main():
    output_dir = "/Users/andrealmeida/Downloads/projeto imposto kelly"
    html_path = os.path.join(output_dir, "apostila_guia_impostos_imigrantes.html")
    pdf_path = os.path.join(output_dir, "apostila_guia_impostos_imigrantes.pdf")
    
    # Escrever HTML
    print("📝 Escrevendo HTML...")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(HTML_CONTENT)
    print(f"✅ HTML salvo em: {html_path}")
    
    # Tentar converter para PDF com weasyprint
    try:
        print("📄 Convertendo para PDF com weasyprint...")
        from weasyprint import HTML
        HTML(filename=html_path).write_pdf(pdf_path)
        print(f"✅ PDF salvo em: {pdf_path}")
    except ImportError:
        print("⚠️ weasyprint não está instalado. Tentando instalar...")
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "weasyprint"], 
                                cwd=output_dir)
            print("✅ weasyprint instalado! Convertendo...")
            from weasyprint import HTML
            HTML(filename=html_path).write_pdf(pdf_path)
            print(f"✅ PDF salvo em: {pdf_path}")
        except Exception as e:
            print(f"❌ Não foi possível instalar weasyprint: {e}")
            print(f"💡 Você pode abrir o HTML no navegador e usar 'Imprimir > Salvar como PDF'")
            print(f"   Arquivo HTML: {html_path}")

if __name__ == "__main__":
    main()
