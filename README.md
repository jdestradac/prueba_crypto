# Prueba Efrouting
En esta prueba técnica, se espera que construyas una base de datos en AWS, extraigas información de la API de CoinMarketCap mediante una función Lambda escrita en Python, y luego despliegues una página web donde muestres un gráfico con la información extraída utilizando un contenedor Docker.

## Requisitos
*  Construcción de una base de datos en AWS
*  Extracción de información desde la API de CoinMarketCap utilizando una función Lambda
*  Despliegue de una página web en un contenedor Docker

### Construcción de una base de datos en AWS
1. Cuenta AWS: En caso de no tener, debe crear una.
2. Crear base de datos: Se accede al servicio Amazom RDS y crear una base de datos, se hace la configuración necesaria y se crea un usuario y un contraseña.
3. Verifique que en los grupos de seguridad: Agregue un permisos de entrada que permita todo tipo de trafico.
4. Crear base de datos y tabla: Esto se puede hacer mediante codigo o de una interfaz grafica como *MySQL Workbench*.

### Extracción de información desde la API de CoinMarketCap utilizando una función Lambda
1. Ingresar al servicio *Lambda* en **AWS**
2. Escoger la opción *Crear una función*, se hace la configuración necesaria y se escoge **Python** como *Tiempo de ejecución*
3. Se hace la logica como u n función de **Pyhton** estandar
   * Variables de entorno: Para la valores requerido para la conexión a la base de datos y key para extraer la información de la ap, se crean varibles de entorno en *Configuración >    Variables de entorno*
   ```script
   
    database:  'name database'
    host_db:  'your host'
    password_db:  'your password'
    user_db:  'your user'
    pro_api_key:  'your api_key'
    
   ```
   * Conexión a la base de datos: Con los variables de entorno configuradas se crea la conecta a la base de datos
   * Extración de información de la api: Vaya a la [documentación](https://coinmarketcap.com/api/documentation/v1/#) de la api, para obtener su api_key deberá registrase en la pagina de CoinMarkert
   * Introducir los datos extraidos a la base de datos: Una vez extaraidos los datos, se introducen los datos a la base de datsos mediante un *INSERT INTO*

4. Crear capas: Para poder acceder a las librerias requeridas en el codigo, en *Lambda* se crean capas

      En la interfaz de *Lambda* se ingresa en *Recursos adicionales > capas*, se le da la opción de *crear capaz*, se configura un nombre y se sube un archivo zip
      
      **Contrución del archivo zip**
      
      De forma local se crea una carpeta con el nombre de *python*, se accede mediante el cmd ejecutaremos
      ```cmd
       pip3 install "library" -t .
      ```
      Y si se genera el error *ERROR: Can not combine '--user' and '--target'*, se le agregra *--no-user*
      ```cmd
       pip3 install "library" -t . --no-user
      ```
      Con esa carpeta se creará el archivo zip
   
5. Añadir capa: Se regresa la función *Lambda* y se le da en lo opción *Añadir capas*, se escoje *Capas personalizadas* y escoge la capa creada
6. Agregar desecandenador: Se regresa a la función nuevamente y se escoge la opción **Agregar desecandenador**, se busca y elige *EventBridge (CloudWatch Events)*, se da la opción de *Crear regla* y para  **Schedule expression** se configura un ```rate('#hours' hours)```
7. Verificar el funcionamiento del la funcción ataves de un *test*

## Despliegue de una página web en un contenedor Docker
1. Repositorio: Si quiere probar este reposirotio siga los siguientes pasos:
   * Clonar repositorio: Ingrese a repositorio y en la opción de *<>code*, copie la URL del repositorio y haga un git clone
   * Dependencias: Una vez clonado el repositorio vaya a la terminal y escriba
     ```script 
      npm install
     ```
   * Varibles de entorno: Una vez instaladas las dependencias, cree un archivo llamado *.env* y configure las variables de entorno
     ```script 
      host_db= "host o punto de acceso"
      user_db= "user"
      password_db= "password*"
      port_db= "port"
      database_name= "name db"
     ```
3. Docker: Asegurese de tener *Docker destok* instalado
   * Crear imagen. para eso debe escribir en la terminal el sigueinte comando
      ```script 
      docker build -t "image_name" .
    ```
4. Despliegue en ECS: Para el despliegue de la imagen en ECS se necesitan una serie de pasos
   * Asegurese de tener AWS CLI instalado
   * Credenciales: Para crear credenciales en AWS, debe ingresar al servicio [IAM](https://us-east-1.console.aws.amazon.com/iam/home?region=us-east-1#/home), haga click en *Mis credenciales de seguridad* y luego en *Crear claves de acceso*
   * AWS Configure: Para la configuración ecriba en la terminal  ``` aws configure ``` y llene la información requerida con la informacion de la clave de acesso previamente creada 
   
     
   
