const url = 'https://angovr.github.io/testecompdf/formulario.pdf'; // Certifique-se de que o link direto ao PDF está correto

// Referências aos elementos HTML
const canvas = document.getElementById('pdf-canvas');
const context = canvas.getContext('2d');

// Carregar o PDF com o PDF.js e exibir no canvas
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

    // Obter os campos do formulário preenchível
    const form = pdfDoc.getForm();
    const fields = form.getFields();

    // Capturar os valores preenchidos no navegador
    fields.forEach(field => {
        const fieldName = field.getName();
        const fieldType = field.constructor.name;
        console.log(`Campo detectado: ${fieldName} (${fieldType})`);
    });

    // Salvar o PDF preenchido
    const pdfBytes = await pdfDoc.save();

    // Criar link para download do PDF preenchido
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
    link.download = 'formulario_preenchido.pdf';
    link.click();
});
