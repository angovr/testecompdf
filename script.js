document.getElementById('save-pdf').addEventListener('click', async function() {
    try {
        console.log('Botão clicado');
        const url = 'https://angovr.github.io/testecompdf/formulario.pdf'; // URL do PDF original
        const { PDFDocument } = PDFLib;

        // Carregar o PDF original
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
        console.log('PDF carregado');
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        console.log('PDF processado');

        // Obter o formulário preenchível do PDF
        const form = pdfDoc.getForm();

        // Exemplo de preenchimento dos campos do formulário (substitua pelos campos reais do seu PDF)
        const nomeField = form.getTextField('nome'); // Substitua 'nome' pelo nome real do campo no PDF
        nomeField.setText('João da Silva');
        console.log('Campo nome preenchido');

        const emailField = form.getTextField('email'); // Substitua 'email' pelo nome real do campo no PDF
        emailField.setText('joao@email.com');
        console.log('Campo email preenchido');

        // Após preencher, podemos desabilitar os campos ou removê-los:
        nomeField.disable();  // Desabilita o campo de nome para impedir a edição
        emailField.disable(); // Desabilita o campo de email

        // Alternativamente, podemos "flatten" o formulário (tornar os campos em texto)
        pdfDoc.flatten(); // Faz com que todos os campos preenchidos sejam transformados em texto simples

        // Salvar o PDF preenchido
        const pdfBytes = await pdfDoc.save();
        console.log('PDF salvo');

        // Criar link para download do PDF preenchido
        const link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
        link.download = 'formulario_preenchido.pdf'; // Nome do arquivo para download
        link.click();
        console.log('Download iniciado');

        // Limpar o objeto URL após o download
        URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error("Erro ao salvar o PDF:", error);
        alert("Erro ao salvar o PDF.");
    }
});
