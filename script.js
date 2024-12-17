document.getElementById('save-pdf').addEventListener('click', function() {
    try {
        console.log('Botão clicado');

        // Dados preenchidos
        const nome = "João da Silva";
        const email = "joao@email.com";

        // Criar o conteúdo HTML
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="pt-PT">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Formulário Preenchido</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                    }
                    h1 {
                        color: #4CAF50;
                    }
                    .field {
                        margin: 10px 0;
                    }
                    .field label {
                        font-weight: bold;
                    }
                    .field span {
                        margin-left: 10px;
                    }
                </style>
            </head>
            <body>
                <h1>Formulário Preenchido</h1>
                <div class="field">
                    <label for="nome">Nome:</label>
                    <span>${nome}</span>
                </div>
                <div class="field">
                    <label for="email">Email:</label>
                    <span>${email}</span>
                </div>
            </body>
            </html>
        `;

        // Criar um Blob com o conteúdo HTML
        const blob = new Blob([htmlContent], { type: 'text/html' });

        // Criar um link para o download do HTML
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'formulario_preenchido.html'; // Nome do arquivo HTML para download
        link.click();
        console.log('Download iniciado');

        // Limpar o objeto URL após o download
        URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error("Erro ao salvar o HTML:", error);
        alert("Erro ao salvar o HTML.");
    }
});
