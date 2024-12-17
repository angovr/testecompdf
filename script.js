const url = 'https://angovr.github.io/testecompdf/formulario.pdf'; // Certifique-se de que o link direto ao PDF está correto

// Referências ao elemento canvas
const canvas = document.getElementById('pdf-canvas');
const context = canvas.getContext('2d');

// Ajustar o tamanho do canvas para ocupar a área total do navegador
function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Redimensionar o canvas ao ajustar a janela
window.addEventListener('resize', ajustarCanvas);
ajustarCanvas();

// Carregar o PDF com o PDF.js e exibir no canvas
pdfjsLib.getDocument(url).promise.then(function (pdf) {
    pdf.getPage(1).then(function (page) {
        const viewport = page.getViewport({ scale: 1 });

        // Ajustar canvas para o tamanho da página PDF
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Renderizar a página no canvas
        page.render({
            canvasContext: context,
            viewport: viewport
        });
    });
});
