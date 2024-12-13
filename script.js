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

        // Preencher campos no formulário (modifique os nomes conforme necessário)
        const nomeField = form.getTextField('nome');
        nomeField.setText('João');

        const emailField = form.getTextField('email');
        emailField.setText('joao@email.com');

        // Criar um novo PDF com as páginas convertidas em imagem
        const newPdfDoc = await PDFDocument.create();

        // Vamos percorrer cada página do PDF original e renderizar como imagem
        const pages = await pdfDoc.getPages();
        for (const page of pages) {
            const { width, height } = page.getSize();
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;

            // Renderizar a página no canvas
            const viewport = page.getViewport({ scale: 1 });
            await page.render({
                canvasContext: context,
                viewport: viewport,
            });

            // Agora, vamos gerar uma imagem em forma de bytes
            const imgData = canvas.toDataURL('image/png'); // Converte para imagem

            // Adicionar uma nova página ao novo PDF com a imagem renderizada
            const imageBytes = await fetch(imgData).then(res => res.arrayBuffer());
            const image = await newPdfDoc.embedPng(imageBytes);

            newPdfDoc.addPage([width, height]);

            const pageToAdd = newPdfDoc.getPages()[newPdfDoc.getPages().length - 1];
            pageToAdd.drawImage(image, { x: 0, y: 0, width, height });
        }

        // Salvar o novo PDF com as imagens
        const pdfBytes = await newPdfDoc.save();

        // Criar link para download do PDF com as imagens
        const link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
        link.download = 'formulario_preenchido_imagem.pdf';
        link.click();

        // Limpar o objeto URL após o download
        URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error("Erro ao salvar o PDF:", error);
        alert("Erro ao salvar o PDF.");
    }
});
