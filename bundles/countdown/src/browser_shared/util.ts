export function parseISOLocal(s: string) {
    const b = s.split(/\D/);
    return new Date(Number.parseInt(b[0] as string), Number.parseInt(b[1] as string)-1, Number.parseInt(b[2] as string), Number.parseInt(b[3] as string), Number.parseInt(b[4] as string), 0);
}