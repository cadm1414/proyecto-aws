# 🚀 Proyecto CI/CD AWS - API REST con Node.js

## 📋 Descripción del Proyecto

API REST desarrollada con Node.js, Express, PostgreSQL y Sequelize, desplegada en AWS ECS con infraestructura como código usando Terraform.

### Stack Tecnológico

- **Backend**: Node.js 18 + Express 5
- **Base de Datos**: PostgreSQL con Sequelize ORM
- **Seguridad**: bcrypt para contraseñas, CORS
- **Documentación**: Swagger UI
- **Contenedores**: Docker
- **Cloud**: AWS (ECS, ECR, ALB, VPC)
- **IaC**: Terraform
- **CI/CD**: GitHub Actions

## 🗂️ Estructura del Proyecto

```
proyecto-final/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Pipeline CI/CD
├── src/
│   ├── config/                 # Configuración BD
│   ├── models/                 # Modelos Sequelize
│   ├── repositories/           # Capa de acceso a datos
│   ├── services/               # Lógica de negocio
│   ├── controllers/            # Controladores HTTP
│   ├── routes/                 # Definición de rutas
│   └── docs/                   # Swagger
├── terraform/                  # Infraestructura AWS
│   ├── main.tf
│   ├── vpc.tf
│   ├── ecs.tf
│   ├── ecr.tf
│   ├── alb.tf
│   ├── security-groups.tf
│   └── outputs.tf
├── Dockerfile
├── .dockerignore
├── server.js
└── package.json
```

## 🛠️ Instalación de Herramientas

### 1. Git

```powershell
git --version
```

### 2. AWS CLI

```powershell
# PowerShell (Admin)
Invoke-WebRequest -Uri "https://awscli.amazonaws.com/AWSCLIV2.msi" -OutFile "$env:TEMP\AWSCLIV2.msi"
Start-Process msiexec.exe -Wait -ArgumentList "/i $env:TEMP\AWSCLIV2.msi /quiet"
```

Reiniciar PowerShell y verificar:

```powershell
aws --version
```

### 3. Configurar AWS

**Crear usuario en IAM:**
1. Ir a AWS Console → IAM
2. Crear usuario con permisos: `AdministratorAccess` o permisos específicos
3. Generar Access Keys
4. Guardar credenciales

**Configurar AWS CLI:**

```powershell
aws configure
# AWS Access Key ID: [tu-access-key]
# AWS Secret Access Key: [tu-secret-key]
# Default region: us-east-1
# Default output format: json
```

**Verificar configuración:**

```powershell
aws sts get-caller-identity
```

### 4. Docker Desktop

```powershell
docker --version
docker ps
```

### 5. Terraform

```powershell
# Instalar Chocolatey (si no está instalado)
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Verificar Chocolatey
choco --version

# Instalar Terraform
choco install terraform -y

# Verificar Terraform
terraform --version
```

### 6. Node.js

```powershell
node --version
npm --version
```

## 🚀 Configuración del Proyecto

### 1. Clonar repositorio

```powershell
git clone https://github.com/cadm1414/proyecto-aws.git
cd tu-proyecto-aws
```

### 2. Instalar dependencias

```powershell
npm install
```

### 3. Configurar variables de entorno

Crear archivo `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=profile_db
DB_USER=postgres
DB_PASSWORD=tu_password
PORT=3000
NODE_ENV=development
```

### 4. Ejecutar localmente

```powershell
npm start
```

Acceder a:
- API: http://localhost:3000
- Health: http://localhost:3000/health
- Swagger: http://localhost:3000/api-docs

## 🐳 Docker Local

### Construir imagen

```powershell
docker build -t proyecto-test .
```

### Ejecutar contenedor

```powershell
docker run -d -p 3000:3000 --name proyecto-test-container proyecto-test
```

### Ver logs

```powershell
docker logs proyecto-test-container
```

### Detener y eliminar

```powershell
docker stop proyecto-test-container
docker rm proyecto-test-container
```

## ☁️ Despliegue en AWS

### Paso 1: Inicializar Terraform

```powershell
cd terraform
terraform init
```

### Paso 2: Validar configuración

```powershell
terraform validate
```

### Paso 3: Planificar infraestructura

```powershell
terraform plan
```

### Paso 4: Aplicar infraestructura

```powershell
terraform apply
```

Escribir `yes` para confirmar.

### Paso 5: Obtener outputs

```powershell
terraform output -raw ecr_repository_url
# Output: TU_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/tu-proyecto-app

terraform output -raw ecs_cluster_name
# Output: tu-proyecto-cluster

terraform output -raw ecs_service_name
# Output: tu-proyecto-service

terraform output -raw alb_dns_name
# Output: tu-proyecto-alb-123456.us-east-1.elb.amazonaws.com
```

### Paso 6: Subir imagen Docker a ECR

```powershell
# Volver al directorio raíz del proyecto
cd ..

# Login en ECR
$token = aws ecr get-login-password --region us-east-1
docker logout TU_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
docker login --username AWS --password $token TU_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

# Construir imagen
docker build -t TU_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/tu-proyecto-app:latest .

# Subir imagen
docker push TU_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/tu-proyecto-app:latest
```

### Paso 7: Desplegar en ECS

