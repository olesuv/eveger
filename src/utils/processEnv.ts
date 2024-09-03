export function dbString(): string {
  const connString = process.env.DB;

  if (!connString || connString === '') {
    console.error('connection string is not provided');
  }

  return connString;
}

export function devMode(): boolean {
  const mode = process.env.MODE;

  if (!mode || mode === 'prod') {
    return false;
  }

  return true;
}

export function serverPort(): number {
  const port = process.env.PORT;

  if (!port) {
    return 8080;
  }

  return Number(port);
}
