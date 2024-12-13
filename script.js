const url = 'https://angovr.github.io/testecompdf/formulario.pdf'; // URL do PDF

// Adicionar funcionalidade para salvar o PDF preenchido
document.getElementById('save-pdf').addEventListener('click', async function() {
    try {
        const { PDFDocument } = PDFLib;

        // Carregar o PDF original usando pdf-lib
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // Obter o formulário preenchível do PDF
        const form = pdfDoc.getForm();

        // Preencher campos no formulário (substitua os nomes pelos campos reais do seu PDF)
        const nomeField = form.getTextField('nome'); // Substitua 'nome' pelo nome real do campo
        nomeField.setText('João');

        const emailField = form.getTextField('email'); // Substitua 'email' pelo nome real do campo
        emailField.setText('joao@email.com');

        // Salvar o PDF com os campos preenchidos
        const pdfBytes = await pdfDoc.save();

        // Criar link para download do PDF com os campos preenchidos
        const link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
        link.download = 'formulario_preenchido.pdf';
        link.click();

        // Limpar o objeto URL após o download
        URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error("Erro ao salvar o PDF:", error);
        alert("Erro ao salvar o PDF.");
    }
});
