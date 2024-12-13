const url = 'https://angovr.github.io/testecompdf/formulario.pdf'; // Link do PDF original

// Adicionar funcionalidade para salvar o PDF preenchido
document.getElementById('save-pdf').addEventListener('click', async function() {
    const { PDFDocument } = PDFLib;

    // Carregar o PDF original
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Obter os campos do formulário preenchível
    const form = pdfDoc.getForm();

    // Capturar os valores preenchidos no HTML
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    // Preencher os campos do PDF com os valores do formulário HTML
    const nomeField = form.getTextField('nome'); // Supondo que o campo se chame 'nome' no PDF
    nomeField.setText(nome);

    const emailField = form.getTextField('email'); // Supondo que o campo se chame 'email' no PDF
    emailField.setText(email);

    // Salvar o PDF preenchido
    const pdfBytes = await pdfDoc.save();

    // Criar link para download do PDF preenchido
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
    link.download = 'formulario_preenchido.pdf';
    link.click();
});
