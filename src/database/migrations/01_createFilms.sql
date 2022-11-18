CREATE TABLE IF NOT EXISTS films(
    id INTEGER PRIMARY KEY NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    titulo_original VARCHAR(255) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    data_lancamento VARCHAR(255) NOT NULL,
    pontuacao VARCHAR(255) NOT NULL
)