# Proyecto de Monitoreo



Esta apliacion tiene como objetivo monitoriar algun ENDPOINT de alguna REST API



# Desarrollo
1. Clonar el archivo .env.example a .enb
2. Configurar las variables de entorno en el archivo .env
```
PORT=3000

MAILER_EMAIL=
MAILER_SECRET_KEY=

PROD=false

```
3. Instalar las dependencias del proyecto
```bash
npm install
```

4. Levantar las base de datos
```bash
docker compose -up d
```

5. Levantar la app de modo de desarrollo

```bash
npm run dev
```


