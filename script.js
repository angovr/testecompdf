const url = 'https://angovr.github.io/testecompdf/formulario.pdf'; // URL do PDF

// Função para renderizar todas as páginas do PDF
async function renderPDF() {
    const pdf = await pdfjsLib.getDocument(url).promise;
    const container = document.getElementById('pdf-container');
    container.innerHTML = ''; // Limpar o conteúdo do container

    // Loop para renderizar todas as páginas
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);

        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
            canvasContext: context,
            viewport: viewport
        });
    }
}

// Carregar o PDF e renderizar as páginas
renderPDF();

// Adicionar funcionalidade para salvar o PDF preenchido
document.getElementById('save-pdf').addEventListener('click', async function() {
    const { PDFDocument } = PDFLib;

    // Carregar o PDF original
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Obter o formulário do PDF (os campos preenchíveis)
    const form = pdfDoc.getForm();

    // Aqui você pode preencher os campos do formulário preenchível diretamente no PDF
    const nomeField = form.getTextField('nome'); // Nome do campo no PDF
    nomeField.setText('João'); // Defina o valor do campo

    const emailField = form.getTextField('email'); // Nome do campo no PDF
    emailField.setText('joao@email.com'); // Defina o valor do campo

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
