# ==============================================================================
# Dockerfile para Implantação Fundiferro (Easypanel / Coolify / Docker / VPS)
# ==============================================================================

# Estágio 1: Build da Aplicação
FROM node:20-alpine AS builder

WORKDIR /app

# Permite receber o argumento GIT_SHA passado pelo Easypanel
ARG GIT_SHA
ENV GIT_SHA=${GIT_SHA}

# Copia os manifestos de dependências
COPY package.json package-lock.json* bun.lock* ./

# Instala todas as dependências necessárias para o build
RUN npm install

# Copia todo o código-fonte
COPY . .

# Executa o build da interface (Vite) e o bundle do servidor (esbuild)
RUN npm run build

# Estágio 2: Runner de Produção
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV APP_PORT=3959

# Copia os manifestos de dependências
COPY package.json package-lock.json* bun.lock* ./

# Instala apenas dependências de produção para manter a imagem leve e segura
RUN npm install --omit=dev --ignore-scripts

# Copia o resultado do build gerado pelo estágio anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/index.html ./index.html

# Expõe a porta 3959 para mapeamento no Easypanel (3959:3959)
EXPOSE 3959

# Inicia o servidor Node.js
CMD ["node", "dist/server.cjs"]
