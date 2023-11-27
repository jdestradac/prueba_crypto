# Prueba Efrouting

En esta prueba técnica, se espera que construyas una base de datos en AWS, extraigas información de la API de CoinMarketCap mediante una función Lambda escrita en Python, y luego despliegues una página web donde muestres un gráfico con la información extraída utilizando un contenedor Docker.

## App
- [DNS AWS](lb-crypto-325957854.us-east-1.elb.amazonaws.com)
- [DNS personalizado](http://cryptochart.ddns.net/)

## Requisitos
- Construcción de una base de datos en AWS
- Extracción de información desde la API de CoinMarketCap utilizando una función Lambda
- Despliegue de una página web en un contenedor Docker

### Construcción de una base de datos en AWS
1. **Cuenta AWS:** En caso de no tener, debes crear una.
2. **Crear base de datos:** Accede al servicio Amazon RDS y crea una base de datos. Realiza la configuración necesaria y crea un usuario y una contraseña.
3. **Verificar grupos de seguridad:** Agrega permisos de entrada que permitan todo tipo de tráfico.
4. **Crear base de datos y tabla:** Puedes hacer esto mediante código o mediante una interfaz gráfica como *MySQL Workbench*.


### Extracción de información desde la API de CoinMarketCap utilizando una función Lambda

1. **Ingresar al servicio Lambda en AWS:**
   - Seleccionar la opción *Crear una función*, realizar la configuración necesaria y escoger **Python** como *Tiempo de ejecución*.

2. **Implementar la lógica como una función estándar de Python:**
   - **Variables de entorno:** Configurar variables de entorno en *Configuración > Variables de entorno* para los valores necesarios para la conexión a la base de datos y la clave para extraer información de la API.

     ```script
     database: 'nombre de la base de datos'
     host_db: 'tu host'
     password_db: 'tu contraseña'
     user_db: 'tu usuario'
     pro_api_key: 'tu clave API'
     ```

   - **Conexión a la base de datos:** Con las variables de entorno configuradas, establecer la conexión a la base de datos.

   - **Extracción de información de la API:** Consultar la [documentación](https://coinmarketcap.com/api/documentation/v1/#) de la API. Para obtener la clave API, es necesario registrarse en la página de CoinMarketCap.

   - **Introducir los datos extraídos en la base de datos:**
     - Una vez extraídos los datos, insertarlos en la base de datos mediante un *INSERT INTO*.

3. **Crear capas:**
   - Para acceder a las bibliotecas requeridas en el código, en *Lambda*, crear capas.
     - En la interfaz de *Lambda*, ingresar en *Recursos adicionales > Capas*, seleccionar *Crear capa*, configurar un nombre y subir un archivo ZIP.

     **Construcción del archivo ZIP:**
     - Localmente, crear una carpeta con el nombre de *python*. Acceder mediante el cmd y ejecutar:

     ```cmd
     pip3 install "library" -t .
     ```

     - En caso de un error *ERROR: Can not combine '--user' and '--target'*, agregar *--no-user*:

     ```cmd
     pip3 install "library" -t . --no-user
     ```

     - Con esa carpeta, crear el archivo ZIP.

4. **Añadir capa:**
   - Regresar a la función *Lambda* y seleccionar *Añadir capas*, elegir *Capas personalizadas* y escoger la capa creada.

5. **Agregar desencadenador:**
   - Volver a la función nuevamente y seleccionar **Agregar desencadenador**. Buscar y elegir *EventBridge (CloudWatch Events)*, seleccionar *Crear regla* y configurar **Schedule expression** con `rate('#hours' hours)`.

6. **Verificar el funcionamiento de la función a través de un test.**


## Despliegue de una página web en un contenedor Docker

1. **Repositorio:**
   - Si quieres probar este repositorio, sigue los siguientes pasos:
      - Clonar repositorio: Ingresa al repositorio y en la opción de *<>code*, copia la URL del repositorio y realiza un git clone.
      - Dependencias: Una vez clonado el repositorio, ve a la terminal y escribe:
        ```script
        npm install
        ```
      - Variables de entorno: Después de instalar las dependencias, crea un archivo llamado *.env* y configura las variables de entorno:
        ```script
        host_db= "host o punto de acceso"
        user_db= "user"
        password_db= "password*"
        port_db= "port"
        database_name= "name db"
        ```

3. **Docker:**
   - Asegúrate de tener *Docker Desktop* instalado.
      - Crear imagen: Para esto, escribe en la terminal el siguiente comando:
        ```script
        docker build -t "nombre_de_la_imagen" .
        ```

4. **Despliegue en ECS:**
   - Para el despliegue de la imagen en ECS, se necesitan una serie de pasos.
      - Asegúrate de tener AWS CLI instalado.
      - Credenciales: Para crear credenciales en AWS, ingresa al servicio [IAM](https://us-east-1.console.aws.amazon.com/iam/home?region=us-east-1#/home), haz clic en *Mis credenciales de seguridad* y luego en *Crear claves de acceso*.
      - AWS Configure: Para la configuración, escribe en la terminal `aws configure` y llena la información requerida con la información de la clave de acceso previamente creada.
      - AWS ECR: Crea un repositorio donde se guardará la imagen generada. Ve a [ECR](https://us-east-1.console.aws.amazon.com/ecr/repositories?region=us-east-1), haz clic en la opción *Crear repositorio*. Una vez creado, ingresa a este y haz clic en *Ver comandos de envío*. Sigue las instrucciones descritas y la imagen se cargará en el repositorio.
      - AWS ECS: Ve al servicio [ECS](https://us-east-1.console.aws.amazon.com/ecs/v2/home?region=us-east-1) y haz clic en la opción *Crear cluster*. Realiza las configuraciones necesarias.
      - Definición de tareas: Una vez creado el cluster, dirígete a *Definición de tareas* y luego a *Crear definiciones de tarea*. Realiza las configuraciones necesarias (necesitarás el URI de la imagen cargada en el repositorio).
      - Deploy: Una vez creada la tarea, verás una lista desplegable llamada *Deploy*, haz clic y elige *Crear Servicio*.
      - Acceso a la página web: Una vez creado el servicio, ingresa a este y ve a la opción de *redes*. Allí encontrarás un DNS proporcionado por AWS para acceder a la página web. Si quieres, puedes tomar la IP y configurar un DNS personalizado en aplicaciones como [NO-IP](https://www.noip.com/remote-access?utm_source=bing&utm_medium=cpc&utm_campaign=free-dynamic-dns&msclkid=7ead558aec611deaf09a30ee1595918f).

   
