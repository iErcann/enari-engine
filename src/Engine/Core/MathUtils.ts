export function lerp(a: number, b: number, f: number): number {
    return a + f * (b - a);
}