```powershell
aws ecs update-service --cluster tu-proyecto-cluster --service tu-proyecto-service --force-new-deployment
```

### Paso 8: Verificar despliegue

```powershell
# Health check
curl http://tu-proyecto-alb-123456.us-east-1.elb.amazonaws.com/health

# Swagger
# Abrir en navegador: http://tu-proyecto-alb-123456.us-east-1.elb.amazonaws.com/api-docs
```

## 🔄 CI/CD con GitHub Actions

El proyecto incluye un pipeline automatizado en `.github/workflows/deploy.yml` que:

1. Se activa en cada push a `main`
2. Construye la imagen Docker
3. Sube la imagen a ECR
4. Despliega automáticamente en ECS

### Configurar GitHub Secrets

En tu repositorio de GitHub, ir a `Settings → Secrets and variables → Actions` y agregar:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION` = `us-east-1`
- `ECR_REPOSITORY` = `tu-proyecto-app`
- `ECS_CLUSTER` = `tu-proyecto-cluster`
- `ECS_SERVICE` = `tu-proyecto-service`

### Hacer deploy automático

```powershell
git add .
git commit -m "Deploy to AWS"
git push origin main
```

El pipeline se ejecutará automáticamente.

## 📦 Subir proyecto a GitHub (primera vez)

```powershell
git init
git add .
git commit -m "Initial commit - Proyecto CI/CD AWS"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/tu-proyecto-aws.git
git push -u origin main
```

## 🔧 Comandos Útiles de Terraform

### Ver estado actual

```powershell
terraform show
```

### Ver outputs

```powershell
terraform output
```

### Destruir recursos específicos

```powershell
terraform destroy -target="aws_nat_gateway.main"
terraform destroy -target="aws_eip.nat"
terraform destroy -target="aws_route_table_association.private"
terraform destroy -target="aws_route_table.private"
```

### Volver a aplicar

```powershell
terraform apply
```

### Destruir toda la infraestructura

```powershell
terraform destroy
```

## 🌐 Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Mensaje de bienvenida |
| GET | `/health` | Health check |
| GET | `/api-docs` | Documentación Swagger |
| GET | `/api/version` | Versión de la API |
| GET | `/api/info` | Información del proyecto |
| GET | `/api/users` | Listar usuarios |
| GET | `/api/users/active` | Usuarios activos |
| GET | `/api/users/:id` | Obtener usuario |
| POST | `/api/users` | Crear usuario |
| POST | `/api/users/login` | Login |
| PUT | `/api/users/:id` | Actualizar usuario |
| PATCH | `/api/users/:id/deactivate` | Desactivar usuario |
| DELETE | `/api/users/:id` | Eliminar usuario |

## 🗄️ Base de Datos

### Modelo de la tabla `users`

```sql
CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🏗️ Infraestructura AWS

La infraestructura incluye:

- **VPC**: Red privada virtual
- **Subnets**: Públicas y privadas en 2 AZs
- **Internet Gateway**: Acceso a internet
- **NAT Gateway**: Salida a internet para subnets privadas
- **Security Groups**: Firewall para ALB y ECS
- **Application Load Balancer**: Balanceador de carga
- **ECS Cluster**: Clúster de contenedores
- **ECS Service**: Servicio con auto-scaling
- **ECS Task Definition**: Definición de tareas
- **ECR**: Registro de imágenes Docker
- **CloudWatch**: Logs y monitoreo

## 📊 Arquitectura

```
Internet
   ↓
Application Load Balancer (Puerto 80)
   ↓
ECS Service (Fargate)
   ↓
Contenedores Docker (Puerto 3000)
   ↓
PostgreSQL (Base de datos externa)
```

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt
- CORS habilitado
- Health checks configurados
- Security Groups restrictivos
- Secrets en variables de entorno

## 🐛 Troubleshooting

### Error al hacer push a ECR

```powershell
# Volver a hacer login
$token = aws ecr get-login-password --region us-east-1
docker login --username AWS --password $token TU_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
```

### Servicio no se actualiza

```powershell
# Forzar nuevo despliegue
aws ecs update-service --cluster tu-proyecto-cluster --service tu-proyecto-service --force-new-deployment
```

### Ver logs de ECS

```powershell
# En AWS Console → ECS → Cluster → Service → Tasks → Ver logs en CloudWatch
```

### Terraform estado bloqueado

```powershell
# Eliminar bloqueo (usar con precaución)
terraform force-unlock [LOCK_ID]
```

## 📝 Notas Importantes

- El proyecto usa **PostgreSQL externo**, no está en AWS (debes configurar las variables de entorno en ECS)
- El health check está en `/health`
- Swagger está disponible en `/api-docs`
- Las imágenes Docker deben tener las dependencias nativas para bcrypt (`python3 make g++`)

## 🔗 URLs Importantes

- **ALB**: http://tu-proyecto-alb-123456.us-east-1.elb.amazonaws.com
- **Health**: http://tu-proyecto-alb-123456.us-east-1.elb.amazonaws.com/health
- **Swagger**: http://tu-proyecto-alb-123456.us-east-1.elb.amazonaws.com/api-docs
- **GitHub**: https://github.com/TU_USUARIO/tu-proyecto-aws

## 👨‍💻 Autor

Tu Nombre

## 📄 Licencia

ISC
