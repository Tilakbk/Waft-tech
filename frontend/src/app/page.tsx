export default function Home() {
    return (
        <main style={{ padding: "2rem" }}>
            <h1 style={{
                fontFamily: '"Clash Display", sans-serif',
                fontSize: "4rem",
                fontWeight: 700
            }}>
                Clash Display Bold 700
            </h1>
            <h2 style={{
                fontFamily: '"Clash Display", sans-serif',
                fontSize: "3rem",
                fontWeight: 600
            }}>
                Clash Display Semibold 600
            </h2>
            <h3 style={{
                fontFamily: '"Clash Display", sans-serif',
                fontSize: "2rem",
                fontWeight: 500
            }}>
                Clash Display Medium 500
            </h3>
            <p style={{
                fontFamily: '"Clash Display", sans-serif',
                fontSize: "1.5rem",
                fontWeight: 400,
                marginTop: "1rem"
            }}>
                Clash Display Regular 400
            </p>
            <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "1rem",
                fontWeight: 400,
                marginTop: "1rem"
            }}>
                Inter Regular — body font
            </p>
        </main>
    );
}