document.getElementById('save-pdf').addEventListener('click', async function() {
    try {
        console.log('Botão clicado');
        const url = 'https://angovr.github.io/testecompdf/formulario.pdf'; // URL do PDF original
        const { PDFDocument } = PDFLib;

        // Carregar o PDF original
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
        console.log('PDF carregado');
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        console.log('PDF processado');

        // Obter o formulário preenchível do PDF
        const form = pdfDoc.getForm();

        // Exemplo de preenchimento dos campos do formulário
        const nomeField = form.getTextField('nome');
        nomeField.setText('João da Silva');
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

        // Criar link para download do PDF preenchido
        const link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
        link.download = 'formulario_preenchido.pdf'; // Nome do arquivo para download
        link.click();
        console.log('Download iniciado');

        // Limpar o objeto URL após o download
        URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error("Erro ao salvar o PDF:", error);
        alert("Erro ao salvar o PDF.");
    }
});
