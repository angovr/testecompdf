window.addEventListener('DOMContentLoaded', async function () {
    try {
        console.log('Iniciando salvamento automático do PDF...');

        // URL do PDF original
        const url = 'https://angovr.github.io/testecompdf/formulario.pdf'; 
        const { PDFDocument } = PDFLib;

        // Carregar o PDF original
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
        console.log('PDF carregado');
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        console.log('PDF processado');

        // Obter o formulário preenchível do PDF
        const form = pdfDoc.getForm();

        // Preenchimento dos campos do formulário
        const nomeResponsavel = 'João da Silva'; // Substituir com valor dinâmico, se necessário
        const nomeField = form.getTextField('nome');
        nomeField.setText(nomeResponsavel);
        console.log('Campo nome preenchido');

        const emailField = form.getTextField('email');
        emailField.setText('joao@email.com');
        console.log('Campo email preenchido');

        // "Flatten" o formulário para tornar os campos não editáveis
        await pdfDoc.flatten();
        console.log('Campos de formulário convertidos em texto estático');

        // Salvar o PDF preenchido
        const pdfBytes = await pdfDoc.save();
        console.log('PDF salvo');

        // Obter a data atual no formato "YYYY-MM-DD"
        const today = new Date();
        const dataAtual = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        // Gerar o nome do arquivo dinamicamente
        const nomeArquivo = `Formulario_${nomeResponsavel.replace(/ /g, '_')}_${dataAtual}.pdf`;

        // Criar link para download do PDF preenchido automaticamente
        const link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
        link.download = nomeArquivo; // Nome do arquivo para download
        document.body.appendChild(link);
        link.click();
        console.log(`Download iniciado: ${nomeArquivo}`);

        // Limpar o objeto URL após o download
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
    } catch (error) {
        console.error('Erro ao salvar o PDF automaticamente:', error);
        alert('Erro ao salvar o PDF.');
    }
});
