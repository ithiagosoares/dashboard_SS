#!/bin/bash

# Configurações
ENV_FILE=".env.local"
PROJECT="dashboard-ss-6f0aa"

echo "Iniciando a sincronização de secrets para o Firebase App Hosting..."
echo "Projeto: $PROJECT"
echo "Arquivo: $ENV_FILE"
echo "----------------------------------------"

# Verifica se o arquivo existe
if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Erro: Arquivo $ENV_FILE não encontrado!"
  exit 1
fi

# Lê o arquivo .env linha por linha
while IFS= read -r line || [ -n "$line" ]; do
  # Remove espaços em branco do início e do final da linha
  line=$(echo "$line" | xargs)

  # Pula linhas vazias (após remover os espaços) e comentários
  if [[ -z "$line" ]] || [[ "$line" == \#* ]]; then
    continue
  fi

  # Extrai o nome e o valor da variável a partir do separador '='
  VAR_NAME=$(echo "$line" | cut -d '=' -f 1)
  VAR_VALUE=$(echo "$line" | cut -d '=' -f 2-)

  if [ -n "$VAR_NAME" ]; then
    echo "⏳ Cadastrando secret: $VAR_NAME ..."
    # Executa o comando do Firebase enviando o valor extraído por pipe para automatizar
    echo -n "$VAR_VALUE" | firebase apphosting:secrets:set "$VAR_NAME" --project "$PROJECT"
    echo "✅ Concluído: $VAR_NAME"
  fi
done < "$ENV_FILE"

echo "----------------------------------------"
echo "🎉 Sincronização de secrets finalizada com sucesso!"
