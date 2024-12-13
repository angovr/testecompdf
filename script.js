const url = 'https://angovr.github.io/testecompdf/formulario.pdf'; // URL do PDF

// Função para carregar e renderizar o PDF com pdf.js
async function renderPDF() {
    try {
        const pdf = await pdfjsLib.getDocument(url).promise;
        const container = document.getElementById('pdf-container');
        container.innerHTML = ''; // Limpar o conteúdo do container

        // Renderizar todas as páginas
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
    } catch (error) {
        console.error("Erro ao carregar o PDF:", error);
        alert("Erro ao carregar o PDF. Verifique a URL e tente novamente.");
    }
}

// Carregar e renderizar o PDF
renderPDF();

// Adicionar funcionalidade para salvar o PDF preenchido
document.getElementById('save-pdf').addEventListener('click', async function() {
    try {
        const { PDFDocument } = PDFLib;

        // Carregar o PDF original usando pdf-lib
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // Obter o formulário preenchível do PDF
        const form = pdfDoc.getForm();

        // Preencher campos no formulário
        const nomeField = form.getTextField('nome'); // Substitua 'nome' pelo nome correto do campo no PDF
        nomeField.setText('João');

        const emailField = form.getTextField('email'); // Substitua 'email' pelo nome correto do campo no PDF
        emailField.setText('joao@email.com');

        // Salvar o PDF com os campos preenchidos
        const pdfBytes = await pdfDoc.save();

        // Criar link para download do PDF preenchido
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
