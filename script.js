const url = 'https://angovr.github.io/testecompdf/formulario.pdf'; // Link para o PDF preenchível

// Referência ao canvas para exibição do PDF
const canvas = document.getElementById('pdf-canvas');
const context = canvas.getContext('2d');

// Carregar e exibir o PDF no canvas usando PDF.js
pdfjsLib.getDocument(url).promise.then(function(pdf) {
    pdf.getPage(1).then(function(page) {
        const viewport = page.getViewport({ scale: 1 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        page.render({
            canvasContext: context,
            viewport: viewport
        });
    });
});

// Adicionar funcionalidade para salvar o PDF preenchido
document.getElementById('save-pdf').addEventListener('click', async function() {
    const { PDFDocument } = PDFLib;

    // Carregar o PDF original
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Obter o formulário do PDF (os campos preenchíveis)
    const form = pdfDoc.getForm();

    // Aqui você pode preencher os campos, por exemplo:
    // Preenchendo o campo 'nome' com 'João'
    const nomeField = form.getTextField('nome');
    nomeField.setText('João'); // Altere o valor conforme necessário

    // Preenchendo o campo 'email' com 'joao@email.com'
    const emailField = form.getTextField('email');
    emailField.setText('joao@email.com'); // Altere o valor conforme necessário

    // Salvar o PDF preenchido
    const pdfBytes = await pdfDoc.save();

    // Criar link para download do PDF preenchido
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
    link.download = 'formulario_preenchido.pdf';
    link.click();

    // Limpar o objeto URL após o download
    URL.revokeObjectURL(link.href);
});
