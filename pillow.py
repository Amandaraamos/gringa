from PIL import Image

def clean_metadata(input_path, output_path):
    # 1. Usamos a variável 'input_path' que vem do argumento da função
    # O 'r' (raw string) deve ser usado na hora de definir a variável lá embaixo
    img = Image.open(input_path)
    
    # 2. Reconstrução dos pixels (Blindagem)
    data = list(img.getdata())
    clean_img = Image.new(img.mode, img.size)
    clean_img.putdata(data)
    
    # 3. Salvando no formato WebP no destino correto
    clean_img.save(output_path, "WEBP", quality=85)
    
    # 4. Ajustando o print para mostrar a variável 'output_path'
    print(f"✅ Imagem limpa e salva com sucesso em: {output_path}")

# --- FORMA CORRETA DE DEFINIR OS CAMINHOS ---

# Caminho da imagem suja (usando 'r' para evitar erros de barra no Windows)
origem = r"WARMUP/assets/sleep-study-report.jpg"

# Caminho onde a imagem blindada será criada (já em .webp)
destino = r"WARMUP/assets/sleep-study-report-limpo.webp"

# Chamada da função passando as variáveis
clean_metadata(origem, destino)