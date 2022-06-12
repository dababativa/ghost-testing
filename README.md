# Ghost Testing

Desarrollado por:
- Daniel Armando Babativa - da.babativa@uniandes.edu.co

Para poder ejecutar estas pruebas de la mejor manera posible se recomienda cumplir con los siguientes puntos
- Correr Ghost localmente en el puerto 2368
- Correr la versión 4.42.0 de Ghost (para esta versión fueron diseñadas las pruebas y es posible que estas no funcionen correctamente en otra versión)
- Instalar Cypress a nivel global en su máquina

## Estrategia de pruebas
La estrategia de pruebas diseñada pueder verse [aquí](https://drive.google.com/file/d/1-lii8hst8gdFsUKhOXPQIiYZhKsOQPT2/view?usp=sharing)

## Inventario de pruebas exploratorias
El inventario de pruebas exploratorias puede ser encontrado [aqui](https://docs.google.com/spreadsheets/d/1Vpw4Dd8tbhTLygSfkmhm7yIteOhCry0T/edit?usp=sharing&ouid=103744373637186197517&rtpof=true&sd=true)

## Incidencias reportadas
Las incidencias reportadas pueden verse en este mismo repositorio

## Video final
El video final donde se explica la estrategia de pruebas, sus resultados, pros y cons puede encontrarase [aqui](https://drive.google.com/file/d/1-lii8hst8gdFsUKhOXPQIiYZhKsOQPT2/view?usp=sharing)

## Guía de instalación
Abra una consola de comandos donde desee clonar el repositorio y escriba los siguientes comandos

```
git clone https://github.com/dababativa/ghost-bdd.git
```
```
cd ghost-testing
```
### Cypress
Para correr la porción de Cypress del proyecto siga las siguientes instrucciones

Para correr Cypress puede correr el comando
```
cypress open
```
o el comando
``` 
cypress run
```
Al utilizar el primer comando se abrirá la interfaz de Cypress donde podrá ejecutar las pruebas una por una en el orden deseado. Por otro lado el segundo comando es utilizado para correr todos las pruebas sin abrir la interfaz gráfica.

Después entre al archivo cypress.json y remplace los valores de todas las variables dentro de la variable "env". Si no se reemplazan estos valores para que concuerden con los valores de su versión de ghost local las pruebas no servirán y en muchos casos no pasarán del login por lo que es muy importante asegurarse de que esta información esté actualizada y sea correcta.

**_NOTA:_** Para usar Cypress y los comando descritos previamente es necesario instalar globalmente cypress en su computadora, puede seguir el tutorial oficial de cypress en internet  

## Como correr el proyecyo
Una vez instalado el proyecto correctamente se abre la raíz del proyecto y se corre el comando 
```
cypresss open
```
Este comando abrirá la interfaz gráfica de ghost.

Una vez la interfaz gráfica esté abierta ejecute el archivo tags.a.priori.spec.js para ejecutar las pruebas realizadas durante la primera semana de la estrategia de pruebas.

## Descripción de funcionalidades

A continuación se detallan las funcionalidades que se tomaron como base para la realización de cada uno de los escenarios para cada herramienta previamente descrita:
- Login: Esta funcionalidad abarca todos los procesos relacionados con el login o ingreso de usuarios administradores al sistema.
- Manejo de posts: Esta funcionalidad abarca los procesos relacionados con la administración de post dentro del sistema.
- Manejo de tags: Esta funcionalidad abarca los procesos para gestión de tags por parte de los administradores del sistema.
- Manejo de páginas: Esta funcionalidad abarca los procesos de gestión de páginas por parte de usuarios administradores.
- Manejo de miembros: Esta funcionalidad está relacionada con el manejo de usuario colaboradores o miembros de la administración de la página.


## Descripción de pruebas con generación de datos

En la primera semana de desarrollo se alcanzaron a realizar 26 pruebas con generación de datos utilizando la estrategia a priori y cargando los datos con Mockaroo.

Para la generación de datos A priori se decidió utilizar la herramienta Mockaroo que permite genearar miles de objetos siguiendo un esquema de generación para cada atributo de estos objetos. En este caso se decidió utilizar el siguiente esquema

![image](https://user-images.githubusercontent.com/42902488/172065121-5007767e-4e48-4263-8324-79d656c435a1.png)

Donde se están creando objetos tipo Tag con los atributos necesarios y a ser usados durante la ejecución de las pruebas. Utilizando este esquema se crea un archivo JSON el cual se importa durante la ejecución de las pruebas. 

Para ejecutar estas pruebas se debe ejecutar el archivo tags.a.priori.spec.js que ejecuta las siguientes pruebas tanto positivas como negativas
1. Crear tag bien
2. Crear tag sin nombre
3. Crear tag sin slug
4. Crear tag sin descripcion
5. Crear tag sin color
6. Crear tag con nombre extraño
7. Crear tag con slug raro
8. Crear tag con color en formato diferente
9. Editar tag sin color
10. Editar tag con color en formato diferente
11. Crear tag con descripción muy larga
12. Crear tag con nombre en el limite
13. Crear tag con slug en el limite
14. Crear tag con descripcion en el limite
15. Crear tag sin nada
16. Editar tag bien
17. Editar tag sin nombre
18. Editar tag sin slug
19. Editar tag sin descripcion
20. Crear tag con nombre muy largo
21. Editar tag con nombre extraño
22. Editar tag con slug raro
23. Crear tag con slug muy largo
24. Editar tag con descripción muy larga
25. Editar tag con nombre muy largo
26. Editar tag con nombre en el limite


