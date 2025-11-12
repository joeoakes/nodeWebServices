npm install
npm start

node-rest-soap/
├─ package.json
├─ server.js
├─ routes/
│  └─ items.js
├─ soap/
│  └─ soapService.js
└─ wsdl/
   └─ hello.wsdl

Powershell
   Invoke-RestMethod -Uri "http://localhost:3000/api/items" `
  -Method POST `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{"name":"Tea","price":1.75}'

  <img width="729" height="164" alt="image" src="https://github.com/user-attachments/assets/2eb600cc-eee1-4f77-abc4-f015bdafa3fc" />
