# Next.js OpenJira App

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

- el -d, significa **detached**

MongoDB URL local:

```
mongodb://localhost:27017/entriesDB
```

## Configurar las variables de entorno

Renonmbrar el archivo **.env.template** a **.env**

## Llenar la base de datos con información de pruebas

Llamar a:
```
http://localhost:27017/api/seed
```
