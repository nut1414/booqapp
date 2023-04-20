const env = {
  DATABASE_URL: process.env?.DATABASE_URL || "mysql://booq:password!@localhost:3306/booq",
  JWT_SECRET: process.env?.JWT_SECRET || "secret",
}

export {
  env
}