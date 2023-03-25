# Next.js Testlo Shop App

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

- el -d, significa **detached**

MongoDB URL local:

```
mongodb://localhost:27017/tesloDB
```

- Reconstruir los modulos de node y levantar Next

```
yarn install
yarn dev
```

## Configurar las variables de entorno

Renonmbrar el archivo **.env.template** a **.env**

## Llenar la base de datos con información de pruebas

Llamar a:

```
http://localhost:27017/api/seed
```
