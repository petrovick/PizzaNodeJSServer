module.exports = {
  dialect: 'postgres',
  host: '127.0.0.1',
  username: 'docker',
  password: 'docker',
  database: 'gofinal',
  operationAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  },
  dialectOptions: { decimalNumbers: true }
}
