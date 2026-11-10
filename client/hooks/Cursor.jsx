
export default function Cursor({ x, y, visible = true, isPointer = false }) {
    if (!visible) return null;

    return (
        <div
            className={`Cursor ${isPointer ? "Cursor--pointer" : ""}`}
            style={{
                left: `${x}px`,
                top: `${y}px`,
                pointerEvents: "none",
            }}
        >
            {isPointer && (
                <span className="Cursor__pointer">
                    <div className="cursorPointer"></div>
                </span>
            )}
        </div>
    );
}
