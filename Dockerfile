# Etapa 1: Build
FROM node:18 AS builder

# Definir diretório de trabalho dentro do container
WORKDIR /app

# Copiar arquivos de dependência para o container
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código do projeto
COPY . .

# Construir o projeto para produção
RUN npm run build

# Etapa 2: Servir o app
FROM nginx:alpine

# Copiar o build gerado para o diretório padrão do NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor porta padrão do NGINX
EXPOSE 80

# Iniciar o servidor NGINX
CMD ["nginx", "-g", "daemon off;"]
