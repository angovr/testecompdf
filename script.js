document.getElementById('save-pdf').addEventListener('click', async function() {
    try {
        const url = 'https://angovr.github.io/testecompdf/formulario.pdf'; // URL do PDF original
        const { PDFDocument } = PDFLib;

        // Carregar o PDF original
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // Obter o formulário preenchível do PDF
        const form = pdfDoc.getForm();

        // Exemplo de preenchimento dos campos do formulário (substitua pelos campos reais do seu PDF)
        const nomeField = form.getTextField('nome'); // Substitua 'nome' pelo nome real do campo no PDF
        nomeField.setText('João da Silva');

        const emailField = form.getTextField('email'); // Substitua 'email' pelo nome real do campo no PDF
        emailField.setText('joao@email.com');

        // Salvar o PDF preenchido
        const pdfBytes = await pdfDoc.save();

        // Criar link para download do PDF preenchido
        const link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
        link.download = 'formulario_preenchido.pdf'; // Nome do arquivo para download
        link.click();

        // Limpar o objeto URL após o download
        URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error("Erro ao salvar o PDF:", error);
        alert("Erro ao salvar o PDF.");
    }
});
