const url = 'https://github.com/angovr/testecompdf/blob/a6fe891ba2f68cc9dda0143ff82385f79c60372d/formulario.pdf';  
 
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
 
// Preencher o formulário e gerar o PDF preenchido
document.getElementById('form').addEventListener('submit', async function(e) {
    e.preventDefault();
 
    const { PDFDocument } = PDFLib;
 
    // Carregar o PDF original
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
 
    // Preencher os campos do formulário com os dados inseridos
    const form = pdfDoc.getForm();
    const nomeField = form.getTextField('nome');
    const emailField = form.getTextField('email');
 
    nomeField.setText(document.getElementById('nome').value);
    emailField.setText(document.getElementById('email').value);
 
    // Gerar o PDF preenchido
    const pdfBytes = await pdfDoc.save();
 
    // Criar link para download do novo PDF
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
    link.download = 'formulario_preenchido.pdf';
    link.click();
});

