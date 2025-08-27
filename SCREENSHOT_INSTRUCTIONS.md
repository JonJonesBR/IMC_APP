# Como adicionar uma imagem de demonstração

Para adicionar uma imagem de demonstração ao README.md:

1. Execute a aplicação localmente com `npm start`
2. Acesse http://localhost:3000 no seu navegador
3. Capture uma screenshot da página
4. Salve a imagem como `imc-calculator-demo.png` na raiz deste projeto
5. Descomente a linha da imagem no README.md:
   ```
   ![IMC Calculator Demo](https://raw.githubusercontent.com/JonJonesBR/IMC_APP/main/imc-calculator-demo.png)
   ```
6. Comente ou remova a linha de placeholder:
   ```
   <!-- ![IMC Calculator Demo](https://raw.githubusercontent.com/JonJonesBR/IMC_APP/main/imc-calculator-demo.png) -->
   <!-- Para adicionar uma imagem de demonstração, capture uma screenshot da aplicação e salve como imc-calculator-demo.png na raiz do projeto -->
   ```
7. Adicione, commite e faça push da imagem e do README.md atualizado:
   ```
   git add imc-calculator-demo.png README.md
   git commit -m "Adicionar imagem de demonstração"
   git push origin main
   ```