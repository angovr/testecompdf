const url = 'https://angovr.github.io/testecompdf/formulario.pdf'; // Link direto ao PDF

// Carregar o PDF e permitir edição de campos
document.addEventListener('DOMContentLoaded', async () => {
    const { PDFDocument } = PDFLib;

    // Carregar o PDF original
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Obter o formulário do PDF
    const form = pdfDoc.getForm();

    // Obter os campos do formulário
    const textFields = form.getFields();
    textFields.forEach((field) => {
        const name = field.getName();
        console.log(`Campo encontrado: ${name}`);
    });

    // Exibir o PDF no navegador
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const urlBlob = URL.createObjectURL(blob);

    const iframe = document.createElement('iframe');
    iframe.src = urlBlob;
    iframe.width = '100%';
    iframe.height = '500px';
    document.body.appendChild(iframe);

    // Botão para salvar o PDF preenchido
    const saveButton = document.getElementById('save-pdf');
    saveButton.addEventListener('click', async () => {
        const filledPdfBytes = await pdfDoc.save();
        const blob = new Blob([filledPdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'formulario_preenchido.pdf';
        link.click();
    });
});
